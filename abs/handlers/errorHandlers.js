// Catch Error Handler
// used for async/await to catch errors instead of using try/catch in each controller.
// wrap the function with catchErrors() catch errors and pass it along to the express middleware with next()

exports.catchErrors = (fn) => {
	return function(req, res, next) {
		return fn(req, res, next).catch(next);
	};
};