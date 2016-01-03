'use strict';

var moment = require('moment');

module.exports = function(app){
	app.get('/:query', function(request, response){
		var date = request.params.query;
		var unix = null;
		var natural = null;
		// check if query is unix time
		if (+date >= 0){
			unix = +date;
			natural = unixToNat(unix);
		}
		// check if query is nat time
		if (isNaN(+date) && moment(date, "MMMM D, YYYY").isValid()){
			unix = natToUnix(date);
            		natural = unixToNat(unix);
		}
		var dateObj = {"unix": unix, "natural": natural};
		//output 
		response.send(JSON.stringify(dateObj));
	
	})
	function natToUnix(date) {
        // Conver from natural date to unix timestamp
        	return moment(date, "MMMM D, YYYY").format("X");
    	}
    
   	 function unixToNat(unix) {
        // Convert unix timestamp to natural date
        	return moment.unix(unix).format("MMMM D, YYYY");
    	}

}

