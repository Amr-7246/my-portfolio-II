export const openWeb = (link) => {
    if (link) {
      window.open(link, "_blank");
    } else {
      console.log("No link provided");
    }
  };
