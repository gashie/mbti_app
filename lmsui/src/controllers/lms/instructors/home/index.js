const axios = require('axios');
const asynHandler = require('../../../../middleware/async');
const page = 'LMS';
exports.RenderMain = asynHandler(async (req, res) => {
  res.render('lms/home/index', {
    pageData: page,
    pageIndex: 'Home',
    home: true,
    layout: 'home.hbs',
    user: req.session.user,
  });
});

exports.RenderStudy = asynHandler(async (req, res) => {
  res.render('lms/home/study', {
    pageData: page,
    pageIndex: 'Home',
    home: true,
    layout: 'home.hbs',
    user: req.session,
    isComplete: req.session.isComplete,
  });
});

exports.UserLogin = asynHandler(async (req, res) => {
  const { username, password } = req.body;

  try {
    let { data } = await axios.post(
      ' http://192.168.0.236:3115/api/v1/quiz/login',
      { username, password },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
console.log(data);
    if (data && data.Status == 1 && data.Data[0].isAssigned) {
      if (data && data.Data[0].isAdmin) {
        req.session.user = data.Data[0].userName;
        req.session.isAdmin = data.Data[0].isAdmin;
        req.session.email = data.Data[0].email;
        req.session.fullName = data.Data[0].fullName;
        req.session.isComplete = data.Data[0].isComplete;
        req.session.isAssigned = data.Data[0].isAssigned;
        res.redirect('/dashboard');
      } else {
        req.session.user = data.Data[0].userName;
        req.session.isAdmin = data.Data[0].isAdmin;
        req.session.email = data.Data[0].email;
        req.session.fullName = data.Data[0].fullName;
        req.session.isComplete = data.Data[0].isComplete;
        req.session.isAssigned = data.Data[0].isAssigned;
        res.redirect('/study');
      }
    } else {
      req.flash('error_msg', 'Sorry, you do not have access');
      return res.redirect('/');
    }
  } catch (error) {
    console.log(error);
    req.flash('error_msg', error.response.data.Message);
    return res.redirect('/');
  }
});


exports.UserLogout = asynHandler(async (req, res) => {
 
  
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.status(400).send('Unable to log out')
      } else {
        res.redirect("/");
      }
    });
  } else {
    res.end()
  
  }

})