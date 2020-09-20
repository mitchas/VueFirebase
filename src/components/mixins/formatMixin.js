// Format Mixin
// Various functions to format different data content 
// _________________________
//
// 	getAddressString(): reads a full address object and turns it into a formatted string.
// 
// 	getCategoryIcon(): Matches business categories with their fontawesome icon class string.
// 

export default {
	methods: {
		/////////////////////////
		//    Address String    //
		///////////////////////

		// Take address object and create string
		getAddressString: function(addressObject) {
			var addyString = "";
			// Street Number
			if(addressObject.street_number){
				addyString = addressObject.street_number;
			}
			// Route
			if(addressObject.route){addyString = addyString + " " + addressObject.route + ", ";}
			// Neighborhood
			if(addressObject.neighborhood){addyString = addyString + addressObject.neighborhood + ", ";}
			// Locality
			if(addressObject.locality){addyString = addyString + addressObject.locality + ", ";}
			// County
			if(addressObject.county){addyString = addyString + addressObject.county + ", ";}
			// State
			if(addressObject.state){addyString = addyString + addressObject.state;}
			// Zip
			if(addressObject.postal_code){addyString = addyString + ", " + addressObject.postal_code;}

			return addyString;
		},


		///////////////////////////////////
		//    Business Category Icon    //
		/////////////////////////////////
		getCategoryIcon: function(category){

			var categoryIcons = {
				// General
				'food_drink': 'far fa-utensils',
				'shopping': 'far fa-shopping-bag',
				// Food
				'bakery': 'far fa-croissant',
				'bar': 'far fa-glass-whiskey-rocks',
				'coffee': 'far fa-coffee-togo',
				'diner': 'far fa-egg-fried',
				'fast_foot': 'far fa-burger-soda',
				'food_truck': 'far fa-truck',
				'ice_cream': 'far fa-ice-cream',
				'mexican': 'far fa-taco',
				'pizza': 'far fa-pizza-slice',
				'sandwiches': 'far fa-sandwich',
				'seafood': 'far fa-fish-cooked',
				// Shopping
				'arts': 'far fa-paint-brush',
				'baby': 'far fa-baby',
				'bookstore': 'far fa-book-spells',
				'clothing': 'far fa-fa-tshirt',
				'electronics': 'far fa-tv-retro',
				'entertainment': 'far fa-gamepad',
				'gifts': 'far fa-gift',
				'grocery': 'far fa-shopping-cart',
				'health': 'far fa-heartbeat',
				'home': 'far fa-home-lg',
				'pets': 'far fa-paw-alt',
				'sports': 'far fa-whistle',
				'toys': 'far fa-user-robot',
				// Services
				'education': 'far fa-backpack',
				'tech': 'far fa-phone-laptop',
				'financial': 'far fa-money-bill-wave',
				'religion': 'far fa-praying-hands',
				'travel': 'far fa-plane-departure',
				'vehicle': 'far fa-car-mechanic',
			}

			return categoryIcons[category];
		}

	}
};
