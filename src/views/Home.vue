<!--
// 
// Home.vue
// _________________________
//	Home page view
//
// -->

<template>
	<div class="page full-width" id="homePage">

		<div class="padded">
			<Callout
				icon="far fa-box-heart"
				class="mbottom-sm"
				color=""
				size="">
				<span>Welcome to <b>ABCDEFG</b>. This is a template built on Vue and Firebase, from <a @click="tab('https://github.com/mitchas/vuefirebase')">github.com/mitchas/vuefirebase.</a></span>
			</Callout>
		</div>
		<div class="max-width-large padded">

			<h1>App Loaded</h1>

		</div>


	</div>
</template>

<script>
require('vue-moment');
import { db } from "@/store/firebase";
// Components
import Callout from "@/components/ui/Callout";
// Mixins
// Keyboard shortcuts mixin - esc closes modal
import shortcut from "@/components/mixins/keyboardShortcutMixin.js";


export default {
	name: "home",

	components: {
		Callout,
	},

	mixins: [
		// Keyboard shortcut example
		shortcut('escape', function() {
			console.log("ESCAPE AH")
		}),
	],

	data() {
		return {
			today: new Date(),
		};
	},

	mounted() {
		
	},

	computed: {
		isSignedIn () {
			return store.state.isSignedIn // get state
		}
	},
	
	methods: {
	}
};

</script>


<style lang="less">

	@import '~@/styles/variables.less';

</style>