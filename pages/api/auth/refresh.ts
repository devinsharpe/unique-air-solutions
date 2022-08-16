import Route from "../../../utils/route";
import preValidation from "../../../utils/preValidation";

const route = new Route();

route.post(
  async (req, res, { user }) => {
    if (user.user) {
      const response = await fetch(
        `https://securetoken.googleapis.com/v1/token?key=${process.env.FIREBASE_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            grant_type: "refresh_token",
            refresh_token: req.body.refreshToken
          })
        }
      );
      const json = await response.json();
      res.status(response.status).send(json);
    } else {
      res
        .status(401)
        .send({ error: "Unauthorized", message: "Please login to continue." });
    }
  },
  {
    body: {
      type: "object",
      properties: {
        refreshToken: { type: "string" }
      },
      required: ["refreshToken"]
    },
    preValidation: [preValidation.isAuthorized]
  }
);

export default route.handle;
