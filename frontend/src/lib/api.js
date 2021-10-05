export const fetchFeed = (token, id, element) => {
  let url;
  switch (element) {
    case "post":
      url = `https://frends-social.herokuapp.com/posts/${id}/`;
      break;
    case "notifications":
      url = `https://frends-social.herokuapp.com/users/${id}/notifications`;
      break;
    case "chatrooms":
      url = `https://frends-social.herokuapp.com/users/${id}/chatrooms`;
      break;
    case "user":
      url = `https://frends-social.herokuapp.com/users/${id}/`;
      break;
    default:
      url = `https://frends-social.herokuapp.com/users/${id}/feed`;
      break;
  }
  return fetch(url, {
    mode: "cors",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

export const sendData = (method, url, token, e) => {
  e.preventDefault();
  let formData = new FormData(e.target);
  if (url.indexOf("comments") !== -1 || url.indexOf("chatrooms") !== -1) {
    const entries = formData.entries();
    formData = new URLSearchParams();
    for (const [key, value] of entries) {
      formData.append(key, value);
    }
  }
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

export const manageLikes = (method, postId, token) => {
  return fetch(`https://frends-social.herokuapp.com/posts/${postId}/likes`, {
    mode: "cors",
    method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    console.log(res);
  });
};

export const deleteComments = (token, postId, commentId) => {
  return fetch(
    `https://frends-social.herokuapp.com/posts/${postId}/comments/${commentId}`,
    {
      mode: "cors",
      method: "delete",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const deletePost = (token, postId, userId) => {
  return fetch(
    `https://frends-social.herokuapp.com/users/${userId}/posts/${postId}`,
    {
      mode: "cors",
      method: "delete",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const manageCommentLikes = (token, postId, commentId, method) => {
  return fetch(
    `https://frends-social.herokuapp.com/posts/${postId}/comments/${commentId}/likes`,
    {
      mode: "cors",
      method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  ).then((res) => {
    console.log(res);
  });
};

export const manageNotifications = (token, method, userId, notiId = "") => {
  const url = `https://frends-social.herokuapp.com/users/${userId}/notifications/${notiId}`;
  fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => console.log(res));
};

export const createChatroom = (token, userId) => {
  const url = `https://frends-social.herokuapp.com/users/${userId}/chatrooms`;
  return fetch(url, {
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const handleFriends = (token, method, field, currId, friendId) => {
  let url;
  const body = {};
  if (field === "friends") {
    url = `https://frends-social.herokuapp.com/users/${currId}/friends`;
    body.friendId = friendId;
    if (method === "delete")
      url = `https://frends-social.herokuapp.com/users/${currId}/friends/${friendId}`;
  }
  if (field === "sent_requests") {
    url = `https://frends-social.herokuapp.com/users/${friendId}/requests`;
    if (method === "delete") body.sender = "true";
  }
  if (field === "received_requests") {
    url = `https://frends-social.herokuapp.com/users/${friendId}/requests`;
    if (method === "delete") body.sender = "false";
  }
  return fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  }).then(console.log);
};
