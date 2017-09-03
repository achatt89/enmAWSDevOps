'use strict';

describe('Service: callAPI', function() {
  // load the service's module
  beforeEach(module('callAPI'));

  // instantiate service
  var callAPI;
  beforeEach(inject(function(_callAPI_) {
    callAPI = _callAPI_;
  }));

  it('should do something', function() {
    expect(!!callAPI).to.be.true;
  });
});
