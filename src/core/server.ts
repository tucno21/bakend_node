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
}

export default Server;