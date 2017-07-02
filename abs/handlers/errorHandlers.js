// Catch Error Handler
// used for async/await to catch errors instead of using try/catch in each controller.
// wrap the function with catchErrors() catch errors and pass it along to the express middleware with next()
exports.catchErrors = (fn) => {
	// console.log(next);
	return function(req, res, next) {
		// console.log(res);
		// console.log(req.asyncValidationErrors);
		return fn(req, res, next).catch(next);
	};
};

exports.catchDuplicate = (fn) => {
	return function(req, res, next) {
		var error;
		error = fn(req, res, next).catch();
		console.log(error);
		next();
	}
}


// Not Found Error Handler
// used for if a route is not found.  Mark it as 404 and pass it to the next error handler to display
exports.notFound = (req, res, next) => {
	const err = new Error("Not Found");
	err.status = 404;
	next(err);
};