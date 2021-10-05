export const fetchFeed = (token, id, element) => {
  let url;
  switch (element) {
    case "post":
      url = `http://192.168.0.104:3000/posts/${id}/`;
      break;
    case "notifications":
      url = `http://192.168.0.104:3000/users/${id}/notifications`;
      break;
    case "chatrooms":
      url = `http://192.168.0.104:3000/users/${id}/chatrooms`;
      break;
    default:
      url = `http://192.168.0.104:3000/users/${id}/feed`;
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
  if (url.indexOf("comments") !== -1) {
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
  return fetch(`http://192.168.0.104:3000/posts/${postId}/likes`, {
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
    `http://192.168.0.104:3000/posts/${postId}/comments/${commentId}`,
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
  return fetch(`http://192.168.0.104:3000/users/${userId}/posts/${postId}`, {
    mode: "cors",
    method: "delete",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const manageCommentLikes = (token, postId, commentId, method) => {
  return fetch(
    `http://192.168.0.104:3000/posts/${postId}/comments/${commentId}/likes`,
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
