import ApplicationController    from "./application_controller";

// import { transaction }          from 'objection';
import Article                  from '../models/article';

export default class HomeController extends ApplicationController {
    public welcome(): void {
        this.scope.message  = 'Welcome Agate';

        // let articleModel = new Article();

        this.scope.articles = Article.query()
                                .skipUndefined()
                                .orderBy('id')
                                .limit(10);

        this.scope.articles.then((row: any) => {
            console.log(row);
        });
    }
}
