var JadeClient = {};
JadeClient["hello_world"] = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<h1>Hello World</h1>");;return buf.join("");
};
JadeClient["bonjour_le_monde"] = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<h1>Bonjour Le Monde</h1>");;return buf.join("");
};
JadeClient["hola_mundo"] = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<h1>Hola Mundo</h1>");;return buf.join("");
};
