// SERVER MODEL

// We want to create a file that has the schema and creates a model that we can then call upon in our controller
var mongoose = require('mongoose');

// create our friendSchema
var ProductSchema = new mongoose.Schema({
	name:String,
	image:String,
	inventory:Number,
	description:String,
	created_at: {type:Date, default: Date.now}
});

// compile a 'Product' model using the ProductSchema as the structure
// (creating a model CREATES the collection in the database (makes the collection plural))
mongoose.model('Product',ProductSchema);