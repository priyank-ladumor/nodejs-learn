// Object

let user = {
    name: "John",
    surname: "Smith"
};

user.age = 15;

console.log(user);

for(let key in user){
    console.log(key); //user, name ,..
    console.log(user[key]); //john, smith, 15
}