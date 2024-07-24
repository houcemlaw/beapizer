const mongoose = require('mongoose')


const Schema = mongoose.Schema

const schema = new Schema(
  {
      customerID: {type: Number, unique  : true},
      name: {type: String, required: [true, 'Customer Name is required'] },
      customerType: {
                      type: String,
                      enum : ['Business','Individual'],
                      default: 'Individual'
                  },
      accounts: [{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'account'
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

const Customer = mongoose.model('customer', schema, 'customers');

module.exports = Customer


