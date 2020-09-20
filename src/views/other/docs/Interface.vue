<!-- 
// Interface
// _________________________
// 
// 		A static page to preview UI and interface elements
// 
-->

<template>
	<div class="page">

		<!-- 
			////////////////////
			Typography
			////////////////////
		-->
		<!-- h1 -->
		<h1>Heading one.</h1>
		<h1>This is a longer heading going to multiple lines.</h1>
		<!-- p big -->
		<p class="big">
			Lorem ipsum dolor sit amet, <b>large paragraph</b> consectetur <a href="#">adipiscing elit</a>, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		</p>
		<!-- h2 -->
		<h2>Heading two.</h2>
		<h2>This is a longer heading going to multiple lines hopefully this is enough.</h2>
		<!-- p regular -->
		<p>
			Lorem ipsum dolor sit amet, <b>regular paragraph</b> consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		</p>
		<p>
			Lorem ipsum dolor sit amet, <b>regular paragraph</b> consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		</p>
		<!-- h3 -->
		<h3>Heading three.</h3>
		<h3>This is an even longer heading going to multiple lines but the text is smaller so I have to make up a lot more.</h3>
		<!-- p narrow -->
		<p class="small">
			Lorem ipsum dolor sit amet, <b>small paragraph</b> consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		</p>
		<!-- h4 -->
		<h4>Heading four.</h4>
		<h4>This is an even longer heading going to multiple lines but the text is smaller so I have to make up a lot more.</h4>
		<p>
			Lorem ipsum dolor sit amet, <b>regular paragraph</b> consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		</p>
		<!-- h5 -->
		<h5>Heading 5.</h5>
		<h5>This is an even longer heading going to multiple lines but the text is smaller so I have to make up a lot more.</h5>
		<p>
			Lorem ipsum dolor sit amet, <b>regular paragraph</b> consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		</p>
		<!-- h6 -->
		<h6>Heading six.</h6>
		<h6>This is an even longer heading going to multiple lines but the text is smaller so I have to make up a lot more.</h6>
		<p class="mbottom-xl">
			Lorem ipsum dolor sit amet, <b>regular paragraph</b> consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		</p>


		<!-- 
			////////////////////////
			//   Forms   //
			//////////////////////
		 -->
		 <!-- Text Input -->
		<div class="field mbottom-sm">
			<label>Form Label</label>
			<div class="field-body">
				<input type="text"/>
				<div class="character-count">15/150</div>
			</div>
		</div>
		<!-- Textarea -->
		<div class="field mbottom-sm">
			<label>Textarea</label>
			<div class="field-body">
				<textarea placeholder="Hey what's up hello"></textarea>
				<div class="character-count">15/1250</div>
			</div>
		</div>
		<!-- Buttons -->
		<div class="field mbottom-sm">
			<label>Buttons</label>
			<div class="field-body">
				<!-- Button -->
				<button class="button mright-sm mbottom-sm">
					<i class="far fa-hand-peace"></i>
					<span>Default</span>
				</button>
				<!-- Red Button -->
				<button class="button red mright-sm mbottom-sm">
					<i class="far fa-syringe"></i>
					<span>Red</span>
				</button>
				<!-- Yellow Button -->
				<button class="button yellow mright-sm mbottom-sm">
					<i class="far fa-sun"></i>
					<span>Yellow</span>
				</button>
				<!-- Green Button -->
				<button class="button green mright-sm mbottom-sm">
					<i class="far fa-badge-dollar"></i>
					<span>Green</span>
				</button>
				<!-- Grey Button -->
				<button class="button grey mright-sm mbottom-sm">
					<i class="far fa-sad-tear"></i>
					<span>Grey</span>
				</button>
				<!-- Big Button -->
				<button class="button big mright-sm mbottom-sm">
					<i class="far fa-bomb"></i>
					<span>Large</span>
				</button>
				<!-- Small Button -->
				<button class="button small mright-sm mbottom-sm">
					<i class="far fa-compress-arrows-alt"></i>
					<span>Small</span>
				</button>
				<!-- Small Button -->
				<button class="button small red mright-sm mbottom-sm">
					<i class="far fa-baby"></i>
					<span>Another Small</span>
				</button>
				<!-- Disabled Button -->
				<button class="button mright-sm mbottom-sm" disabled>
					<i class="far fa-times-circle"></i>
					<span>Disabled</span>
				</button>
			</div>
		</div>
		<!-- Checkboxes -->
		<div class="field mbottom-sm">
			<label>Checkbox</label>
			<div class="field-body">
				<input type="checkbox" class="check"/>
			</div>
		</div>
		<!-- Toggle -->
		<div class="field mbottom-sm">
			<label>Toggle</label>
			<div class="field-body">
				<input type="checkbox" class="toggle"/>
			</div>
		</div>
		<!-- Card -->
		<div class="card mbottom-sm">
			<label>This is a card</label>
			<p>
				Lorem ipsum dolor sit amet, <b>large paragraph</b> consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.
			</p>
		</div>
		<!-- Blue Callout -->
		<Callout
			icon="far fa-box-heart"
			class="mbottom-sm"
			color=""
			size="narrow">
			<span>Blue Callout.</span>
		</Callout>
		<!-- Red Callout -->
		<Callout
			icon="far fa-box-heart"
			class="mbottom-sm"
			color="red"
			size="narrow">
			<span>Red Callout.</span>
		</Callout>
		<!-- Yellow Callout -->
		<Callout
			icon="far fa-box-heart"
			class="mbottom-sm"
			color="yellow"
			size="narrow">
			<span>Yellow Callout.</span>
		</Callout>
		<!-- Green Callout -->
		<Callout
			icon="far fa-box-heart"
			class="mbottom-sm"
			color="green"
			size="narrow">
			<span>Green Callout.</span>
		</Callout>
		<!-- Purple Callout -->
		<Callout
			icon="far fa-box-heart"
			class="mbottom-sm"
			color="purple"
			size="narrow">
			<span>Purple Callout.</span>
		</Callout>


		<div class="field mbottom-sm">
			<label>Badges</label>
			<!-- Blue -->
			<div class="badge blue mbottom-xs mright-xs">
				<i class="far fa-tint"></i>
				<span>Blue Badge</span>
			</div>
			<!-- Red -->
			<div class="badge red mbottom-xs mright-xs">
				<i class="far fa-fill"></i>
				<span>Red Badge</span>
			</div>
			<!-- Green -->
			<div class="badge green mbottom-xs mright-xs">
				<i class="far fa-palette"></i>
				<span>Green Badge</span>
			</div>
			<!-- Yellow -->
			<div class="badge yellow mbottom-xs mright-xs">
				<i class="far fa-swatchbook"></i>
				<span>Yellow Badge</span>
			</div>
			<!-- Black -->
			<div class="badge black mbottom-xs mright-xs">
				<i class="far fa-map-marker-alt"></i>
				<span>Black Badge</span>
			</div>
			<!-- Grey -->
			<div class="badge grey mbottom-xs mright-xs">
				<i class="far fa-map-marker-alt"></i>
				<span>Grey Badge</span>
			</div>
		</div>

		<div class="field mbottom-sm">
			<label>Input Group</label>

			<!-- Input group -->
			<div class="input-group">
				<span class="input-group-label">ABCDEFG.com/co/</span>
				<input type="text"/>
			</div>
		</div>


	</div>
</template>

<script>
// Components
import Callout from "@/components/ui/Callout";

export default {
  	name: "PrivacyPolicy",
  	components: {
		  Callout
	},
	mixins: [
	],
	created: function () {
	},
	methods: {
	}
}
</script>

<style lang="less">
	// @import '~@/styles/variables.less';
</style>