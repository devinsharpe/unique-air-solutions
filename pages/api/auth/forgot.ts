import { FirebaseError } from "firebase-admin";
import Route from "../../../utils/route";

const route = new Route();

route.post(
  async (req, res, { auth }) => {
    try {
      const link = await auth.generatePasswordResetLink(req.body.email);
      console.log(link);
      res.send({ link });
    } catch (err) {
      res.status(400).send(err);
    }
  },
  {
    body: {
      type: "object",
      properties: {
        email: { type: "string" }
      },
      required: ["email"]
    }
  }
);

export default route.handle;
