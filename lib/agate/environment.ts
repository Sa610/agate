import path from 'path';

export default class Environment {
    private _appDir:    any = {};
    private _appFiles:  any = {};

    constructor(indexDirName: string) {
        this._appDir    = this.appDirSetup(indexDirName);
        this._appFiles  = this.appFilesSetup(indexDirName);
    }

    public get appDir(): any {
        return this._appDir;
    }

    public get appFiles(): any {
        return this._appFiles;
    }

    private appDirSetup(indexDirName: string): any {
        indexDirName = path.normalize(indexDirName);

        let directories: any = {
            'app':          path.join(indexDirName, 'app'),
            'config':       path.join(indexDirName, 'config'),
            'lib':          path.join(indexDirName, 'lib'),
            'controllers':  path.join(indexDirName, 'app/controllers'),
            'models':       path.join(indexDirName, 'app/models'),
            'views':        path.join(indexDirName, 'app/views')
        };

        return directories;
    }

    private appFilesSetup(indexDirName: string): any {
        indexDirName = path.normalize(indexDirName);

        let files: any = {
            'controllerTemplate':   path.join(indexDirName, 'lib/agate/templates/controller.ts.ejs'),
            'modelTemplate':        path.join(indexDirName, 'lib/agate/templates/model.ts.ejs'),
            'routes':               path.join(indexDirName, 'config/routes.json'),
            'db_conf':              path.join(indexDirName, 'config/db.ts')
        };

        return files;
    }
}
