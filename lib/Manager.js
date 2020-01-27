class Manager{

    constructor(name, id, email,officeNumber){
        this.name = name; 
        this.id = id;
        this.email = email;
        this.officeNumber = officeNumber;
        this.role = "Manager";
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
    getOfficeNumber(){
        return this.officeNumber;
    }
};

module.exports = Manager;