import React from "react";
import { RegularButton } from "./utilities/FormElements";
import { BigBall, BigLogo, LoginBody } from "./utilities/loginElements";
import { FlexColumnGrowElementCenter } from "./utilities/SpaceContainers";

export default () => {
  return (
    <LoginBody>
      <FlexColumnGrowElementCenter className="center transparent gap-y">
        <BigBall />
        <BigBall className="delay" />
        <BigLogo>frends</BigLogo>
        <RegularButton
          className="half-p blue no-grow large"
          style={{ position: "relative", zIndex: 1 }}
        >
          Facebook login
        </RegularButton>
        <RegularButton
          className="half-p no-grow"
          style={{ position: "relative", zIndex: 1 }}
        >
          Guest login
        </RegularButton>
      </FlexColumnGrowElementCenter>
    </LoginBody>
  );
};
