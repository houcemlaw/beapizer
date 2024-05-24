const mongoose = require('mongoose')


const Schema = mongoose.Schema

const schema = new Schema(
  {
      itemName: {type: String, required: [true, 'Task Item Name is required'] },
      item_id: {type: Number, unique  : true},
      task_item_description: {type: String},
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

const TaskItem = mongoose.model('taskitem', schema, 'taskitems');

module.exports = TaskItem


