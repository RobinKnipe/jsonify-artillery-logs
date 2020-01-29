'use strict';

const fs = require('fs');
const jsonify = require('..');
const json = require('./fixtures/basic.json');
const log = fs.readFileSync('./test/fixtures/basic-log', { encoding: 'utf8' });
const template = fs.readFileSync('./templates/full-artillery-log', { encoding: 'utf8' });

describe('jsonofy-artillery-logs', () => {
  it('should provide a single function named parseLog', () =>
    expect(jsonify).to.be.an('object').with.property('parseLog').that.is.a('function')
  );

  describe('the parseLog function', () => {
    const parse = jsonify.parseLog;

    it('should take (up to) 2 parameters', () => expect(parse).to.have.lengthOf(2));
    it('should extract plain result log text into a JSON object, using the specified full template', () =>
      expect(parse(log, template)).to.be.an('object').that.deep.equals(json)
    );
    it.skip('should extract plain result log text into a JSON object, using a template with partials', () =>
      expect(parse(log)).to.be.an('object').that.deep.equals(json)
    );
  });
});
