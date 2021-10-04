import React from "react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import { fetchFeed } from "../lib/api";
import { checkToken, guestLogin } from "../lib/auth";
import { toggleLoading } from "./slices/loadingSlice";
import { writeSession } from "./slices/sessionSlice";
import { RegularButton } from "./utilities/FormElements";
import { BigBall, BigLogo, LoginBody } from "./utilities/loginElements";
import { FlexColumnGrowElementCenter } from "./utilities/SpaceContainers";

export default () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const session = useSelector((state) => state.session.value);

  const responseFacebook = (response) => {
    const { accessToken } = response;
    if (!accessToken) return;
    checkToken(accessToken, response.picture.data.url).then((data) => {
      if (!data) return;
      dispatch(writeSession(data));
      history.push("/");
    });
  };

  const localResponse = () => {
    guestLogin().then((data) => {
      if (!data) return;
      dispatch(writeSession(data));
      history.push("/");
    });
  };

  return (
    <LoginBody>
      {session && <Redirect to="/" />}
      <FlexColumnGrowElementCenter className="center transparent gap-y">
        <BigBall />
        <BigBall className="delay" />
        <BigLogo>frends</BigLogo>
        <FacebookLogin
          appId="1474724352891583"
          callback={responseFacebook}
          fields="name,email,picture"
          render={(renderProps) => (
            <RegularButton
              onClick={renderProps.onClick}
              className="half-p blue no-grow large"
              style={{ position: "relative", zIndex: 1 }}
            >
              Facebook login
            </RegularButton>
          )}
        />
        <RegularButton
          onClick={localResponse}
          className="half-p no-grow"
          style={{ position: "relative", zIndex: 1 }}
        >
          Guest login
        </RegularButton>
      </FlexColumnGrowElementCenter>
    </LoginBody>
  );
};
