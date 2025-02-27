import { Console } from "console"
import JobModel from "../model/job.model.js"
export default class JobController{
    getjoblist(req,res){
        const jobs = JobModel.getjob()
        res.render('job-list-page',{jobs:jobs,user:req.session.data})
    }
    getJobDetails(req,res){
        const jobId = req.params.id
        const job = JobModel.getOneJob(jobId)
        res.render('job-details',{jobdetail:job,user:req.session.data})
    }
    applicants(req,res){
        const jobId = req.params.id
        res.render('applicant')
    }

    addJob(req,res){
        res.render("postjob",{user:req.session.data})
    }
    addNewJob(req,res){
        const{name,field,role,location,packages,date,skills,openings} = req.body
        const currentdate = new Date()
        const appicants = "0"
        const job = JobModel.addJob(name,field,role,location,packages,date,currentdate,skills,openings,appicants)
        if(job){
            const jobs = JobModel.getjob()
        res.status(200).render('job-list-page',{jobs:jobs,user:req.session.data})
        }else{
            res.status(404).render('error404',{error:"Job Not Posted"})
        }
    }

    updateJob(req,res){
        const jobId = req.params.id
        const job = JobModel.getOneJob(jobId)
        res.render('job-update',{jobs:job,user:req.session.data})
    }
    updateJobById(req,res){
        const jobId = Number(req.params.id)
        
        const {name,field,role,location,packages,date,skills,openings} = req.body
        const updated = JobModel.updatejob(jobId,name,field,role,location,packages,date,skills,openings)
        if(updated){      
        res.redirect('/jobs')
        }else{
            res.status(400).render('error404',{error:"Job Not Updated something went wrong"})
        }
    }

    deleteJob(req,res){
        const jobId = req.params.id
        const deleteJob = JobModel.delete(jobId)
        if(deleteJob){
            res.redirect('/jobs')
        }else{
            res.status(404).render('error404',{error:"Job Not Deleted"})
        }
    }
}