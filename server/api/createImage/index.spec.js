'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var createImageCtrlStub = {
  index: 'createImageCtrl.index'
};

var routerStub = {
  get: sinon.spy()
};

// require the index with our stubbed out modules
var createImageIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './createImage.controller': createImageCtrlStub
});

describe('CreateImage API Router:', function() {
  it('should return an express router instance', function() {
    expect(createImageIndex).to.equal(routerStub);
  });

  describe('GET /api/createImages', function() {
    it('should route to createImage.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'createImageCtrl.index')
        ).to.have.been.calledOnce;
    });
  });
});
