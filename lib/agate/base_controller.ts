export default class BaseController {
    public      scope:      any = {};

    protected   request:    any;

    constructor(request: any) {
        this.request = request;
    }
}
