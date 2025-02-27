
const error = (req,res,next)=>{
    if(req.session.data){
        next();
    }else{
        res.status(404).render('error404',{error:'only recruiter is allowed to access this page, login as recruiter to continue'})
    }
}

export default error