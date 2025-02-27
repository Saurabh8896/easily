// import users from './jobs.json' assert{type:"json"};

export default class UserModel{
    
    constructor(id,name,email,password){
        this.id = id
        this.name = name
        this.email = email
        this.password = password
    }
    
    static userRegister(name,email,password){
        const addUser = new UserModel(users.length+1,name,email,password)
        users.push(addUser)
        return addUser
    }

    static userLogin(email,password){
        const user = users.find((u)=>u.email==email && u.password==password)
        return user
    }


}

var users = [new UserModel(1,'saurabh','saurabh201490@axiscolleges.in','12345')]