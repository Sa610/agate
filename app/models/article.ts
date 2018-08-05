import ActiveMode from "../../lib/agate/active_model";

export default class Article extends ActiveMode {
    protected static modelName = 'articles';

    constructor() {
        super();
    }
}
