import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

const PLACES = [
	{
		lon: -80,
		lat: 45,
	},
	{
		lon: -71,
		lat: 35,
	},
	{
		lon: 0,
		lat: 0
	}
];

if(Meteor.isClient) {

	Meteor.setInterval(function() {
	    navigator.geolocation.getCurrentPosition(function(position) {
	        Session.set('lon', position.coords.longitude);
	        Session.set('lat', position.coords.latitude);
	    });
	}, 1000);

	Template.location.helpers({
		lon: function() {
			return Session.get('lon');
		},
		lat: function() {
			return Session.get('lat');
		}
	});

	Template.waitingLines.helpers({
		places: function() {
			PLACES.map(function(place) {
				if(Math.abs(place.lon - Session.get('lon')) < 10 && Math.abs(place.lat - Session.get('lat')) < 10) {
					return place;
				}
			})
		}
	})

}

//