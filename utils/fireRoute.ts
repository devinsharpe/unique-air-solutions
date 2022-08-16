import { ActionChoices, GroupChoices } from "../schema/permission";
import {
  CollectionReference,
  DocumentData,
  Query,
  WhereFilterOp
} from "firebase-admin/firestore";
import Route, { PrevalidationFunction } from "./route";

import preValidation from "./preValidation";

interface FBWhereObject {
  field: string;
  op: WhereFilterOp;
  value: any;
}

const firebaseRoute = (
  collectionName: string,
  preVal?: PrevalidationFunction[],
  permGroup?: GroupChoices
) => {
  const route = new Route();

  const preValidationFunctions = {
    get: [...(preVal || [])],
    post: [...(preVal || [])],
    put: [...(preVal || [])],
    delete: [...(preVal || [])]
  };
  if (permGroup) {
    preValidationFunctions.get.push((req, pkg) =>
      preValidation.hasPerm(req, pkg, {
        group: permGroup,
        action: ActionChoices.READ
      })
    );
    preValidationFunctions.post.push((req, pkg) =>
      preValidation.hasPerm(req, pkg, {
        group: permGroup,
        action: ActionChoices.CREATE
      })
    );
    preValidationFunctions.put.push((req, pkg) =>
      preValidation.hasPerm(req, pkg, {
        group: permGroup,
        action: ActionChoices.UPDATE
      })
    );
    preValidationFunctions.delete.push((req, pkg) =>
      preValidation.hasPerm(req, pkg, {
        group: permGroup,
        action: ActionChoices.DELETE
      })
    );
  }

  route.get(
    async (req, res, { db }) => {
      let collection: Query<DocumentData> | CollectionReference<DocumentData> =
        db.collection(collectionName);
      if (req.body.where) {
        const whereFilters: FBWhereObject[] = req.body.where;
        whereFilters.forEach((where: FBWhereObject) => {
          collection = collection.where(where.field, where.op, where.value);
        });
      }
      const snapshot = await collection.get();
      res
        .status(200)
        .send(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    },
    {
      query: {
        type: "array",
        items: {
          type: "object",
          properties: {
            prop: { type: "string" },
            op: { type: "string" },
            value: {}
          }
        }
      },
      preValidation: preValidationFunctions.get
    }
  );

  route.post(
    async (req, res, { db }) => {
      if (req.body.id) {
        const docRef = db.collection(collectionName).doc(req.body.id);
        await docRef.set(req.body);
        const doc = await docRef.get();
        res.status(201).send({ ...doc.data(), id: doc.id });
      } else {
        const docRef = await db.collection(collectionName).add(req.body);
        const doc = await docRef.get();
        res.status(201).send({ ...doc.data(), id: doc.id });
      }
    },
    {
      body: {
        ...route.getSchema(collectionName).schema
      },
      preValidation: preValidationFunctions.post
    }
  );

  route.put(
    async (req, res, { db }) => {
      const docRef = db.collection(collectionName).doc(req.body.id);
      await docRef.set(req.body);
      const doc = await docRef.get();
      res.status(200).send({ ...doc.data(), id: doc.id });
    },
    {
      body: {
        ...route.getSchema(collectionName).schema,
        required: ["id"]
      },
      preValidation: preValidationFunctions.put
    }
  );

  route.delete(
    async (req, res, { db }) => {
      const docRef = db.collection(collectionName).doc(req.body.id);
      const doc = await docRef.get();
      await docRef.delete();
      res.status(204).send({ ...doc.data(), id: doc.id });
    },
    {
      body: {
        ...route.getSchema(collectionName).schema,
        required: ["id"]
      },
      preValidation: preValidationFunctions.delete
    }
  );

  return route;
};

export default firebaseRoute;
