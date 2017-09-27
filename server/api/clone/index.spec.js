'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var cloneCtrlStub = {
  index: 'cloneCtrl.index'
};

var routerStub = {
  get: sinon.spy()
};

// require the index with our stubbed out modules
var cloneIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './clone.controller': cloneCtrlStub
});

describe('Clone API Router:', function() {
  it('should return an express router instance', function() {
    expect(cloneIndex).to.equal(routerStub);
  });

  describe('GET /api/clones', function() {
    it('should route to clone.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'cloneCtrl.index')
        ).to.have.been.calledOnce;
    });
  });
});
