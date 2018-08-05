import _ from 'lodash';

export default class Route {
    public controller:  string;
    public action:      string;
    public method:      string;
    public urlHelper:   string;

    constructor(routeObj: any) {
        this.controller = _.camelCase(routeObj['actionController'].split('#')[0]);
        this.action     = _.camelCase(routeObj['actionController'].split('#')[1]);
        this.method     = routeObj.method;
        this.urlHelper  = routeObj.as;
    }
}
