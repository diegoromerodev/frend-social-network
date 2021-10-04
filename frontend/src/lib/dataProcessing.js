export const setMessageOnSwitch = (type) => {
  let icon = "";
  let message = "";
  switch (type) {
    case "comment":
      icon = "fa-comment-dots";
      message = "Write your comment...";
      break;
    case "image-post":
      icon = "fa-camera-retro";
      message = "Describe the photo...";
      break;
    case "emotion-post":
      icon = "fa-face-grin-tears";
      message = "Tell us about it...";
      break;
    default:
      icon = "fa-book-open";
      message = "Write your thoughts...";
      break;
  }
  return { icon, message };
};

export const www = () => {};
