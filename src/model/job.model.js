
export default class JobModel{

    constructor(id,name,field,role,location,packages,skills,date,currentdate,openings,appicants){
        this.id= id
        this.name= name
        this.field = field
        this.role = role
        this.location = location
        this.packages = packages
        this.skills = skills
        this.date = date
        this.currentdate = currentdate
        this.openings = openings
        this.appicants = appicants
    }

    static getjob(){
        return jobs
    }
    static getOneJob(id){
        const job = jobs.find(j=>j.id==id)
        return job
    }


    static updatejob(jobId, name, field, role, location, packages, date, skills, openings) {
        const jobIndex = jobs.findIndex((job) => job.id == jobId);
        
        if (jobIndex === -1) {
            console.log("Job not found");
            return null; // Return null if no job is found with given ID
        }
    
        // Preserve the instance structure
        jobs[jobIndex] = new JobModel(
            jobs[jobIndex].id, // Preserve the original ID
            name ?? jobs[jobIndex].name,
            field ?? jobs[jobIndex].field,
            role ?? jobs[jobIndex].role,
            location ?? jobs[jobIndex].location,
            packages ?? jobs[jobIndex].packages,
            skills ?? jobs[jobIndex].skills,
            date ?? jobs[jobIndex].date,
            jobs[jobIndex].currentdate, // Preserve currentdate
            openings ?? jobs[jobIndex].openings,
            jobs[jobIndex].appicants // Preserve applicants
        );
            console.log(jobs)
        return jobs[jobIndex]; // Return updated job
    }



    static addJob(name,field,role,location,packages,date,currentdate,skills,openings,appicants){
        const addNewJob = new JobModel(jobs.length+1,name,field,role,location,packages,skills,date,currentdate,openings,appicants)
        const added = jobs.push(addNewJob)
        return added
    }

    static delete(id){
        const JobId = jobs.findIndex(j=>j.id==id)
        const deletejobs = jobs.splice(JobId,1)
        return deletejobs
    }

} 

var jobs = [
    new JobModel(1, "Coding Ninja", "Tech", "SDE", "New Delhi", "12", ['React', 'NodeJs', 'Angular', 'MongoDB', 'SQL'],"2025-02-24","2024-12-10","3","1"),
    new JobModel(2, "Microsoft", "Tech", "MERN Developer", "Gurgaon", "25", ['React', 'NodeJs', 'Express', 'MongoDB', 'SQL'],"2025-02-24","2024-12-10","4","1"),
    new JobModel(3, "Google", "Tech", "MEAN Developer", "Bangalore", "50", ['React', 'NodeJs', 'Angular'],"2025-02-24","2024-12-10","2","1"),
    new JobModel(4, "HCL", "Tech", "Full-Stack Developer", "Lucknow", "7-8", ['React', 'NodeJs', 'Angular', 'MongoDB', 'SQL','SpringBoot'],"2025-02-24","2024-12-10","2","1")
    
];
  