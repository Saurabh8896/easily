
import express from 'express'
import path from 'path'
import ejsLayouts from 'express-ejs-layouts';
import session from 'express-session'

import UserController  from "./src/controller/user.controller.js";
import JobController from './src/controller/job.controller.js';
import error from './src/middlewares/404.middleware.js';
import ApplicantController from './src/controller/applicant.controller.js';
import { uploadfile } from './src/middlewares/fileupload.middleware.js';
import errorUser from './src/middlewares/usererror.middleware.js'
const app = express();
app.use(session({
    secret:'SecretKey',
    resave: false,
    saveUninitialized: true,
    cookie:{secure:false},
  })); 
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


const usercontroller = new UserController()
const jobcontroller = new JobController()
const applicantController = new ApplicantController()
app.set('view engine','ejs')
app.use(express.static('public'))
app.use("/resume", express.static('resume'))
app.set('views',path.join(path.resolve(),'src','views'))
app.use(ejsLayouts)

// Layout

app.post('/search',jobcontroller.searchJob)

// User All Routes

app.get('/',usercontroller.get)
app.get('/login',usercontroller.getLogin)
app.post('/login',usercontroller.getUserLogin)
app.get('/logout',usercontroller.userLogout)
app.post('/register',usercontroller.userRegister)


// Job All Routes
app.get('/jobs',jobcontroller.getjoblist)
app.get('/postjob',error,jobcontroller.addJob)
app.get('/jobdetail/:id',jobcontroller.getJobDetails)
app.post('/job',jobcontroller.addNewJob)
app.get('/job/update/:id',error,jobcontroller.updateJob)
app.post('/job/update/:id',jobcontroller.updateJobById)
app.get('/job/delete/:id',error,jobcontroller.deleteJob)


// Applicant All routes
app.post('/apply/:id',uploadfile.single('resume'),applicantController.applyJob)
app.get('/applicants/:id',error,applicantController.applicants)

// Error Route
app.get('/error',error)
app.get('/usererror',errorUser)


// Server Running Information
app.listen(3400,()=>{
    console.log("Server Running on port number 3400")
})
