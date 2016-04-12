import { Meteor } from 'meteor/meteor';

if (Meteor.isServer) {
	Meteor.publish('places', inRange(lon, lat) => {
		return Places.find(
			{
				loc: {
					$geoWithin: {
						$center: [
							[
								lon,
								lat,
								radius
							]
						]
					}
				}
			}
		)
	})
};

