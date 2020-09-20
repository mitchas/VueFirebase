// 	Filters
// 	_________________________
// 
// 	Various filters to use throughout the project
// 
// 		titleCase(string): 
// 			Converts string to Title Case
// 			Also replaces _underscores_ with spaces
// 
// 				ex: titleCase(king_field) = King Field
// 		 
// 		numberFormat(value, type): 
// 			Converts numbers to various formats
//				type: comma (10,000), decimal (2 places), dollar (with decimal), percent
//
// 				ex: titleCase("10000", "comma") = 10,000
// 

import Vue from 'vue'
var numeral = require("numeral");

//////////////////
//  Title case //
////////////////
// Capitalizes each word of string
// Also replaces _ with space
Vue.filter('titleCase', function (value) {

	// If value exists
	if(value){
		var splitStr = value.replace(/_/g, ' ');

		splitStr = splitStr.toLowerCase().split(' ');
		// Capitalize Every Letter
		for (var i = 0; i < splitStr.length; i++) {
			splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
		}
		// Return the joined string
		return splitStr.join(' '); 

	}else{
		// No value received, no value returned
		return "";
	}
	
})

/////////////////////
//  Number Format //
///////////////////
// Formats numbers to commas, 
Vue.filter("numberFormat", function (value, type) {
	if(type == "comma"){
		return numeral(value).format("0,0"); 
	}else if(type == "decimal"){
		return numeral(value).format("0,0.00"); 
	}else if(type == "dollar"){
		return numeral(value).format("$ 0,0[.]00"); 
	}else if(type == "percent"){
		return numeral(value).format("0.000 %"); 
	}else if(type == "short"){ // ie 1,000 = 1k
		return numeral(value).format("0a"); 
	}else{
		return numeral(value).format("0,0"); 
	}
});