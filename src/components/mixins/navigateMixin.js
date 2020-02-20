// Navigate Mixin

export default {
	methods: {
		///////////////////////
		//    Navigation    //
		/////////////////////

		// Function to programatically naviate with navigate("/route")
		// This lets you use custom elements that are accessible/focusable
		// then use @click to navigate()
		navigate: function(route) {
			this.$router.push(route);
			document.documentElement.scrollTop = 0;
		}
	}
};
