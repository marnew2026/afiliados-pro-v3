import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLogged(!!user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) return null;

  if (logged) {
    return <Redirect href={"/dashboard" as any} />;
  }

  return <Redirect href={"/login" as any} />;
}