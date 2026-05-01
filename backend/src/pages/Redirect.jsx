import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { collection, query, where, getDocs, doc, updateDoc, increment } from "firebase/firestore";
import { db } from "../firebase/config";

export default function Redirect() {
  const { code } = useParams();

  useEffect(() => {
    const run = async () => {
      const q = query(
        collection(db, "campaigns"),
        where("code", "==", code)
      );

      const snap = await getDocs(q);

      if (!snap.empty) {
        const campaign = snap.docs[0];
        const data = campaign.data();

        // 💰 REGRA DE MONETIZAÇÃO (ex: R$ 0,50 por clique)
        const earningsPerClick = 0.50;

        await updateDoc(doc(db, "campaigns", campaign.id), {
          clicks: increment(1),
          earnings: (data.earnings || 0) + earningsPerClick
        });

        // 🔗 redireciona para produto
        window.location.href = data.url;
      }
    };

    run();
  }, [code]);

  return <h2>Redirecionando...</h2>;
}