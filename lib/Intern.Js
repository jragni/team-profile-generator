class Intern{

    constructor(name, id, email,school){
        this.name = name; 
        this.id = id;
        this.email = email;
        this.school = school;
        this.role = "Intern";
        console.log(`${this.name} has been logged`);
    }

    getId(){
        return this.id;
    };

    getName(){
        return this.name;
    }; 
    getEmail(){
        return this.email;
    };
    getRole(){ 
        return this.role;
    };
    getSchool(){
        return this.school;
    }
}

module.exports = Intern;