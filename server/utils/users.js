

//addUser(id, name, room)

//removeUser(id)

//getUser(id)

//getUserList(room)

class Users {
  constructor () {
    this.users = [];
  }

  addUser (id, name, room) {
    var user = {id, name, room};
    this.users.push(user);
    return user;

  }
  removeUser(id) {
    // var idArray = this.users.map((user) => user.id === id) ;
    // const index = idArray.indexOf(id);
    // var removedUser = this.users[index];
    // if (index !== -1) this.users.splice(index, 1);
    var removedUser = this.users.filter((user) => user.id === id);
    if (removedUser) {
    this.users = this.users.filter((user) => user.id !== id);
  }
    return removedUser[0];
  }

  getUser (id) {
    var gotUser = this.users.filter((user) => user.id === id);
    return gotUser[0];
    //you can use the below, by putting [0] at the end
    //return this.users.filter((user) => user.id === id)[0]
  }

  getUserList (room) {
    var users = this.users.filter((user) =>  user.room === room);
    var namesArray = users.map((user)=> user.name);

    return namesArray;

  }



}

module.exports = {Users};

// class Person {
//   constructor (name, age) {
//     this.name = name;
//     this.age = age;
//   }
//
//   getUserDescription () {
//     return `${this.name} is ${this.age} year(s) old.`
//   }
// }
//
// var me = new Person('Udayan', 25);
// var description = me.getUserDescription();
//
// console.log(description);
