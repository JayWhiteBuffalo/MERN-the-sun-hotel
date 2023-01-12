// Bed model is not currently being used, no need to import it or reference it 
//import dependencies
const { Schema, model } = require('mongoose');

//create room schema 
const roomSchema = new Schema(
  {
    roomType: {
      type: String
    },
    price: {
      type: Number
    },
    view: {
      type: String
    },
    bed: {
      type: String
    },
    roomCount: {
      type: Number
    }
  }
);

//create room model
const Room = model('Room', roomSchema);

//export room model
module.exports = Room;