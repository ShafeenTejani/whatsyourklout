const kloutCategory = (score) => {
  if (score > 0 && score <= 33) {
    return "low";
  } else if (score <= 66) {
    return "medium";
  } else {
    return "high";
  }
};

export default kloutCategory;
