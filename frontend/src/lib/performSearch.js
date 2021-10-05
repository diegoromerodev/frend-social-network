export default (token, value) => {
  return fetch(`https://frends-social.herokuapp.com/search/${value}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};
