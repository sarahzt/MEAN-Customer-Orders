// SERVER MODEL

// We want to create a file that has the schema for our friends and creates a model that we can then call upon in our controller
var mongoose = require('mongoose');

// create our friendSchema
var CustomerSchema = new mongoose.Schema({
	name:{type:String,required: true},
	created_at: {type:Date, default: Date.now}
});

// compile a 'Customer' model using the CustomerSchema as the structure
// (creating a model CREATES the collection in the database (makes the collection plural))
mongoose.model('Customer',CustomerSchema);