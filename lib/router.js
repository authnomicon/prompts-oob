var flatten = require('array-flatten')
  , slice = Array.prototype.slice;

function Router() {
  this._prompts = {};
}

Router.prototype.use = function(name, handler) {
  this._prompts[name] = flatten(slice.call(arguments, 1));;
}

Router.prototype.dispatch = function(name, req, next) {
  var stack = this._prompts[name];
  // TODO: likely want to next with req here
  if (!stack) { return next(new Error("Cannot find prompt '" + name + "'")); }
  
  dispatch(stack)(null, req, next);
}

function dispatch(stack) {
  return function(err, req, next) {
    var i = 0;

    function callbacks(err) {
      var fn = stack[i++];
      try {
        if (err && fn) {
          if (fn.length < 3) return callbacks(err);
          fn(err, req, callbacks);
        } else if (fn) {
          if (fn.length < 3) return fn(req, callbacks);
          callbacks();
        } else {
          next(err);
        }
      } catch (err) {
        callbacks(err);
      }
    }
    callbacks(err);
  }
};


module.exports = Router;
