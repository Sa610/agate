export default class ActiveController {
    public      scope:      any = {};

    protected   request:    any;
    protected   env:        any = {};

    constructor(request: any, env: any) {
        this.request    = request;
        this.env        = env;
    }
}
