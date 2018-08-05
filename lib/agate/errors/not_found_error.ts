export default class NotFoundError {
    constructor(req: any, res: any) {
        res.status(404)
                .send(`${req.method.toUpperCase()}: ${req.originalUrl} - Not Found`);
    }
}
