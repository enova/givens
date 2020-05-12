#!/usr/bin/env node 

const fs = require('fs');
const exec = require('child_process').exec;

const async = require('async'); // npm install async 

const testFolder = './test/'; // add your scripts to folder named scripts

const tests = fs.readdirSync(testFolder); // reading tests from folders
const funcs = tests.map(function(file) {
  return exec.bind(null, `node ${testFolder}${file}`); // execute node command
});

function getResults(err, data) {
  if (err) {
    throw err;
  }
  const results = data.map(function(lines){
    return lines.join('\n') // joining each script lines
  });
  console.log(results.join(''));
}

// to run your scipts in parallel use
async.parallel(funcs, getResults);