
var cp = require('child_process')

cp.exec("uname -a", (rc, out, err) => {console.log(out)})

var fct = (x) => x+1

function chk(x) { return x+2 }

console.log(fct(2))
console.log(chk(2))

var ppy = (ob) => JSON.stringify(ob, null, 2)

console.log(ppy(process.config))
console.log(ppy(process.versions))


function npmls(cb, glob) {
  var cmd = 'npm ls --json'
  if (glob)  cmd += ' -g'
  require('child_process').exec(cmd, (err, stdout, stderr) => {
    cb(JSON.parse(stdout.toLocaleString()))
  });
}

function flatten(ob, sep='.') {
  for(var key in Object.keys(ob)) { 
    var value = ob[key]
  }
}


module.exports.chk = chk
module.exports.fct = fct
module.exports.flatten = flatten
