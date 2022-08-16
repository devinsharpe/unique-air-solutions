import hasPerm from "./hasPerm";
import isAnonymous from "./isAnonymous";
import isAuthorized from "./isAuthorized";

const preValidation = {
  isAuthorized,
  isAnonymous,
  hasPerm
};

export default preValidation;
