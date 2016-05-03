
BN=./node_modules/.bin
DEST=target
OUT=${DEST}/script-compiled.js

compile:
	@mkdir -p ${DEST}
	@${BN}/babel src/main/js --out-file ${OUT}  --source-maps


run: compile
	node ${OUT}

test:
	${BN}/mocha --compilers js:babel-core/register --recursive src

deps:
	npm install chai --save
	npm install mocha --save
	npm install babel-core --save-dev 
	npm install babel-cli --save-dev 
	npm install babel-preset-es2015 --save-dev 
	npm install babel-preset-react --save-dev 
