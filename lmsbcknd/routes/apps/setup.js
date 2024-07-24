const express = require("express");

const router = express.Router();
// Result SETUP
const {
  ProcessResult,
  ViewResult,
  ViewPsCount,
  ViewTotal
} = require("../../controllers/process/result");

// Auth SETUP
const {
  Login
} = require("../../controllers/auth/login");

//Instructors
const {
  CreateCourse,
  ViewCourses
} = require("../../controllers/instructors/courses/course");
const {
  CreateCategory
} = require("../../controllers/instructors/courses/category");
const {
  CreateLesson,
  ViewLessons
} = require("../../controllers/instructors/courses/lesson");
const {
  CreateQuiz
} = require("../../controllers/instructors/courses/quiz");
const {
  CreateQuestions,ViewQuestionsList,ViewQuestions
} = require("../../controllers/instructors/courses/question");

const {
  CreateCampaign
} = require("../../controllers/instructors/courses/campaign");

const {
  CreateContent,
  ViewContents
} = require("../../controllers/instructors/courses/content");

const {
ViewSurvey,
CreateSurvey,
SingleSurvey,
RemoveSurvey,
UpdateSurvey
} = require("../../controllers/instructors/courses/survey");

//routes for result
router.route("/compute").post(ProcessResult);
router.route("/viewresult").post(ViewResult);
router.route("/viewpscount").post(ViewPsCount);
router.route("/viewtotals").post(ViewTotal);

//routes for instructors
router.route("/createcourse").post(CreateCourse);
router.route("/viewcourses").post(ViewCourses);
router.route("/createcategory").post(CreateCategory);
router.route("/createlesson").post(CreateLesson);
router.route("/viewlessons").post(ViewLessons);
router.route("/createcontent").post(CreateContent);
router.route("/viewcontent").post(ViewContents);
router.route("/createquiz").post(CreateQuiz);
router.route("/createquestions").post(CreateQuestions);
router.route("/listquestions").post(ViewQuestionsList);
router.route("/allquestions").post(ViewQuestions);
router.route("/createcampaign").post(CreateCampaign);
router.route("/createsurvey").post(CreateSurvey);
router.route("/viewsurvey").post(ViewSurvey);
router.route("/singlesurvey").post(SingleSurvey);
router.route("/deletesurvey").post(RemoveSurvey);
router.route("/updatesurvey").post(UpdateSurvey);
router.route("/login").post(Login);

module.exports = router;
