import ActiveMode from "../../lib/agate/active_model";

export default class Article extends ActiveMode {
    protected static modelName = 'articles';

    constructor(public name: string)
        { super(); }

    public get title(): string {
        return this.name;
    }
}
