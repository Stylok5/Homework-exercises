const fallback = (req, res, next) => {
  return res.status(404).json({ message: "Server error" });
};
export default fallback;
