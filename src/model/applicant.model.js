export default class ApplicantModel {
  constructor(id, name, email, contact, productid, url) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.contact = contact;
    this.productid = productid;
    this.url = url;
  }

  static addapplicant(body, fileUrl) {
    const { name, email, contact, productId } = body;
    const addNewApplicant = new ApplicantModel(
      appicants.length + 1,
      name,
      email,
      contact,
      productId,
      fileUrl
    );
    const addapplicant = appicants.push(addNewApplicant);
    return addNewApplicant;
  }
  static getApplicantById(id){
            const applicant = appicants.filter((a)=>a.productid==id)
            return applicant
  }
}

var appicants = [
  new ApplicantModel(
    1,
    "Saurabh Kumar",
    "saurabh201490@axiscolleges.in",
    "09580948346",
    "2",
    "http://localhost:3400/resume/1741005533840Saurabh.pdf"
  ),
  new ApplicantModel(
    2,
    "Shubham Kumar",
    "shubham@colleges.in",
    "09580948452",
    "1",
    "http://localhost:3400/resume/1741005533840Saurabh.pdf"
    ),
  new ApplicantModel(
    3,
    "Sunil Kumar",
    "sunil@gmail.in",
    "09580948454",
    "4",
    "http://localhost:3400/resume/1741005533840Saurabh.pdf"
  ),
];
