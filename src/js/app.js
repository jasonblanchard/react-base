var adder = require('./adder.js');
var Parent = require('./parent.jsx');

console.log("some js");

console.log(adder.add(1,2));

React.render(<Parent working='yes'/>, document.getElementById('app'));
