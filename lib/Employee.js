
class Employee{

    constructor(name, id, email){
        this.name = name; 
        this.id = id;
        this.email = email;
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
        return "Employee";
    };
}

// TEST 
// const a = new Employee("alex",2,"fartbot@gmail.com","engineer");
// console.log(a);
// console.log(a.getId(),a.getEmail(),a.getName(),a.getRole());

module.exports = Employee;
