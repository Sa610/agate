import fs   from 'fs';
import _    from 'lodash';
import ejs  from 'ejs';

import * as Controllers     from './controllers_module';

import { NotFoundError }    from './errors/base_error';

import Route                from './route';

export default class Routes {
    public routeList: any;

    constructor() {
        console.log('Routes initialization');

        this.routeList = JSON.parse(fs.readFileSync(__dirname + '/../../config/routes.json').toString());

        this.declareUrlHelper();
    }

    public call(req: any, res: any): void {
        let matchingRoutes = this.getMatchingRoutes(req);

        if(matchingRoutes.length > 0) {
            let route           = new Route(_.last(matchingRoutes));
            let ctrl            = new (Controllers as any)[route.controller + "Controller"](req);
            let actionRendered  = "";

            ctrl[route.action]();

            actionRendered      = ejs.render(
                fs.readFileSync(__dirname + `/../../app/views/${route.controller}/${route.action}.ejs`).toString(),
                {
                    route:  route,
                    scope:  ctrl.scope,
                    req:    req
                }
            );

            res.render(`layouts/${ctrl.layout}`, {
                route:  route,
                scope:  ctrl.scope,
                req:    req,
                main:   actionRendered
            });

            // res.send('Mmmmmmm');
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
