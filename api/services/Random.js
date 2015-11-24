exports.digit = function() {
	var number="";
	for(var i=0; i<6; i++){
		number=number+Math.floor((Math.random() * 9) + 1);
	}
    return number;
};