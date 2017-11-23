var expect = require('expect');

var{generateMessage} = require('./message.js');

describe ('generateMessage', () => {
  it('should generate the correct message object', () => {
    var testMessage = {
      from: 'testUser',
      text: 'This is a test message'
    };

    var returnMessage=generateMessage(testMessage.from, testMessage.text);
    
    expect(typeof(returnMessage.createdAt)).toBe('number');
    expect(returnMessage).toInclude(testMessage);

  });
});
