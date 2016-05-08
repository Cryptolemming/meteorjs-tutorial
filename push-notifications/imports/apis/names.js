import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

Names = new Mongo.Collection('names');

if (Meteor.isServer) {
	Meteor.publish('names', function namesPublication() {
		return Names.find({});
	});
}

Meteor.methods({
	'names.insert'(name) {
		check(name, String);

		Names.insert({
			name,
		});
	},
});