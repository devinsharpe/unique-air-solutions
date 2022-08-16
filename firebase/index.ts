import * as admin from "firebase-admin";

import { getFirestore } from "firebase-admin/firestore";

const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
);

let app: admin.app.App;

if (admin.apps.length === 0) {
  app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
} else {
  app = admin.app();
}

export default app;
export const db = getFirestore(app);
