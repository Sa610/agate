import fs   from 'fs';
import _    from 'lodash';
import ejs  from 'ejs';

import * as Controllers     from './controllers_module';
import Environment          from './environment';

import { NotFoundError }    from './errors/base_error';

import Route                from './route';

export default class Agate {
    public routeList:   any;
    public env:         Environment;

    constructor(dirName: string) {
        console.log('Agate initialization...');

        this.env        = new Environment(dirName);
        this.routeList  = JSON.parse(fs.readFileSync(this.env.appFiles.routes).toString());

        this.declareUrlHelper();
    }

    public call(req: any, res: any): void {
        let matchingRoutes = this.getMatchingRoutes(req);

        if(matchingRoutes.length > 0) {
            let route           = new Route(_.last(matchingRoutes));
            let ctrl            = new (Controllers as any)[_.camelCase(route.controller) + "Controller"](req);
            let actionRendered  = "";

            ctrl[route.action]();

            ejs.renderFile(this.env.appDir.views + `/${route.controller}/${route.action}.ejs`, {
                route:  route,
                scope:  ctrl.scope,
                req:    req
            }, (err: any, result: any): string => {
                actionRendered = result;

                return result;
            });

            res.render(`layouts/${ctrl.layout}`, {
                route:  route,
                scope:  ctrl.scope,
                req:    req,
                main:   actionRendered
            });

            console.log(`${req.method}: ${req.originalUrl} - ${route.controllerAction} -> ${_.camelCase(route.urlHelper)}Url()\n`);

            res.end();
        } else {
            new NotFoundError(req, res);
        }
    }

    private getMatchingRoutes(req: any): Array<any> {
        let requestUrl: string = req.originalUrl.replace(/(.)\/$/, "$1");

        return this.routeList.filter((route: any) => {
            return  req.method.toLowerCase() == route.method.toLowerCase() &&
                    requestUrl.match(new RegExp(`^${route.path}$`));
        });
    }

    private declareUrlHelper(): void {

    }
}