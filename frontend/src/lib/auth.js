export const checkToken = (
  token,
  profile_photo = "https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/20122208/Samoyed-standing-in-the-forest.jpg"
) => {
  return fetch("https://frends-social.herokuapp.com/auth/facebook", {
    mode: "cors",
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      access_token: token,
      profile_photo,
    }),
  }).then((res, err) => {
    if (err) return;
    return res.json();
  });
};

export const guestLogin = () => {
  return fetch("https://frends-social.herokuapp.com/auth/local", {
    mode: "cors",
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: "testing_friends@yahoo.com",
      password: "CatPasswordIsACat",
    }),
  }).then((res, err) => {
    if (err) return;
    return res.json();
  });
};
