
var app = require('./../../main/js/main')

var chai = require('chai')
var expect = chai.expect

describe('chk function', () => {
  it ('should add 2', () => {
    expect(app.chk(2)).to.equal(4)
  })  
})

describe('fct function', () => {
  it ('should add 1', () => {
    expect(app.fct(2)).to.equal(3)
  })  
})

describe('flatten feature', () => {
  it ('should work with simple object', () => {
    expect(app.flatten({'a':1})).to.equal({'a':1})
    expect(app.flatten({'a':{'b':2}})).to.equal({'a.b':2})
  })
})
