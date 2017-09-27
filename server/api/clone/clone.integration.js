'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

describe('Clone API:', function() {
  describe('GET /api/clones', function() {
    var clones;

    beforeEach(function(done) {
      request(app)
        .get('/api/clones')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          clones = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(clones).to.be.instanceOf(Array);
    });
  });
});
