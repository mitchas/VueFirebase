<!-- 
// Authentication Page Component
// _________________________
// 
// 	Full page component for authentication pages - loads content in centered form
// 
// 		Accepts props:  
// 			- header: form header
// 			- disabled: condition for which submit form will be disabled
// 			- formBottom: array of text, link path, and link text to display at bottom
// 			- submitText: text for submit button
// 			- formLoading: condition to disable / show loading submit button
// 
// 		Emits:
// 			- "formSubmitted" - when form is submitted
// 
-->

<template>
	<div class="auth-page ptop-sm">
		<!-- Header -->
		<div class="auth-page-header">
			<h2>{{header}}</h2>
		</div>
		<form class="auth-form-body" @submit.prevent="$emit('formSubmitted');">
			<!-- Form contents from parent -->
			<slot></slot>
			<!-- Submit button -->
			<button class="button big mtop-xs auth-button" type="submit" :disabled="disabled || formLoading" v-bind:aria-label="submitText">
				<span v-if="formLoading">Loading</span>
				<span v-else>{{submitText}}</span>
				<i v-bind:class="{ 'fad fa-chevron-circle-right': !formLoading, 'far fa-spinner-third fa-spin': formLoading }"></i>
			</button>

			<!-- Form bottom text -->
			<div class="auth-bottom" v-if="formBottom.length == 3">
				<p>
					{{formBottom[0]}}
					<router-link v-bind:to="formBottom[1]">{{formBottom[2]}}</router-link>
				</p>
			</div>
		</form>

	</div>
</template>

<script>

export default {
	name: "AuthenticationPage",
	mixins: [
	],
	components: {
	},
	props: [
		'header',
		'disabled',
		'formBottom',
		'submitText',
		'formLoading'
	],
	data() {
		return {
		};
	},
	created() {

	},
	mounted(){

	},
	methods: {
	}	
}	

</script>

<style lang="less">
	@import '~@/styles/variables.less';

	.auth-page{
		display: block;
		width: 90%;
		max-width: 75%;
		margin: 0 auto;
		padding-bottom: 40px;
		display: flex;
		min-height: 60vh;
		flex-direction: column;
		justify-content: center;

		// Set max width if larger than mobile
		@media (min-width: @screenSM) {
			max-width: 300px;
		}
		// Set smaller max width on larger screens
		// also move over -100px for sidebar - to center
		@media (min-width: @screenLG) {
			max-width: 300px;
			position: relative;
			left: -100px;
		}

		// Auth page header
		.auth-page-header{
			box-sizing: border-box;
			padding: 20px 0 10px 0;
			border-bottom: 1px solid var(--border);
			margin-bottom: 20px;

			p{
				margin: 0;
				padding: 10px 0 0 0;
			}
		}

		// Body of auth form
		.auth-form-body{
			display: flex;
			flex-direction: column;

			// Field Wrappers
			.auth-field{

				// Input labels
				label{
					display: block;
					position: relative;
					font-size: 14px;

					// Hint
					small{
						font-size: 11.5px;
						opacity: 0.5;
					}
				}

				// Inputs
				input{
					width: 100%;
					margin-bottom: 10px;
					&:focus{
						outline: none;
					}
				}
			}

			

			// Main action button
			.auth-button{
				*{transition:var(--transition);}
				span{
					float: left;
				}
				// Icon
				i{
					position: relative;
					top: 2px;
					float: right;
					--fa-primary-color: var(--primary); 
					--fa-secondary-color: var(--white);
					--fa-secondary-opacity: 1;
				}

				&:disabled{
					i{
						--fa-primary-color: var(--textLightest); 
						--fa-secondary-color: var(--grey);
						--fa-secondary-opacity: 1;
					}
				}
			}

			// Below action button
			// "Already have an account", etc
			.auth-bottom{
				display: block;
				margin-top: 15px;
				text-align: center;
				font-size: 13px;

				p{
					margin: 0 auto;
					padding: 0;
					letter-spacing: 0.25px;
					width: 100%;
					font-size: inherit;
				}

				a{
					text-decoration: none;
					transition: var(--transition);
					font-weight: 600;
					letter-spacing: 0.25px;

					&:hover{
						text-decoration: underline;
						transition: var(--transition);
					}
				}
			}
		}
	}


	// Agreement div 
	// Checkbox with longer label on side
	.agreement{
		display: flex;
		box-sizing: border-box;
		margin: 8px 0;
		height: 28px;

		// Increase size on small screens
		@media (max-width: @screenMD) {
			height: 34px;
		}

		label{
			flex-grow: 3;
			font-size: 12px;
			box-sizing: border-box;
			line-height: 14px;
			vertical-align: middle;
			letter-spacing: 0.3px;
			padding: 3px 0 0 10px !important;

			// Fix padding on mobile
			@media (max-width: @screenMD) {
				font-size: 14px;
			}

			// Links inside
			a{
				font-weight: 600;
			}
		}
	}


	// Help link
	// IE forgot password
	// Floats right of label
	.help-link{
		float: right;
		padding: 0;
		margin: 0;
		border: none;
		font-size: 12px;
		font-weight: 500;
		color: var(--text);
		font-family: var(--systemFont);
		opacity: 0.35;
		top: 1px;
		letter-spacing: 0.25px;
		position: relative;
		transition: var(--transition);

		&:hover{
			opacity: 1;
			transition: var(--transition);
		}
	}
</style>