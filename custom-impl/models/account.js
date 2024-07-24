const mongoose = require('mongoose')


const Schema = mongoose.Schema

const schema = new Schema(
  {
      accountID: {type: Number, unique  : true},
      accountype: {type: String},
      status: {
                      type: String,
                      enum : ['Active','Suspended', 'Inactive'],
                      default: 'Inactive'
                  },
      balance: {type: Number, default: 0},
      transactions: [{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'financialtransaction'
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

const Account = mongoose.model('account', schema, 'accounts');

module.exports = Account


