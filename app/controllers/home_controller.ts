import ApplicationController    from "./application_controller";

// import { transaction }          from 'objection';
import Article                  from '../models/article';

export default class HomeController extends ApplicationController {
    public async welcome() {
        this.scope.message  = 'Welcome Agate';

        await Article.query().orderBy('id').limit(10).then((articles: Array<Article>) => {
            this.scope.articles = articles.map((article: Article) => { return article.title });
        });

        console.log(this.scope.articles);
    }
}
