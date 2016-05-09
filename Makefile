
BN=./node_modules/.bin
DEST=target
OUT=${DEST}/script-compiled.js

compile:
	@mkdir -p ${DEST}
	@${BN}/babel src/main/js --out-file ${OUT}  --source-maps


run: compile
	@node ${OUT}

test:
	@${BN}/mocha --compilers js:babel-core/register --recursive src

deps:
	npm install immutable --save
	npm install winston --save
	npm install npm --save
	
	npm install chai --save-dev
	npm install mocha --save-dev
	npm install babel-core --save-dev 
	npm install babel-cli --save-dev 
	npm install babel-preset-es2015 --save-dev 
	npm install babel-preset-react --save-dev 
	npm install chai-immutable --save-dev
	npm install chai-as-promised --save-dev
	
clean:
	rm -f npm-debug.log*
