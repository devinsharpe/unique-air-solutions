import { JSONSchemaType } from "ajv";

export enum ActionChoices {
  CREATE = "CREATE",
  READ = "READ",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
  ALL = "ALL"
}

export enum GroupChoices {
  USER = "USER",
  CUSTOMER = "CUSTOMER",
  SCHEDULE = "SCHEDULE",
  LEAD = "LEAD",
  MANAGER = "MANAGER",
  CONTACT = "CONTACT",
  PROPERTY = "PROPERTY"
}

export interface PermissionObject {
  id: string;
  uid: string;
  group: GroupChoices;
  action: ActionChoices;
  value: boolean;
}

const Permission = {
  type: "object",
  properties: {
    id: { type: "string" },
    uid: { type: "string" },
    group: { type: "string" },
    action: { type: "string" },
    value: { type: "boolean" }
  }
} as JSONSchemaType<PermissionObject>;

export default Permission;
