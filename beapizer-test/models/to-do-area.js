const mongoose = require('mongoose')


const Schema = mongoose.Schema

const schema = new Schema(
  {
      areaname: {type: String, required: [true, 'Area Name is required'] },
      area_id: {type: Number, unique  : true},
      todotasks: [{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'todotask'
                 }]
  }, 
  {
    timestamps: true,
    toObject: {
      virtuals: true,
      transform: (doc, returnedValue) => {
        delete returnedValue.id;
        delete returnedValue.__v;
      }
    },
    toJSON: {
      virtuals: true,
      getters: true,
      transform: (doc, returnedValue) => { 
        delete returnedValue.id;
        delete returnedValue.__v;
      }
    }
  }
)

const ToDoArea = mongoose.model('todoarea', schema, 'todoareas');

module.exports = ToDoArea


