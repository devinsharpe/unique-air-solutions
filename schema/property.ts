import { JSONSchemaType } from "ajv";

export enum PropertyType {
  House = "house",
  Apartment = "apartment",
  Condo = "condo",
  Townhouse = "townhouse",
  Land = "land",
  Other = "other"
}

export interface PropertyObject {
  id: string;
  address: {
    street: string;
    street2: string;
    city: string;
    state: string;
    zip: string;
  };
  propertyType: PropertyType;
  isNewConstruction: boolean;
  customerId: string;
  managerId: string;
}

const Property = {
  type: "object",
  properties: {
    id: { type: "string" },
    address: {
      type: "object",
      properties: {
        street: { type: "string" },
        street2: { type: "string" },
        city: { type: "string" },
        state: { type: "string" },
        zip: { type: "string" }
      }
    },
    propertyType: {
      type: "string"
    },
    isNewConstruction: { type: "boolean" },
    customerId: { type: "string" },
    managerId: { type: "string" }
  }
} as JSONSchemaType<PropertyObject>;

export default Property;
