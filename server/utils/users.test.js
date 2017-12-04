const expect = require('expect');

const {Users} = require('./users');


describe('Users', () => {

  var users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Mike',
      room: 'Node course'
    }, {
      id: '2',
      name: 'Jen',
      room: 'React course'
    },{
      id: '3',
      name: 'Jules',
      room: 'Node course'
    }];
  });

  it('should add new user', () => {
    var users = new Users();
    var user = {
      id: '123',
      name: 'Andy',
      room: 'The office lights'
    };
    console.log(JSON.stringify(user));
    var resUser = users.addUser(user.id, user.name, user.room);
    //console.log('Got result', resUser);
    expect(users.users).toEqual([user]);
  });

  it('should remove a user whose id is passed in', () => {
    var removedUser = users.removeUser('3');
    console.log(`Removed user is ${JSON.stringify(removedUser)}`);
    expect(users.users.length).toBe(2);
    expect(removedUser.name).toBe('Jules');
  });

  it('should not remove a user if the id is not in the list', () => {
    var removedUser = users.removeUser('134');
    expect(users.users.length).toBe(3);

  });

  it('should find a valid user', () => {
    var foundUser = users.getUser('2');
    expect(foundUser.name).toBe('Jen');
  });

  it('should not find an invalid user', () => {
      var foundUser = users.getUser('134');
      expect(foundUser).toNotExist();
  });

  it('should return names for the Node course', () => {
    var userList = users.getUserList('Node course');
    expect(userList).toEqual(['Mike', 'Jules']);
  });

  it('should return names for the React course', () => {
    var userList = users.getUserList('React course');
    expect(userList).toEqual(['Jen']);
  });

});
