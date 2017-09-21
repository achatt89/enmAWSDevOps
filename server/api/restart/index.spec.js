'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var restartCtrlStub = {
  index: 'restartCtrl.index'
};

var routerStub = {
  get: sinon.spy()
};

// require the index with our stubbed out modules
var restartIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './restart.controller': restartCtrlStub
});

describe('Restart API Router:', function() {
  it('should return an express router instance', function() {
    expect(restartIndex).to.equal(routerStub);
  });

  describe('GET /api/restarts', function() {
    it('should route to restart.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'restartCtrl.index')
        ).to.have.been.calledOnce;
    });
  });
});
