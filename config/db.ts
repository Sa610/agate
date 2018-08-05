export default class KnexConfig {
    public static readonly development: any = {
        client: 'mysql2',
        connection: {
            host : '127.0.0.1',
            user : 'root',
            password : 'root',
            database : 'agate'
        }
    }

    public static readonly production: any = {
        client: 'mysql2',
        connection: {
            host : '127.0.0.1',
            user : 'your_database_user',
            password : 'your_database_password',
            database : 'agate'
        }
    }
}
