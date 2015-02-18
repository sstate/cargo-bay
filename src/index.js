'use strict';

var EventEmitter = require('events').EventEmitter;
var merge = require('amp-merge');
var CHANGE_EVENT = 'change';
var _current_cid = 0;

var CargoBay = merge(EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  generateCID: function() {
    return _current_cid++;
  }

});

CargoBay.setMaxListeners(50);

module.exports = CargoBay;