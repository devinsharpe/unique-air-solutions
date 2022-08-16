import Customer from "./customer";
import { JSONSchemaType } from "ajv";
import Lead from "./lead";
import Manager from "./manager";
import ManagerContact from "./managerContact";
import Permission from "./permission";
import Property from "./property";

const schema = {
  Customer,
  Lead,
  Manager,
  ManagerContact,
  Permission,
  Property
} as {
  [key: string]: JSONSchemaType<{}>;
};

export default schema;
