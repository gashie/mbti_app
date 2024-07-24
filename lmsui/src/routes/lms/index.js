const { Router } = require("express");
const {authenticate,checkgroup,checkcompleted} = require("../../middleware/protect");
const { RenderMain,RenderStudy,UserLogin,UserLogout } = require("../../controllers/lms/instructors/home");

const {
  RenderDashboard,
} = require("../../controllers/lms/instructors/dashboard");

const {
  RenderCourses,
  CreateCourse,
} = require("../../controllers/lms/instructors/courses");
const {
  RenderLessons,
  CreateLessons,
} = require("../../controllers/lms/instructors/lessons");
const {
  RenderContent,
  CreateContent,
} = require("../../controllers/lms/instructors/content");
const {
  RenderCategory,
  CreateCategory,
} = require("../../controllers/lms/instructors/category");
const {
  RenderQuiz,
  CreateQuiz,
} = require("../../controllers/lms/instructors/quiz");
const {
  RenderQuestions,
  CreateQuestions,
  SaveQuestions,
} = require("../../controllers/lms/instructors/questions");
const {
  RenderCampaign,
  CreateCampaign,
} = require("../../controllers/lms/instructors/campaign");
const {
  RenderSurvey,
  RenderSurveyThanks,
  CreateSurvey,
  ListSurvey,
  SaveSurvey,
  RemoveSurvey,
  OneSurvey,
  Updatesurvey,
  Result
} = require("../../controllers/lms/survey/");

const router = Router();

router
.use(function(req, res, next) {
res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        next();
          })
         


router.get("/", RenderMain);
router.get("/study",authenticate, RenderStudy);
router.post("/login", UserLogin);
router.get("/logout",UserLogout)
router.get("/survey",authenticate,checkcompleted, RenderSurvey);
router.post("/createsurvey",authenticate,checkgroup, SaveSurvey);
router.post("/delsurvey",authenticate,checkgroup, RemoveSurvey);
router.get("/editsurvey/:id",authenticate,checkgroup,  OneSurvey);
router.post('/updatesurvey/:id',authenticate,checkgroup, Updatesurvey)
router.get("/survey/thanks",authenticate, RenderSurveyThanks);
router.get("/dashboard/survey/list",authenticate,checkgroup, authenticate, ListSurvey);
router.get("/dashboard/survey/create",authenticate,checkgroup,  CreateSurvey);
router.get("/dashboard",authenticate,checkgroup, RenderDashboard);
router.get("/dashboard/courses",authenticate,checkgroup,  RenderCourses);
router.get("/dashboard/courses/create",authenticate,checkgroup,  CreateCourse);
router.get("/dashboard/lessons",authenticate,checkgroup,  RenderLessons);
router.get("/dashboard/lessons/create",authenticate,checkgroup,  CreateLessons);
router.get("/dashboard/content",authenticate,checkgroup,  RenderContent);
router.get("/dashboard/content/create",authenticate,checkgroup,  CreateContent);
router.get("/dashboard/category",authenticate,checkgroup,  RenderCategory);
router.get("/dashboard/category/create",authenticate,checkgroup,  CreateCategory);
router.get("/dashboard/quiz",authenticate,checkgroup,  RenderQuiz);
router.get("/dashboard/quiz/create",authenticate,checkgroup,  CreateQuiz);
router.get("/dashboard/questions",authenticate,checkgroup,  RenderQuestions);
router.get("/dashboard/questions/create/:id",authenticate,checkgroup,  CreateQuestions);
router.post("/createquestions",authenticate,checkgroup,  SaveQuestions);
router.get("/dashboard/campaign",authenticate,checkgroup,  RenderCampaign);
router.get("/dashboard/campaign/create",authenticate,checkgroup,  CreateCampaign);
router.post('/result',Result)
// //asset routes
// router.get('/asset',RenderAsset)

// router.post('/createasset',SaveAsset)
// router.post('/updateasset/:id',Updateasset)
// router.post('/delasset',RemoveAsset)
// router.get('/editasset/:id',OneAsset)

// //apps routes
// router.get('/apps',RenderApps)
// router.post('/createapp',SaveApp)
// router.post('/delapp',RemoveApp)
// router.get('/editapp/:id',OneApp)
// router.post('/updateapp/:id',Updateapp)

// //components routes
// router.get('/components/:id',RenderComponents)
// router.post('/createcomp/:appId',SaveComponent)
// router.post('/delappcomponent',RemoveComponent)
// router.get('/editcomp/:id',OneComponent)
// router.post('/updatecomponent/:id',Updatecomponent)

// //component monitoring
// router.get('/monitoring/:id',RenderMonitor)
// router.get('/quiz',RenderQuiz)
// router.post('/result',Result)

module.exports = router;
