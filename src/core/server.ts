import express, { Application } from 'express';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import router from './route';

class Server {

    // private app: express.Application;
    private app: Application;
    private port: string;
    private initParh: string = `/${process.env.NAME_INIT_PATH}` || '/api';

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';

        //iniciar los middlewares
        this.middlewares();
        //iniciar la ruta
        this.routes();
        this.verConsolas();
    }

    middlewares() {
        //cors
        this.app.use(cors());
        //lectura y parseo del body
        this.app.use(express.json());
        //directorio publico
        this.app.use(express.static('public'));
        // Habilitar fileUpload
        this.app.use(fileUpload());
    }

    routes() {
        //inicio de las rutas
        this.app.use(this.initParh, router);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });
    }

    verConsolas() {
        console.log(process.env.NAME_INIT_PATH);
        console.log(process.env.PORT);
        console.log(process.env.DB_HOST);
        console.log(process.env.DB_PORT);
        console.log(process.env.DB_DATABASE);
        console.log(process.env.DB_USERNAME);
        console.log(process.env.DB_PASSWORD);
        console.log(process.env.JWT_SECRET);
        console.log(process.env.FOLDER_NAME);
        console.log(process.env.app_env);
    }
}

export default Server;