import ApplicantModel from "../model/applicant.model.js";
export default class ApplicantController{

    applyJob(req,res){
        const fileUrl = `${req.protocol}://${req.get('host')}/public/applicantresume/${req.file.filename}`;
        console.log(fileUrl)
        const body = req.body
        const applicant = ApplicantModel.addapplicant(body,fileUrl)

        if(applicant){
            res.redirect('/jobs')
        }else{
            res.status(400).json({status:false,data:"Something went wrong please fill it again"})
        }
    }

    applicants(req,res){
        const jobId = req.params.id
        const applicant = ApplicantModel.getApplicantById(jobId)
        res.status(200).render('applicant',{applicants:applicant,user:req.session.data})
    }
}