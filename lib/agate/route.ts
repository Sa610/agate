import _ from 'lodash';

export default class Route {
    public controller:          string;
    public action:              string;
    public controllerAction:    string;
    public method:              string;
    public urlHelper:           string;

    constructor(routeObj: any) {
        this.controllerAction   = routeObj['controllerAction'];
        this.controller         = _.camelCase(routeObj['controllerAction'].split('#')[0]);
        this.action             = _.camelCase(routeObj['controllerAction'].split('#')[1]);
        this.method             = routeObj.method;
        this.urlHelper          = routeObj.as;
    }
}
