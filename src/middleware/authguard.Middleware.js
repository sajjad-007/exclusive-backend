const authGuard = (req, res) => {
  try {
    console.log(req.headers);
  } catch (error) {
    console.error("error from auth guard", error);
  }
};

module.exports = { authGuard };
