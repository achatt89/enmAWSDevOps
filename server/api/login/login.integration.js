'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

describe('Login API:', function() {
  describe('GET /api/logins', function() {
    var logins;

    beforeEach(function(done) {
      request(app)
        .get('/api/logins')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          logins = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(logins).to.be.instanceOf(Array);
    });
  });
});
