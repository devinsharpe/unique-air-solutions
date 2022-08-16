import {
  ActionChoices,
  GroupChoices,
  PermissionObject
} from "../../schema/permission";

import { PrevalidationFunction } from "../route";

const id = "HAS_PERM";

const checkPerm = (
  perm: {
    group: GroupChoices;
    action: ActionChoices;
  },
  permissions: PermissionObject[]
) => {
  const filteredPermissions = permissions.filter(
    (p) =>
      (p.action === perm.action || p.action === ActionChoices.ALL) &&
      p.group === perm.group
  );
  if (filteredPermissions.length > 0) {
    return filteredPermissions[0].value;
  }
  return false;
};

const fn: PrevalidationFunction = (
  req,
  { user },
  perm: { group: GroupChoices; action: ActionChoices }
) => {
  const permStatus = checkPerm(perm, user.permissions);
  if (permStatus) {
    return { id, status: 200, ok: true };
  }

  return {
    id,
    status: 403,
    ok: false,
    body: {
      error: "Unauthorized",
      message: "You do not have permission to perform this action."
    }
  };
};

export default fn;
export { id };
