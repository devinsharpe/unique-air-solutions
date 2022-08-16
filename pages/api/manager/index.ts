import { GroupChoices } from "../../../schema/permission";
import firebaseRoute from "../../../utils/fireRoute";
import preValidation from "../../../utils/preValidation";

const fbRoute = firebaseRoute(
  "Manager",
  [preValidation.isAuthorized],
  GroupChoices.MANAGER
);

export default fbRoute.handle;
