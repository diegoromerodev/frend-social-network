import { readFormData } from "./dataProcessing";

export const fetchFeed = (token, userId) => {
  return fetch(`http://192.168.0.104:3000/users/${userId}/feed`, {
    mode: "cors",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

export const fetchChatroom = () => {};

export const sendData = (method, url, token, e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  return fetch(url, {
    mode: "cors",
    method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  }).then((res) => {
    console.log(res);
  });
};
