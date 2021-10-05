export default (token, value) => {
  return fetch(`http://192.168.0.104:3000/search/${value}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};
