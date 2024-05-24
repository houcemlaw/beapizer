const mongoose = require('mongoose')


const Schema = mongoose.Schema

const schema = new Schema(
  {
      taskname: {type: String, required: [true, 'Area Name is required'] },
      task_id: {type: Number, unique  : true},
      taskitems: [{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'taskitem'
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

const ToDoTask = mongoose.model('todotask', schema, 'todotasks');

module.exports = ToDoTask


