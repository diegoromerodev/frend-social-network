export const checkToken = (
  token,
  profile_photo = "https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/20122208/Samoyed-standing-in-the-forest.jpg"
) => {
  return fetch("http://192.168.0.104:3000/auth/facebook", {
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
  return fetch("http://192.168.0.104:3000/auth/local", {
    mode: "cors",
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: "totallydiegosemail@email.com",
      password: "this123",
    }),
  }).then((res, err) => {
    if (err) return;
    return res.json();
  });
};
