import { GroupChoices } from "../../../schema/permission";
import firebaseRoute from "../../../utils/fireRoute";
import preValidation from "../../../utils/preValidation";

const fbRoute = firebaseRoute(
  "Lead",
  [preValidation.isAuthorized],
  GroupChoices.LEAD
);

export default fbRoute.handle;
