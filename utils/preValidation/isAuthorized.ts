import { PrevalidationFunction } from "../route";

const id = "IS_AUTHORIZED";

const fn: PrevalidationFunction = (req, { user }) => {
  if (user.user) {
    return {
      id,
      status: 200,
      ok: true
    };
  }

  return {
    id,
    status: 403,
    ok: false,
    body: {
      error: "Unauthorized",
      message: "Please login to continue."
    }
  };
};

export default fn;
export { id };
