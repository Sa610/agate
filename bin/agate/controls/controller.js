const fs            = require('fs');
const ejs           = require('ejs');
const LogColors     = require('../../log_colors');

const _ = require("lodash");
_.mixin(require("lodash-inflection"));


let generate = (argv) => {
    console.log(`Generating new controller: ${argv.name}`);

    const fileName  = argv.name + "_controller.ts";
    const className = _.capitalize(argv.name) + "Controller";

    // Using template to write the new controller file
    let ctrlCode = ejs.render(
        fs.readFileSync(__dirname + '/../../../lib/agate/templates/controller.ts.ejs').toString(),
        {className: className}
    );

    fs.writeFileSync(
        __dirname + '/../../../app/controllers/' + fileName,
        ctrlCode
    );

    console.log(`${LogColors.FG_GREEN} + Created file:\t\t${LogColors.UNDERSCORE}${LogColors.FG_WHITE}`,
                `app/controllers/${fileName}${LogColors.RESET}`);

    try {
        fs.mkdirSync(`${__dirname}/../../../app/views/${argv.name}`);
        console.log(`${LogColors.FG_GREEN} + Created new folder: `,
                    `\t${LogColors.UNDERSCORE}${LogColors.FG_WHITE}app/views/${argv.name}${LogColors.RESET}`);
    } catch (e) {
            console.log(`${LogColors.FG_YELLOW} • Folder already exist: `,
                    `\t${LogColors.UNDERSCORE}app/views/${argv.name}${LogColors.RESET}`);
    }

    // Modify Agate controllers module
    let ctrlModule      = fs.readFileSync(__dirname + '/../../../lib/agate/controllers_module.ts').toString()
                            .split("\n").filter((str) => { return str !== '' });

    let ctrlModuleObj   = {
        'importModules': ctrlModule.filter((str) => { return str.match(/^import/) }),
        'exportModules': ctrlModule.filter((str) => { return str.match(/^export/) })
    };

    ctrlModuleObj['importModules'].push(
        `import ${className} from "../../app/controllers/${argv.name}_controller";`
    );

    ctrlModuleObj['exportModules'].push(
        `export const ${_.camelCase(argv.name)}Controller = ${className};`
    );

    fs.writeFileSync(
        __dirname + '/../../../lib/agate/controllers_module.ts',
        _.uniq(ctrlModuleObj['importModules']).join("\n") + "\n\n" + _.uniq(ctrlModuleObj['exportModules']).join("\n")
    );

    console.log(`${LogColors.FG_GREEN} + Included new module:`,
                `\t${LogColors.UNDERSCORE}${LogColors.FG_WHITE}${className}${LogColors.RESET}`);
}

let remove = (argv) => {
    console.log(`Deleting controller: ${argv.name}`);

    const fileName  = argv.name + "_controller.ts";
    const className = _.capitalize(argv.name) + "Controller";

    try {
        fs.unlinkSync(__dirname + '/../../../app/controllers/' + fileName);
        console.log(`${LogColors.FG_RED} - Deleted file:\t\t${LogColors.UNDERSCORE}${LogColors.FG_WHITE}`,
                    `app/controllers/${fileName}${LogColors.RESET}`);
    } catch (e) {
        console.log(`${LogColors.FG_YELLOW} • Folder not exist: `,
                    `\t\t${LogColors.UNDERSCORE}app/controllers/${fileName}${LogColors.RESET}`);
    }

    try {
        fs.rmdirSync(`${__dirname}/../../../app/views/${argv.name}`);
        console.log(`${LogColors.FG_RED} - Create new folder: `,
                    `\t\t${LogColors.UNDERSCORE}${LogColors.FG_WHITE}app/views/${argv.name}${LogColors.RESET}`);
    } catch (e) {
            console.log(`${LogColors.FG_YELLOW} • Folder not exist: `,
                    `\t\t${LogColors.UNDERSCORE}app/views/${argv.name}${LogColors.RESET}`);
    }

    // Modify Agate controllers module
    let ctrlModule      = fs.readFileSync(__dirname + '/../../../lib/agate/controllers_module.ts').toString()
                            .split("\n").filter((str) => { return str !== '' });

    let ctrlModuleObj   = {
        'importModules': ctrlModule.filter((str) => { return str.match(/^import/) }),
        'exportModules': ctrlModule.filter((str) => { return str.match(/^export/) })
    }

    let ctrlImportModules = ctrlModule.filter((str) => { return str.match(/^import/) });
    let ctrlExportModules = ctrlModule.filter((str) => { return str.match(/^export/) });

    ctrlImportModules = _.remove(ctrlImportModules, (mod) => {
        return mod !== `import ${className} from "../../app/controllers/${argv.name}_controller";`;
    });

    ctrlExportModules = _.remove(ctrlExportModules, (mod) => {
        return mod !== `export const ${_.camelCase(argv.name)}Controller = ${className};`;
    });

    fs.writeFileSync(
        __dirname + '/../../../lib/agate/controllers_module.ts',
        _.uniq(ctrlImportModules).join("\n") + "\n\n" + _.uniq(ctrlExportModules).join("\n")
    )

    console.log(`${LogColors.FG_RED} - Removed module:`,
                `\t\t${LogColors.UNDERSCORE}${LogColors.FG_WHITE}${className}${LogColors.RESET}`);
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
