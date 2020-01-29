'use strict';

const fs = require('fs');
const fullTemplate = fs.readFileSync('./templates/full-artillery-log', { encoding: 'utf8' });
const template = fs.readFileSync('./templates/artillery-log', { encoding: 'utf8' });
const report = fs.readFileSync('./templates/partials/report', { encoding: 'utf8' });
const counter = fs.readFileSync('./templates/partials/counter', { encoding: 'utf8' });
const output = fs.readFileSync('./test/fixtures/basic-log', { encoding: 'utf8' });
const data = require('../fixtures/basic.json');
const Mustache = require('mustache');

describe('check', () => {
  before((done) => {
    fs.unlink('./log', () => done());
  });
  it('should create a log from the full template', () =>
    expect(Mustache.render(fullTemplate, data))
      .to.be.a('string')
      .that.equals(output)
  );
  it('should create a log from the template using partials', () =>
    expect(Mustache.render(template, data, { report, counter }))
      .to.be.a('string')
      .that.equals(output)
  );
});
