import JobModel from "../model/job.model.js"
import ApplicantModel from "../model/applicant.model.js"
import { parse } from "path"
export default class JobController{
    getjoblist(req,res){
        const jobs = JobModel.getjob()
        res.render('job-list-page',{jobs:jobs,user:req.session.data})
    }
    getJobDetails(req,res){
        const jobId = req.params.id
        const job = JobModel.getOneJob(jobId)
        const applicant = ApplicantModel.getApplicantById(jobId)
        let userId = null
        if(req.session.data){
          userId = req.session.data.id
        }    
        
        const checkValidId = JobModel.checkId(jobId,userId)
        const totalapplicant = applicant.length
        if(checkValidId){
        res.render('job-details',{jobdetail:job,user:req.session.data,totalapplicant:totalapplicant,uservalidId:true})
        }else{
        res.render('job-details',{jobdetail:job,user:req.session.data,totalapplicant:totalapplicant,uservalidId:false})
        }
    }
    

    addJob(req,res){
        res.render("postjob",{user:req.session.data})
    }
    addNewJob(req,res){
        const{name,field,role,location,packages,date,skills,openings} = req.body
        const currentdate = new Date()
        let userId = null
        if(req.session.data){
          userId = req.session.data.id
        }
        const job = JobModel.addJob(name,field,role,location,packages,date,currentdate,skills,openings,userId)
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

    searchJob(req,res){
            try {
                const query = req.body.search ? req.body.search.toLowerCase().trim() : "";
        
                if (!query) {
                    return res.render("job-list-page", { jobs: [], user: req.session.data });
                }
        
                const queryWords = query.split(/\s+/); // Split input into words
                
                const jobs = JobModel.getjob(); // Get job list
        
                // Ensure jobs is an array
                if (!Array.isArray(jobs)) {
                    console.error("JobModel.getjob() did not return an array");
                    return res.status(500).send("Error fetching jobs");
                }
        
                // Ensure each job has a companyName before filtering
                const results = jobs.filter(job => 
                    job.name && 
                    queryWords.every(word => job.name.toLowerCase().includes(word))
                );
        
                res.status(200).render("job-list-page", { jobs: results, user: req.session.data });
                    // res.status(200).json({jobs:results})
            } catch (error) {
                console.error("Error in searchJob:", error);
                res.status(500).send("Internal Server Error");
            }

        }
    
}