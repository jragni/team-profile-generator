class Engineer{

    constructor(name, id, email, gitUser){
        this.name = name; 
        this.id = id;
        this.email = email;
        this.github = gitUser;
        this.role = "Engineer";
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

    getGithub(){
        return this.github;
    }
}

module.exports = Engineer;