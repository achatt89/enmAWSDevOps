'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var stopCtrlStub = {
  index: 'stopCtrl.index'
};

var routerStub = {
  get: sinon.spy()
};

// require the index with our stubbed out modules
var stopIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './stop.controller': stopCtrlStub
});

describe('Stop API Router:', function() {
  it('should return an express router instance', function() {
    expect(stopIndex).to.equal(routerStub);
  });

  describe('GET /api/stops', function() {
    it('should route to stop.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'stopCtrl.index')
        ).to.have.been.calledOnce;
    });
  });
});
