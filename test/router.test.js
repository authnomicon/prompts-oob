/* global describe, it, expect */

var expect = require('chai').expect;
var factory = require('../com/router');


describe('router', function() {
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.deep.equal('module:@authnomicon/prompts-oob.Router');
  });
  
});
