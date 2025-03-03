
const errorUser = (req,res,next)=>{

    res.status(404).render('error404',{error:'only valid user will delete or update the job post'})
}

export default errorUser