var fake = require('../src/index');

describe('Fake AWS:', function() {
  beforeEach(function() {
    fake.reflash();
  });

  it('should the response is mock', function(done) {
    var s3 = new fake.AWS.S3();

    fake.mockResponse('s3.getObject', {
      Body: 'mock response'
    });

    s3.getObject([], function(err, data) {
      expect(data).toEqual({Body: 'mock response'});
      done();
    })
  });

  it('should the multiple response is mock', function(done) {
    var s3 = new fake.AWS.S3();

    fake.mockResponse('s3.getObject', {
      Body: 'mock response1'
    });

    fake.mockResponse('s3.getObject', {
      Body: 'mock response2'
    });

    fake.mockResponse('s3.putObject', {
      Body: 'mock response3'
    });

    s3.getObject([], function(err, data) {
      expect(data).toEqual({Body: 'mock response1'});

      s3.getObject([], function(err, data) {
        expect(data).toEqual({Body: 'mock response2'});
        
        s3.putObject([], function(err, data) {
          expect(data).toEqual({Body: 'mock response3'});
          done();
        });
      });
    });
  });

  it('should the error response is mock', function(done) {
    var s3 = new fake.AWS.S3();

    fake.mockErrorResponse('s3.getObject', {
      statusCode: 412,
      message: 'At least one of the pre-conditions you specified did not hold'
    });

    s3.getObject([], function(err, data) {
      expect(err.statusCode).toBe(412);
      expect(err.message).toBe('At least one of the pre-conditions you specified did not hold');
      done();
    })
  });
   
});