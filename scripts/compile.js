#!/usr/bin/env node
let fs = require('fs')
let clip = require('copy-paste')
let b = require('browserify')()
b.add('dist/src/userscript.js')
b.bundle((err, src) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  let code = `// ==UserScript==
// @name         top-n-sentences
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  To make an article shorter for quick skim
// @author       Beeno Tung
// @match        https://*
// @match        http://*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    ${src.toString()}
})();`
  fs.writeFileSync('dist/client.js', code)
  console.log('saved to dist/client.js')
  clip.copy(code, err => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    console.log('copied to clipboard')
    process.exit(0)
  })
})
