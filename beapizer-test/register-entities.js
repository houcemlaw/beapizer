
const EntityAPIMDataRegistrator = require('../beapizer/generic-api/api-config/entity-api-metadata-registrator');
const Customer = require('./models/customer');
const Account = require('./models/account');
const FinancialTransaction = require('./models/financial-transaction');

EntityAPIMDataRegistrator.register(Customer, 'customers');
EntityAPIMDataRegistrator.register(Account, 'accounts');
EntityAPIMDataRegistrator.register(FinancialTransaction, 'ftransactions');
