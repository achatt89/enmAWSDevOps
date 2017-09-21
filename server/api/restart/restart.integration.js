'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

describe('Restart API:', function() {
  describe('GET /api/restarts', function() {
    var restarts;

    beforeEach(function(done) {
      request(app)
        .get('/api/restarts')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          restarts = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(restarts).to.be.instanceOf(Array);
    });
  });
});
