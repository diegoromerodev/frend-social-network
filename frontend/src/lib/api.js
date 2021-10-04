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

export const sendData = (e) => {
  e.preventDefault();
  const inputs = Array.from(e.target.children);
  readFormData(inputs).then((data) => {
    console.log(Array.from(data.entries()));
  });
};
