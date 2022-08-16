import { JSONSchemaType } from "ajv";

export interface LeadObject {
  id: string;
  name: {
    first: string;
    last: string;
  };
  contact: {
    email: string;
    phone: string;
  };
}

const Lead = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: {
      type: "object",
      properties: {
        first: { type: "string" },
        last: { type: "string" }
      }
    },
    contact: {
      type: "object",
      properties: {
        email: { type: "string" },
        phone: { type: "string" }
      }
    }
  }
} as JSONSchemaType<LeadObject>;

export default Lead;
