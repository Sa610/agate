const fs            = require('fs');
const ejs           = require('ejs');
const LogColors     = require('../../log_colors');

const _ = require("lodash");
_.mixin(require("lodash-inflection"));


let generate = (argv) => {
    console.log(`Generating new model: ${argv.name}`);

    const fileName  = argv.name + ".ts";
    const className = _.capitalize(argv.name) + "Model";

    // Using template to write the new controller file
    let modelCode = ejs.render(
        fs.readFileSync(__dirname + '/../../../lib/agate/templates/model.ts.ejs').toString(),
        {className: className, tableName: _.pluralize(argv.name)}
    );

    fs.writeFileSync(
        __dirname + '/../../../app/models/' + fileName,
        modelCode
    );

    console.log(`${LogColors.FG_GREEN} + Created file:\t\t${LogColors.UNDERSCORE}${LogColors.FG_WHITE}`,
                `app/models/${fileName}${LogColors.RESET}`);
}

let remove = (argv) => {
    console.log(`Deleting model: ${argv.name}`);

    const fileName  = argv.name + ".ts";
    const className = _.capitalize(argv.name) + "Model";

    try {
        fs.unlinkSync(__dirname + '/../../../app/models/' + fileName);
        console.log(`${LogColors.FG_RED} - Deleted file:\t\t${LogColors.UNDERSCORE}${LogColors.FG_WHITE}`,
                    `app/models/${fileName}${LogColors.RESET}`);
    } catch (e) {
        console.log(`${LogColors.FG_YELLOW} • Folder not exist: `,
                    `\t\t${LogColors.UNDERSCORE}app/models/${fileName}${LogColors.RESET}`);
    }
}

let execute = (argv) => {
    switch (argv.action) {
        case 'generate':
            generate(argv);
            break;
        case 'delete':
            remove(argv);
            break;
    }
}

module.exports = {
    execute
};
