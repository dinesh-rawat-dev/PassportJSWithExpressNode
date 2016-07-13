/*
@ Database connection
*/

module.exports = function(mongoose) {
	mongoose.connect("mongodb://127.0.0.1:27017/myappdatabase", function(err) {
		if ( err ) {
			console.log("Database error")
		}
		console.log("Connected...")
	});
};