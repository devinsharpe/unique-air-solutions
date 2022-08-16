import { ActionChoices, GroupChoices } from "../../../schema/permission";

import Route from "../../../utils/route";
import preValidation from "../../../utils/preValidation";

const route = new Route();

route.get(
  (req, res, { user }) => {
    return res.json(user);
  },
  {
    preValidation: [preValidation.isAuthorized]
  }
);

route.post(
  async (req, res, { auth }) => {
    try {
      const user = await auth.createUser({
        email: req.body.email,
        password: req.body.password,
        displayName: req.body.displayName || req.body.email
      });
      return res.json(user);
    } catch (e) {
      res.status(400).send(e);
    }
  },
  {
    body: {
      type: "object",
      properties: {
        email: { type: "string" },
        password: { type: "string" },
        displayName: { type: "string" }
      },
      required: ["email", "password"]
    },
    preValidation: [
      preValidation.isAuthorized,
      (req, pkg) =>
        preValidation.hasPerm(req, pkg, {
          group: GroupChoices.USER,
          action: ActionChoices.CREATE
        })
    ]
  }
);

route.put(
  async (req, res, { auth }) => {
    await auth.updateUser(req.body.uid, { displayName: req.body.displayName });
    const user = await auth.getUser(req.body.uid);
    let link;
    user.email
      ? (link = auth.generatePasswordResetLink(user.email))
      : (link = "");
    res.status(200).send({ link });
  },
  {
    body: {
      type: "object",
      properties: {
        uid: { type: "string" },
        password: { type: "string" },
        displayName: { type: "string" }
      },
      required: ["uid"]
    },
    preValidation: [
      preValidation.isAuthorized,
      (req, pkg) =>
        preValidation.hasPerm(req, pkg, {
          group: GroupChoices.USER,
          action: ActionChoices.UPDATE
        })
    ]
  }
);

export default route.handle;
