import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import '../imports/apis/names.js';
import './main.html';

Template.namesList.onCreated(function namesListOnCreated() {
	Meteor.subscribe('names');
});

Template.namesList.helpers({
	names() {
		return Names.find({});
	}
});

Template.namesForm.events({
	'submit .new-name': (e) => {

		e.preventDefault();

		let name = e.target.name.value;

		Meteor.call('names.insert', name)

		e.target.name.value = '';
	}
});

