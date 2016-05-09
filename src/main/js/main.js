const cp = require('child_process')
const ii = require('immutable')
const logger = require('winston')

logger.add(logger.transports.File, { filename: 'node.log' });

logger.info(`node application started - nodejs ${process.version}`)

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
const NPM_EXE=`./node_modules/.bin/npm`
function npmls(callback=pprint, glob=false) {
  logger.info(`npmls called glob=${glob}`)
  logger.info(`npmls is using this npm exe : ${NPM_EXE}`)
  const gopt= (glob)?'-g':''
  const cmd = `${NPM_EXE} ls --json ${gopt}`
  // take care if maxbuffer is reached the command is then killed,
  // resulting of an invalid output
  cp.exec(cmd, {'maxBuffer':10*1024*1024}, (rc, stdout, stderr) => {
    callback( JSON.parse(stdout.toLocaleString()) )
  } );
}

//pprint({'message':'hello world !'})
//npmls()

// -----------------------------------------------------------------------------
function flatten(ob, {prefix='', sep='.'}={} ) {
  logger.info(`flatten prefix=${prefix} sep=${sep}`)
  var accu=ii.Map()
  function makekey(path) {
    return path.filter((s)=> s.length>0).join(sep)
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
  worker(ob, ii.List(prefix.split(sep)))
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
