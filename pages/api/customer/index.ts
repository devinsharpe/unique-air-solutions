import { GroupChoices } from "../../../schema/permission";
import firebaseRoute from "../../../utils/fireRoute";
import preValidation from "../../../utils/preValidation";

const fbRoute = firebaseRoute(
  "Customer",
  [preValidation.isAuthorized],
  GroupChoices.CUSTOMER
);

export default fbRoute.handle;
