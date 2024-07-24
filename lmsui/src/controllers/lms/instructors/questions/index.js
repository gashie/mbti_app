const axios = require("axios");
const asynHandler = require("../../../../middleware/async");
const page = "LMS";

exports.RenderQuestions = asynHandler(async (req, res) => {
  res.render("lms/questions");
});

exports.CreateQuestions = asynHandler(async (req, res) => {

  let id = req.params.id
  try {
    let { data } = await axios.post(
      "http://192.168.0.236:3115/api/v1/quiz/listquestions",
      { id },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    res.render("lms/questions/create", {
      list: data.Data,
      surveyId: id
    });

    

  } catch (error) {
    res.send(error.response);
   
  }
});

exports.SaveQuestions = asynHandler(async (req, res) => {

  const { question, surveyId, a1, a2, ptype, status } = req.body;

  console.log(question, surveyId, a1, a2, ptype, status);
  try {
    let { data } = await axios.post(
      "http://192.168.0.236:3115/api/v1/quiz/createquestions",
      { question, surveyId, a1, a2, ptype, status },
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