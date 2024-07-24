exports.authenticate = async (req, res, next) => {
  if (!req.session || !req.session.user || !req.session.isAssigned) {
    req.flash("error_msg", "Not Authorized.");
  return  res.redirect("/");
  }

  next()
};

exports.checkgroup = async (req, res, next) => {
    if (!req.session || !req.session.isAdmin) {
      req.flash("error_msg", "Access Denied!");
    return  res.redirect("/");
    }
  
    next()
};

exports.checkcompleted = async (req, res, next) => {
  if (req.session && req.session.isComplete) {
    req.flash("error_msg", "Quiz already completed!");
  return  res.redirect("/study");
  }

  next()
};
