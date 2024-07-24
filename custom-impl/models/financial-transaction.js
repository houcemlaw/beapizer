const mongoose = require('mongoose')


const Schema = mongoose.Schema

const schema = new Schema(
  {
    transactionID: {type: Number, unique  : true},
    accountype: {type: String},
    transactionType: {
    
                      type: String,
                      enum : ['Credit','Debit'],
                      default: 'Inactive',
                      required: [true, 'The transaction type is required']
                    },
    accountSource: {
                    type: mongoose.Schema.Types.ObjectId, 
                    ref: 'account',
                    required: [true, 'The account source is required']
                  },
    accountDestination: {
                          type: mongoose.Schema.Types.ObjectId, 
                          ref: 'account',
                          required: [true, 'The account destination is required']
                        },
    amount: {type: Number, required: [true, 'The transaction amount is required']},
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

const FinancialTransaction = mongoose.model('financialtransaction', schema, 'financialtransactions');

module.exports = FinancialTransaction


