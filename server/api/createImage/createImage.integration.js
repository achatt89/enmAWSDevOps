'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

describe('CreateImage API:', function() {
  describe('GET /api/createImages', function() {
    var createImages;

    beforeEach(function(done) {
      request(app)
        .get('/api/createImages')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          createImages = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(createImages).to.be.instanceOf(Array);
    });
  });
});
