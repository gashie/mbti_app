const axios = require("axios");
const asynHandler = require("../../../middleware/async");
const page = "LMS";

exports.RenderSurvey = asynHandler(async (req, res) => {
  let { data } = await axios.post(
    `http://192.168.0.236:3115/api/v1/quiz/allquestions`
  );
 
  res.render("lms/survey", {
    list: data.Data,layout:'survey.hbs',username:req.session.fullName, email:req.session.email
  });

  
});

exports.RenderSurveyThanks = asynHandler(async (req, res) => {
    res.render("lms/survey/thanks",{layout:'survey.hbs'});
  });
  
exports.CreateSurvey = asynHandler(async (req, res) => {
    res.render("lms/survey/create");
  });
  
exports.ListSurvey = asynHandler(async (req, res) => {
try {
  let { data } = await axios.post(
    `http://192.168.0.236:3115/api/v1/quiz/viewsurvey`
  );
  res.render("lms/survey/list",{
    list: data.Data,
  });

  console.log(data);
} catch (error) {
  console.log(error.response);
}
  });
  

  exports.SaveSurvey = asynHandler(async (req, res) => {
    const { title,description,status } = req.body;
   
  
    try {
      let { data } = await axios.post(
        `http://192.168.0.236:3115/api/v1/quiz/createsurvey`,
        { title,description,status },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      res.json(data);
    } catch (error) {
      res.send(error.response.data);
    }
  });

  exports.OneSurvey = asynHandler(async (req, res) => {
    const { id } = req.params;
  
    try {
      let { data } = await axios.post(
        `http://192.168.0.236:3115/api/v1/quiz/singlesurvey`,
        { id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      res.render("lms/survey/edit", {
        list: data.Data,
      });
  
      console.log(data.Data);
    } catch (error) {
      res.send(error.response.data);
    }
  });

  exports.RemoveSurvey = asynHandler(async (req, res) => {
    const { id } = req.body;
  
    try {
      let { data } = await axios.post(
        `http://192.168.0.236:3115/api/v1/quiz/deletesurvey`,
        { id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      res.json(data);
    } catch (error) {
      res.send(error.response.data);
    }
  });
  
  exports.Updatesurvey = asynHandler(async (req, res) => {
    const { id } = req.params;
    const { title,description,status} = req.body;
    console.log( { id, title,description,status});
  
    try {
      let { data } = await axios.post(
        `http://192.168.0.236:3115/api/v1/quiz/updatesurvey`,
        { id, title,description,status},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      res.json(data);
    } catch (error) {
      res.send(error.response.data);
    }
  });
  
  exports.Result = asynHandler(async (req, res) => {

    let mainbody = req.body
    delete mainbody.website ;
  //  delete  mainbody.name;
  //  delete mainbody.email;
  //  delete mainbody.phone;
  //  delete mainbody.age;
  //  delete mainbody.gender ;
  //  delete mainbody.terms;
    delete mainbody.process ;
    
    try {
      let { data } = await axios.post(
        `http://192.168.0.236:3115/api/v1/quiz/compute`,
        { mainbody },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      res.render("lms/survey/thanks",{layout:'thanks.hbs', result: data.Data, break:data.breakdown});
  
      // res.json(data);
  
     
    } catch (error) {
      console.log(error.response.data);
      req.flash("error_msg", error.response.data.Message);
      return res.redirect("/study");
    }
    
  });