import React from "react";
import { View } from "react-native";

import CampaignEmpty from "./CampaignEmpty";
import CampaignCardV2 from "../dashboard/CampaignCardV2";

type Props = {
  campaigns: any[];
  copiar: (texto: string) => void;
  formatMoney: (valor: any) => string;
  loadDashboard: (userId: string) => Promise<void>;
};

export default function CampaignList({
  campaigns,
  copiar,
  formatMoney,
  loadDashboard,
}: Props) {
      console.log("========== CAMPAIGN LIST ==========");
  console.log("TOTAL:", campaigns.length);
  console.log(campaigns);
  console.log("===================================");
  if (campaigns.length === 0) {
    return <CampaignEmpty />;
  }

  return (
    <View
      style={{
        marginTop: 16,
      }}
    >
      {campaigns.map((item) => (
        <CampaignCardV2
          key={item._id}
          item={item}
          copiar={copiar}
          formatMoney={formatMoney}
          loadDashboard={loadDashboard}
        />
      ))}
    </View>
  );
}