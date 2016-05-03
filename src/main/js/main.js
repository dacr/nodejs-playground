var cp = require('child_process')
var ii = require('immutable')

cp.exec("uname -a", (rc, out, err) => {console.log(out)})

var fct = (x) => x+1

function chk(x) { return x+2 }

console.log(fct(2))
console.log(chk(2))

var ppy = (ob) => JSON.stringify(ob, null, 2)

console.log(ppy(process.config))
console.log(ppy(process.versions))


function pprint(ob) {
  console.log(JSON.stringify(ob, null, 2))
}


function npmls(callback=pprint, glob=false) {
  var cmd = 'npm ls --json'
  if (glob)  cmd += ' -g'
  require('child_process').exec(cmd, (err, stdout, stderr) => {
    callback(JSON.parse(stdout.toLocaleString()))
  });
}


function flatten(ob, prefix='', sep='.') {
  var accu=ii.Map()
  function makekey(path) {
    return path.filter((s)=> s.length>0).join(sep)
  }
  function worker(value, path) {
    if (typeof value === 'function') { // Then it is ignored
    } else if (Array.isArray(value)) {
      accu = accu.set(makekey(path), value)
    } else if (typeof value === 'object') {
      for(var key in value) {
        if (key[0]!='_') worker(value[key], path.push(key))
      }
    } else {
      accu = accu.set(makekey(path), value)
    }
  }
  worker(ob, ii.List(prefix.split(sep)))
  return accu.toJS()
}


function pid() {  return process.pid }

module.exports.chk = chk
module.exports.fct = fct
module.exports.flatten = flatten
module.exports.pid = pid
module.exports.npmls = npmls
