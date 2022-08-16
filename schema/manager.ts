import { JSONSchemaType } from "ajv";

export interface ManagerObject {
  id: string;
  name: string;
  defaultContact: string;
}

const Manager = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    defaultContact: { type: "string" }
  }
} as JSONSchemaType<ManagerObject>;

export default Manager;
