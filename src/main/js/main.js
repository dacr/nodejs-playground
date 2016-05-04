const cp = require('child_process')
const ii = require('immutable')

//cp.exec("uname -a", (rc, out, err) => {console.log(out)})

const fct = (x) => x+1
function chk(x) { return x+2 }

const ppy = (ob) => JSON.stringify(ob, null, 2)

//console.log(ppy(process.config))
//console.log(ppy(process.versions))

function pprint(ob) {
  console.log(JSON.stringify(ob, null, 2))
}

// -----------------------------------------------------------------------------
function testcb(callback=pprint) {
  callback("hello")
}

// -----------------------------------------------------------------------------
function npmls(callback=pprint, glob=false) {
  const gopt= (glob)?'-g':''
  const cmd = `npm ls --json ${gopt}`
  // take care if maxbuffer is reached the command is then killed,
  // resulting of an invalid output
  cp.exec(cmd, {'maxBuffer':10*1024*1024}, (rc, stdout, stderr) => {
    callback( JSON.parse(stdout.toLocaleString()) )
  } );
}

//pprint({'message':'hello world !'})
//npmls()

// -----------------------------------------------------------------------------
function flatten(ob, options={}) {
  if (options.sep === undefined) options.sep = '.'
  if (options.prefix === undefined) options.prefix = ''
  var accu=ii.Map()
  function makekey(path) {
    return path.filter((s)=> s.length>0).join(options.sep)
  }
  function worker(value, path) {
    if (typeof value === 'function') { // Then it is ignored
    } else if (Array.isArray(value)) {
      accu = accu.set(makekey(path), value)
    } else if (typeof value === 'object') {
      for(const key in value) {
        if (key[0]!='_') worker(value[key], path.push(key))
      }
    } else {
      accu = accu.set(makekey(path), value)
    }
  }
  worker(ob, ii.List(options.prefix.split(options.sep)))
  return accu.toJS()
}


// -----------------------------------------------------------------------------
function pid() {  return process.pid }

module.exports.chk = chk
module.exports.fct = fct
module.exports.flatten = flatten
module.exports.pid = pid
module.exports.npmls = npmls
module.exports.testcb = testcb
