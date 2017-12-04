const expect = require('expect');
// const request = require('supertest');

const {isRealString} = require('./validation.js');
// const {app} = require('./../../server/server');

describe('isRealString', ()=> {
  // it('should reject non-string values', (done)=> {
  //   request(app)
  //   .post('/')
  //   .send({name: '    ', room: '    '})
  //   .expect((res)=> {
  //     expect(res.body.name).toBe('');
  //     expect(res.body.room).toBe('');
  //   })
  //   .end(done);
  // });

  it('should reject non-string values', ()=> {
    expect(isRealString(123)).toBe(false);
   });

  it('should reject string with only spaces', ()=> {
    expect(isRealString('   ')).toBe(false);
   });

  it('should reject string with only spaces', ()=> {
    expect(isRealString(' fs dsfd   ')).toBe(true);
  });

});
