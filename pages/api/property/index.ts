import { GroupChoices } from "../../../schema/permission";
import firebaseRoute from "../../../utils/fireRoute";
import preValidation from "../../../utils/preValidation";

const fbRoute = firebaseRoute(
  "Property",
  [preValidation.isAuthorized],
  GroupChoices.PROPERTY
);

export default fbRoute.handle;
