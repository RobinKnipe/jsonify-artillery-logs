'use strict';

const fs = require('fs');
const logTemplate = fs.readFileSync('./templates/artillery-log', { encoding: 'utf8' });
const report = fs.readFileSync('./templates/partials/report', { encoding: 'utf8' });
const counter = fs.readFileSync('./templates/partials/counter', { encoding: 'utf8' });
const reverseMustache = require('reverse-mustache');

module.exports = {
  parseLog: (logText, template) =>
    reverseMustache({
      template: template || logTemplate,
      content: logText,
      partials: {
        report,
        counter
      }
    })
};
