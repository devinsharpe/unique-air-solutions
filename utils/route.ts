import Ajv, { ErrorObject, JSONSchemaType } from "ajv";
import { Auth, UserRecord, getAuth } from "firebase-admin/auth";
import { NextApiRequest, NextApiResponse } from "next";
import app, { db } from "../firebase";

import type { Firestore } from "firebase-admin/firestore";
import { PermissionObject } from "../schema/permission";
import schema from "../schema";

export type PrevalidationStatus = {
  id: string;
  status: number;
  ok: boolean;
  body?: {
    error: string;
    message: string;
  };
};

export type HandlerPkg = {
  auth: Auth;
  db: Firestore;
  user: { user: UserRecord | null; permissions: PermissionObject[] };
};

export type Handler = (
  req: NextApiRequest,
  res: NextApiResponse,
  pkg: HandlerPkg
) => Promise<void> | void;

export type PrevalidationFunction = (
  req: NextApiRequest,
  pkg: HandlerPkg,
  ...args: any[]
) => PrevalidationStatus | Promise<PrevalidationStatus>;

type Methods = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS";

type MethodObject = {
  [key in Methods]: {
    handler: Handler;
    schema?: SchemaObject;
  };
};

type SchemaObject = {
  query?: Object;
  body?: Object;
  preValidation?: PrevalidationFunction[];
};

class Route {
  private methods: MethodObject;
  private auth: Auth;
  private db: Firestore;
  private ajv = new Ajv({
    removeAdditional: true,
    useDefaults: true,
    coerceTypes: true
  });

  constructor() {
    this.auth = getAuth(app);
    this.db = db;
    this.setupSchema();
    this.methods = {} as MethodObject;
  }

  handle = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req as { method: Methods };
    if (method === "OPTIONS") {
      res
        .setHeader("Allow", Object.keys(this.methods).join(","))
        .status(404)
        .end();
    } else if (typeof this.db === "undefined") {
      res.status(500).send({ error: "Database not initialized" });
    } else if (this.methods.hasOwnProperty(method)) {
      try {
        const { request, errors } = await this.processRequest(req, method);
        if (errors.prevalidation) {
          res.status(errors.prevalidation.status).send({
            prevalidationId: errors.prevalidation.id,
            ...errors.prevalidation.body
          });
        } else if (errors && (errors.query.length || errors.body.length)) {
          res.status(400).send({ query: errors.query, body: errors.body });
        } else {
          const user = await this.getUser(req);
          await this.methods[method].handler(request, res, {
            auth: this.auth,
            db: this.db,
            user
          });
        }
      } catch (err) {
        console.log(err);
        res.status(500).send(err);
      }
    } else {
      res.status(405).end();
    }
  };

  getSchema(schemaName: string) {
    return {
      validate: this.ajv.getSchema(schemaName),
      schema: schema[schemaName]
    };
  }

  private setupSchema() {
    this.ajv.addSchema(schema.Customer, "Customer");
    this.ajv.addSchema(schema.Customer, "Lead");
    this.ajv.addSchema(schema.Manager, "Manager");
    this.ajv.addSchema(schema.ManagerContact, "ManagerContact");
    this.ajv.addSchema(schema.Permission, "Permission");
    this.ajv.addSchema(schema.Property, "Property");
  }

  private validate(obj: Object, schema: JSONSchemaType<{}>) {
    const validate = this.ajv.compile({
      ...schema,
      additionalProperties: false
    });
    validate(obj);
    return validate.errors;
  }

  private async processRequest(req: NextApiRequest, methodKey: Methods) {
    const schema = this.methods[methodKey].schema;
    const errors = {
      query: [] as ErrorObject<string, Record<string, any>, unknown>[],
      body: [] as ErrorObject<string, Record<string, any>, unknown>[],
      prevalidation: undefined as PrevalidationStatus | undefined
    };
    if (schema) {
      if (schema.query)
        errors.query =
          this.validate(req.query, schema.query as JSONSchemaType<unknown>) ||
          [];
      if (schema.body)
        errors.body =
          this.validate(req.body, schema.body as JSONSchemaType<unknown>) || [];
      if (schema.preValidation) {
        const user = await this.getUser(req);
        for (const preValidation of schema.preValidation) {
          const result = await preValidation(req, {
            auth: this.auth,
            db: this.db,
            user
          });
          if (!result.ok) {
            errors.prevalidation = result;
            break;
          }
        }
      }
    }
    return { request: req, errors };
  }

  get(handler: Handler, schema?: SchemaObject) {
    this.methods.GET = { handler, schema };
  }

  patch(handler: Handler, schema?: SchemaObject) {
    this.methods.PATCH = { handler, schema };
  }

  post(handler: Handler, schema?: SchemaObject) {
    this.methods.POST = { handler, schema };
  }

  put(handler: Handler, schema?: SchemaObject) {
    this.methods.PUT = { handler, schema };
  }

  delete(handler: Handler, schema?: SchemaObject) {
    this.methods.DELETE = { handler, schema };
  }

  private getUserToken(req: NextApiRequest) {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      return req.headers.authorization.split(" ")[1];
    }
    return null;
  }

  private async getUser(req: NextApiRequest) {
    const token = this.getUserToken(req);
    if (token) {
      const userInfo = await this.auth.verifyIdToken(token);
      const user = await this.auth.getUser(userInfo.uid);
      const permissions = [] as PermissionObject[];
      if (user) {
        const permSnapshot = await this.db
          .collection("permissions")
          .where("uid", "==", user.uid)
          .get();
        permSnapshot.forEach((doc) => {
          permissions.push({ id: doc.id, ...doc.data() } as PermissionObject);
        });
      }
      return { user, permissions };
    }
    return { user: null, permissions: [] };
  }
}

export default Route;
