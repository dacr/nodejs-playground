
var app = require('./../../main/js/main')

var chai = require('chai')
var chaii = require('chai-immutable')

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

describe('pid function', () => {
  it ('should return number', () => {
    expect(app.pid()).to.be.a('number')
  })
})


describe('flatten feature', () => {
  it ('should work with an empty object', () => {
    expect(app.flatten({})).to.deep.equal({})
  })
  it ('should work with simple object', () => {
    expect(app.flatten({'a':1})).to.deep.equal({'a':1})
  })
  it ('should work with simple object and a specified prefix', () => {
    expect(app.flatten({'a':1}, 'root')).to.deep.equal({'root.a':1})
  })
  it ('should work with simple object and a specified longer prefix', () => {
    expect(app.flatten({'a':1}, 'root.subroot')).to.deep.equal({'root.subroot.a':1})
  })
  it ('should walk into object tree', () => {
    expect(app.flatten({'a':{'b':2}})).to.deep.equal({'a.b':2})
  })
  it ('should walk through several object subtrees', () => {
    expect(app.flatten({'a':{'b':2}, 'A':{'B':{'C':3}, 'D':4}})).to.deep.equal({'a.b':2, 'A.B.C':3, 'A.D':4})
  })
  it ('should work with process.versions', () => {
    expect(app.flatten(process.versions)).to.contains.any.keys('http_parser')
  })
  it ('should work with process.config', () => {
    var flat = app.flatten(process.config)
    expect(flat).to.contains.any.keys('variables.target_arch')
  })
  it ('should work with process.argv with an array content', () => {
    var flat = app.flatten(process.argv, 'argv')
    expect(flat).to.contains.any.keys('argv')
  })
})

