import Route from "../../../utils/route";
import preValidation from "../../../utils/preValidation";

const route = new Route();

route.post(
  async (req, res) => {
    if (process.env.NODE_ENV === "development") {
      const response = await fetch(
        `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${process.env.FIREBASE_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ ...req.body, returnSecureToken: true })
        }
      );
      const json = await response.json();
      res.status(200).send(json);
    } else {
      res.status(404).end();
    }
  },
  {
    body: {
      type: "object",
      properties: {
        email: { type: "string" },
        password: { type: "string" }
      },
      required: ["email", "password"]
    },
    preValidation: [preValidation.isAnonymous]
  }
);

export default route.handle;
