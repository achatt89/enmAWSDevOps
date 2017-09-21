'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

describe('Stop API:', function() {
  describe('GET /api/stops', function() {
    var stops;

    beforeEach(function(done) {
      request(app)
        .get('/api/stops')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          stops = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(stops).to.be.instanceOf(Array);
    });
  });
});
