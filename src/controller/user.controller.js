import session from "express-session";
import UserModel from "../model/user.model.js";
import JobModel from "../model/job.model.js";
export default class UserController {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  get(req, res) {
    res.render("index", { user: req.session.data });
  }

  getLogin(req, res) {
    res.render("login-page");
  }
  getUserLogin(req, res) {
    const { email, password } = req.body;
    const user = UserModel.userLogin(email, password);
    const jobs = JobModel.getjob();
    req.session.data = user;
    if (user) {
      res
        .status(200)
        .render("job-list-page", { jobs: jobs, user: req.session.data });
    } else {
      res.status(404).render("error404", { error: "User Not Found" });
    }
  }

  userRegister(req, res) {
    const { name, email, password } = req.body;
    const user = UserModel.userRegister(name, email, password);
    if (user) {
      res.status(200).render("login-page");
    } else {
      res.status(400).json({
        success: false,
      });
    }
  }

  userLogout(req, res) {
    req.session.destroy();
    res.status(200).render("login-page");
  }
}
