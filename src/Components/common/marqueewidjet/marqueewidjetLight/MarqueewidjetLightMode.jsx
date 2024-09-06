import React from "react";

const MarqueewidjetLightMode = () => {
  return (
    <div>
      <gecko-coin-price-marquee-widget
        locale="en"
        outlined="true"
        coin-ids="tron,dogs-2,the-open-network,zano,ethereum,bitcoin,notcoin,orderly-network,pepe,solana,dogwifcoin,kaspa,bittensor,resistance-dog,aerodrome-finance"
        initial-currency="usd"
      ></gecko-coin-price-marquee-widget>
    </div>
  );
};

export default MarqueewidjetLightMode;
