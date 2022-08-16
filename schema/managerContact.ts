export interface ManagerContactObject {
  id: string;
  managerId: string;
  name: {
    first: string;
    last?: string;
  };
  contact: {
    email?: string;
    altEmail?: string;
    phone?: string;
    altPhone?: string;
  };
  notes?: string;
}

const ManagerContact = {
  type: "object",
  properties: {
    id: { type: "string" },
    mangerId: { type: "string" },
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
    },
    notes: { type: "string" }
  }
};

export default ManagerContact;
