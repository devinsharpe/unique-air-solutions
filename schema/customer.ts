import { JSONSchemaType } from "ajv";

export interface CustomerObject {
  id: string;
  name: {
    first: string;
    last: string;
  };
  contact: {
    email: string;
    altEmail: string;
    phone: string;
    altPhone: string;
  };
}

const Customer = {
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
        altEmail: { type: "string" },
        phone: { type: "string" },
        altPhone: { type: "string" }
      }
    }
  }
} as JSONSchemaType<CustomerObject>;

export default Customer;
