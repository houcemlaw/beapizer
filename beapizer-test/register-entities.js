
const EntityAPIMDataRegistrator = require('../beapizer/generic-api/api-config/entity-api-metadata-registrator');
const ToDoArea = require('./models/to-do-area');
const ToDoTask = require('./models/to-do-task');
const TaskItem = require('./models/task-item');

EntityAPIMDataRegistrator.register(ToDoArea, 'todoareas');
EntityAPIMDataRegistrator.register(ToDoTask, 'todotasks');
EntityAPIMDataRegistrator.register(TaskItem, 'taskitems');
