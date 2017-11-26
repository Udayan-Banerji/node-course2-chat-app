var expect = require('expect');

var{generateMessage, generateLocationMessage} = require('./message.js');

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

describe('generateLocationMessage', () => {
  it('should generate correct location address', () => {
    var locationMessage = {
      from: 'locationTestUSer',
      latitude: 1,
      longitude: 1
    };

    var generatedLocationMessage = generateLocationMessage( locationMessage.from,
       locationMessage.latitude, locationMessage.longitude);
       console.log(JSON.stringify(generatedLocationMessage));
       expect(typeof(generatedLocationMessage.createdAt)).toBe('number');
       expect(generatedLocationMessage.from).toBe(locationMessage.from);
       expect(generatedLocationMessage.url).toBe(`https://www.google.com/maps?=${locationMessage.latitude},${locationMessage.longitude}`);

  })
});
