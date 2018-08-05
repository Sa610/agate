export default class ActiveController {
    public      scope:      any = {};

    protected   request:    any;

    constructor(request: any) {
        this.request = request;
    }
}
