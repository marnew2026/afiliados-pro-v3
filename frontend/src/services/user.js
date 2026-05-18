import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../afiliados-pro-mobile/src/services/firebase";

export const isUserPro = async (email) => {
  const userRef = doc(db, "users", email);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    return userSnap.data().isPro === true;
  }

  return false;
};