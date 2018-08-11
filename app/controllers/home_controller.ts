import ApplicationController    from "./application_controller";

export default class HomeController extends ApplicationController {
    public async welcome() {
        this.scope.message  = 'New Controller';
    }
}
