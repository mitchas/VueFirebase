<template>
	<div class="login">
		<h1>New Event Form</h1>
		<form class="form-flex">
			<div class="form-item full">
				<label for="eventTitle">Event Title</label>
				<input type="text" v-model="eventTitle" id="eventTitle" placeholder="Statewide Hotdish Cookoff" />
			</div>
			<div class="form-item half">
				<label for="eventStart">Start time</label>
				<input type="text" v-model="eventStart" id="eventStart" placeholder="July 31" />
			</div>
			<div class="form-item half">
				<label for="eventEnd">End time</label>
				<input type="text" v-model="eventEnd" id="eventEnd" placeholder="July 31 2015" />
			</div>
			<div class="form-item full">
				<label for="eventLocation">Location</label>
				<input type="text" v-model="eventLocation" id="eventLocation" placeholder="University of Minnesota" />
			</div>
			<div class="form-item full">
				<label for="eventFullDescription">Description</label>
				<textarea v-model="eventFullDescription" id="eventFullDescription" placeholder="This is a dope event"></textarea>
			</div>
			<div class="form-item full">
				<button type="button" @click="saveEvent">Save Event</button>
			</div>
		</form>
		<!-- <p>{{ events }}</p> -->

	</div>
</template>

<script>
import { db } from "@/store/firebase";

export default {
	name: 'newEvent',
	data() {
		return {
			eventTitle: '',
			eventStart: '',
			eventEnd: '',
			eventLocation: '',
			eventFullDescription: ''
		}
	},
	firestore() {
		return {
			// events: db.collection('events'),
		}
	},
	methods: {
		saveEvent: function () {
			db.collection('events').add({
				title: this.eventTitle,
				start: this.eventStart,
				end: this.eventEnd,
				location: this.eventLocation,
				long_description: this.eventFullDescription,
				created: new Date(),
				owner: uid,
				saves: 0
			}).then(() => {
				console.log('Successfully updated the record')
			})
			.catch(error => {
				console.error('There was an error editing the record: ' + error)
			});
		},
	}
}
</script>

// LESS
<style lang="less">
	.form-flex{
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
		max-width: 800px;
		margin: 0 auto;

		.form-item{

			label{
				display: block;
				width: 100%;
				text-align: left;
			}

			input{
				width: 100%;
			}

			textarea{
				width: 100%;
				min-height: 220px;
			}

			&.full{
				width: 100%;
			}
			&.half{
				width: 48%;
			}
		}
	}


</style>

