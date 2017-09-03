'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

describe('ListAllInstances API:', function() {
  describe('GET /api/listAllInstancess', function() {
    var listAllInstancess;

    beforeEach(function(done) {
      request(app)
        .get('/api/listAllInstancess')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          listAllInstancess = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(listAllInstancess).to.be.instanceOf(Array);
    });
  });
});
