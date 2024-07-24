const axios = require("axios");
const asynHandler = require("../../../../middleware/async");
const page = 'LMS'
exports.RenderDashboard = asynHandler(async (req, res) => {

    let { data } = await axios.post(
        " http://192.168.0.236:3115/api/v1/quiz/viewresult"
      );

      let resp = await axios.post(
        " http://192.168.0.236:3115/api/v1/quiz/viewpscount"
      );
     
      let tots = await axios.post(
        " http://192.168.0.236:3115/api/v1/quiz/viewtotals"
      );
     

      console.log(tots.data.Data[1]);
 
    res.render('lms/dashboard/index',{resultData: data.Data, psdata:resp.data.Data,totals:tots.data.Data[0],totalusers:tots.data.Data[1] })
});


exports.RenderCourses = asynHandler(async (req, res) => {
    res.render('lms/courses')
});

exports.CreateCourse = asynHandler(async (req, res) => {
    res.render('lms/courses/create')
});



