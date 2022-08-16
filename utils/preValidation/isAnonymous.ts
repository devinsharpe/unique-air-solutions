import { PrevalidationFunction } from "../route";

const id = "IS_ANONYMOUS";

const fn: PrevalidationFunction = (req, { user }) => {
  if (user.user) {
    return {
      id,
      status: 403,
      ok: false,
      body: {
        error: "Unauthorized",
        message: "User must be anonymous to continue."
      }
    };
  }

  return {
    id,
    status: 200,
    ok: true
  };
};

export default fn;
export { id };
