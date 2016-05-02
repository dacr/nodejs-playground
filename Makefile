
BN=./node_modules/.bin
DEST=target
OUT=${DEST}/script-compiled.js

compile:
	@mkdir -p ${DEST}
	@${BN}/babel src/main/js --out-file ${OUT}  --source-maps


run: compile
	node ${OUT}

test:
	${BN}/mocha --recursive src

init:
	npm install unit.js
	npm install mocha
	npm install --save-dev babel-cli
	npm install --save-dev babel-preset-es2015
