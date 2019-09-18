const sinon = require('sinon')
const nock = require('nock');
var assert = require('assert');

const testMessage = {'chat': {'id': 505838126}};
const Publisher = require('./classes/Publisher.js');

beforeEach(function () {
    this.sandbox = sinon.sandbox.create();
})

afterEach(function () {
    this.sandbox.restore()
})


describe('Aron Bot Response', function() {
    const publisher = new Publisher();
    it('Publishing when the message is empty', function () {
        publisher.publish(testMessage, '')
            .then(response => {
                assert.equal(200, response.statusCode);
                assert.equal('The message is empty so the api was not called', response.message)
            });
     });
    it('Publishing message', function() {
        nock('https://api.telegram.org')
            .post('/bot519985598:AAEGDJvreGjvtIKrI3i9yb6Sjvn3-KdfQak/sendMessage')
            .reply(200, '');
        publisher.publish(testMessage, 'Testing code.')
            .then(response => assert.equal(200, response.statusCode));
    });
    it('Error publishing message', function() {
        nock('https://api.telegram.org')
            .post('/bot519985598:AAEGDJvreGjvtIKrI3i9yb6Sjvn3-KdfQak/sendMessage')
            .reply(500, '');
        publisher.publish(testMessage, 'Testing code.')
            .then(response => assert.equal(500, response.statusCode));
    });
});