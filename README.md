# cargo-bay

![cargo bay](http://i.imgur.com/sU7JTWh.jpg)

A base store for flux applications

## Install

`npm install cargo-bay`

## Usage

This is the base store for the storages in your flux application. It will provide the base events you will merge into your store, so you can have a standard interface to listening to those storage updates. This will let you know that the state in your store has changed, and you can call render (or whatever you want) in your view.

```
#/stores/HelloWorldStore.js

'use strict';

var LCARS = require('lcars');
var CargoBay = require('cargo-bay');
var HelloWorldConstants = require('./../constants/HelloWorldConstants');
var merge = require('amp-merge');

var HelloWorldData = {
  _data: {
    name: "Bob",
    age: undefined
  },
  clonedData: function() {
    return JSON.parse(JSON.stringify(this._data));
  }
};

var _setAge = function(age){
  var data = HelloWorldData.clonedData();
  data.age = age;
  HelloWorldData._data = data;
  return HelloWorldData.clonedData();
};

var HelloWorldStore =  merge(CargoBay, {
  getDataFromStore: function(){
    return HelloWorldData.clonedData();
  }
});

HelloWorldStore.dispatchToken = LCARS.register(function(action){
  switch (action.type){
    case HelloWorldConstants.DemoActions.SET_AGE:
      _setAge(action.data.age);
      HelloWorldStore.emitChange();
      break;
  }
});

module.exports = HelloWorldStore;
```

In your component

```
var HelloWorldStore = require('./../stores/HelloWorldStore')

componentDidMount: function() {
  HelloWorldStore.addChangeListener(function(){
    var state = this.getStateFromStores();
    this.setState(state);
  }.bind(this));
},
```

You can see an example of this in [freighter](https://github.com/sstate/freighter/tree/master/examples).

#### Run tests

```
npm install

npm test
```