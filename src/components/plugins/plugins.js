// 
// Plugins
// Global methods to use in any mixin or component
// _________________________
//
// 	navigate(route): pushes route to update vue router
// 			only fires if route is different than current route
// 
// 	tab(url): opens url in new tab
// 
// 	copyToClipboard(name, value): Copies value to clipboard, shows toast confirmation
//  
// 	toast(): provides easy this.toast() call to use in any component.
//
//			- function calls showToast() in Toast Component within App.vue, which shows the toast.
//					 Basically just a shortcut for that
// 
// 			- format options: this.toast(title, body, color, icon)
// 				title: Text string for larger text at top
// 				body: Text string for longer toast description
// 				color: primary (default/blank), red, green, yellow
// 				icon: text string of font awesome classes
// 
// 				example: this.toast("Error!", "Something went wrong.", "red", "far fa-siren")
// 
// 	hello(message, icon, color): Shows tiny yellow toast for a brief moment
// 			- optional colors: red, blue, green, invert
// 
export default {

	install(Vue, options){

		console.log("Installing Vue Plugins")

		/////////////////////
		//    Navigate    //
		///////////////////
		// Function to navigate with -> navigate("/route")
		// This lets you use custom elements that are accessible/focusable, rather than router-link
		// then use @click to navigate()
		Vue.prototype.navigate = function(route) {

			// Uncomment if confirmleave is enabled
			// Confirm leave on these pages
			// var confirmPages = ['settings'];

			if(route == this.$route.path){
				return;
			}else{

				// if(confirmPages.includes(this.$route.name)){
					// Show confirmation
					// this.$root.$children[0].$refs.confirmLeaveComponent.confirmLeave(route);
				// }else{
					// Else no confirmation needed
					this.$router.push(route);
					document.documentElement.scrollTop = 0;
				// }
			}
		}

		//////////////////////////////
		//// Open url in new tab ////
		////////////////////////////
		Vue.prototype.tab = function(url) {
			window.open(url, '_blank');
		}

		/////////////////////////////////////////
		//// Copy value to device clipboard ////
		///////////////////////////////////////
		Vue.prototype.copyToClipboard = function(name, value) {
			// Create input element, append text, copy text, remove element
			var inp =document.createElement('input');
			document.body.appendChild(inp)
			inp.value = value;
			inp.select();
			document.execCommand('copy',false);
			inp.remove();
			// Toast
			this.toast("Copied!", name + " has been copied to your clipboard. ", "", "far fa-copy");
		}

		////////////////////////
		//// Toast & Hello ////
		//////////////////////
		Vue.prototype.toast = function(title, body, color, icon) {
			this.$root.$children[0].$refs.toastComponent.showToast(title, body, color, icon);
		}
		Vue.prototype.hello = function(message, icon, color) {
			this.$root.$children[0].$refs.alertComponent.showAlert(message, icon, color);
		}
		
	
	}
  
 }