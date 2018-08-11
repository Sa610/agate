const fs            = require('fs');
const _             = require('lodash');
const yargs         = require('yargs');

const Controller    = require('./controls/controller');
const Model         = require('./controls/model');

const argv  = yargs.command(
    'controller', 'Manage Agate controllers', {
        'action': {
            'describe': 'Action to call - [generate, remove]',
            'demand':   true,
            'alias':    'a'
        },
        'name': {
            'describe': 'Controller name',
            'demand':   true,
            'alias':    'n'
        },
        'view': {
            'describe': 'View type - [none, ejs, json]',
            'demand':   false,
            'alias':    'v'
        }
}).command(
    'model', 'Manage Agate models', {
        'action': {
            'describe': 'Action to call - [generate, remove]',
            'demand':   true,
            'alias':    'a'
        },
        'name': {
            'describe': 'Model name',
            'demand':   true,
            'alias':    'n'
        }
}).argv;

switch (argv._[0]) {
    case 'controller':
        Controller.execute(argv);
        break;
    case 'model':
        Model.execute(argv);
        break;
}
