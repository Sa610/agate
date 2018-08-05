import ApplicationController from "./application_controller";

export default class HomeController extends ApplicationController {    
    public home(): void {
        this.scope.message = 'Hello Agate';
    }

    public welcome(): void {
        this.scope.message = 'Welcome Agate';
    }
}
