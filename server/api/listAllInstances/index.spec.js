'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var listAllInstancesCtrlStub = {
  index: 'listAllInstancesCtrl.index'
};

var routerStub = {
  get: sinon.spy()
};

// require the index with our stubbed out modules
var listAllInstancesIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './listAllInstances.controller': listAllInstancesCtrlStub
});

describe('ListAllInstances API Router:', function() {
  it('should return an express router instance', function() {
    expect(listAllInstancesIndex).to.equal(routerStub);
  });

  describe('GET /api/listAllInstancess', function() {
    it('should route to listAllInstances.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'listAllInstancesCtrl.index')
        ).to.have.been.calledOnce;
    });
  });
});
