// SERVER MODEL

// We want to create a file that has the schema for our friends and creates a model that we can then call upon in our controller
var mongoose = require('mongoose');

// create our friendSchema
var OrderSchema = new mongoose.Schema({
	name:String,
	product:String,
	quantity:Number,
	created_at: {type:Date, default: Date.now}
});

// compile a 'Order' model using the OrderSchema as the structure
// (creating a model CREATES the collection in the database (makes the collection plural))
mongoose.model('Order',OrderSchema);