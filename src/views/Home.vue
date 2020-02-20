<template>
	<div class="page">

		<h1>Home</h1>

		<p>
			This is the home page.
		</p>

	</div>
</template>

<script>
// @ is an alias to /src
import { db } from "@/store/firebase";
import toastMixin from "@/components/mixins/ui/toastMixin.js";
import metaMixin from "@/components/mixins/metaMixin.js";

export default {
	name: "home",

	components: {
	},

	mixins: [
		toastMixin,
		metaMixin
	],

	data() {
		return {
		};
	},

	mounted() {
		this.updateMeta("Home", "This is the home page description.")
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