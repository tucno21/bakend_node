# CRONOS BACKEND NODE JS

## Requirimientos

- node >= 18.0.0


### Directorio de carpetas:

```
📁 backend
├───📁 public/
│   └───📄 index.hmtl
├───📁 src/
│   └───📁 controllers/
│   |   └────📄 authController.ts
│   └───📁 controllers/
│   |   └────📄 core.ts
│   |   └────📄 route.ts
│   |   └────📄 server.ts
│   └───📁 database/
│   |   └────📄 mysql.ts
│   └───📁 helpers/
│   |   └────📄 jwt.ts
│   └───📁 middlewares/
│   |   └────📄 validarCampos.ts
│   |   └────📄 validarJwt.ts
│   └───📁 model/
│   |   └────📄 blog.ts
│   └───📁 router/
│       └────📄 blogs.ts
├───📄 .gitignore
├───📄 app.ts
├───📄 blog.sql
├───📄 package.json
├───📄 tsconfig.json
└───📄 .env.example
```

## **Índice**

- [Instalación](#instalacion)
- [Rutas web](#rutas-web)
- [Rutas con middlewares](#rutas-con-middlewares)
- [HTTP request](#http-request)
- [Encriptar el password](#encriptar-el-password)
- [Almacenar Imagenes](#almacenar-imagenes)
- [Generar Tocken](#generar-tocken)
- [Crear Modelos](#crear-modelos)
- [Guardar datos](#guardar-datos)
- [Actualizar datos](#actualizar-datos)
- [Eliminar datos](#eliminar-datos)
- [Consultas](#consultas)
- [Ejemplos de consultas](#ejemplos-de-consultas)

## Instalación

- Clonar el repositorio
- Ejecutar el comando `npm install`
- Crear un archivo `.env` en la raiz del proyecto
- Configurar el archivo `.env` con los datos de la base de datos

## Rutas web
[☝️Inicio](#cronos-backend-node-js)

en la carpeta `router` crear el archivo.ts y el nombre de este archivo es parte de la ruta api
por ejemplo archivo `blogs.ts` y la url quedaria determinado de la siguiente forma

```
http://192.168.158.206:8000/api/blogs
```

```javascript
import { Router } from 'express';
import { createBlog, deleteBlog, getBlog, getBlogs, updateBlog } from '../controllers/blogController';

const router = Router();

router.get('/', getBlogs);
router.get('/:id', getBlog);
router.post('/', createBlog);
router.put('/:id', updateBlog);
router.delete('/:id', deleteBlog);

export default router;
```


## Rutas con middlewares
[☝️Inicio](#cronos-backend-node-js)

en la carpeta middlewares se tiene para validar el token y procesar con express-validator

```javascript
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validarCampos';
import { validarJWT } from '../middlewares/validarJwt';

const fields = {
    email: check('email', 'El email es obligatorio').not().isEmpty(),
    password: check('password', 'La contraseña es obligatoria').not().isEmpty(),
    nombre: check('nombre', 'El nombre es obligatorio').not().isEmpty(),
}

//CRUD de usuarios
router.get('/', [validarJWT], getUsers);
router.get('/:id', [validarJWT], getUser);
router.post('/', [validarJWT, fields.nombre, fields.email, fields.password, validarCampos], createUser);
router.put('/:id', [validarJWT, fields.nombre, fields.email, validarCampos], updateUser);
router.delete('/:id', [validarJWT], deleteUser);
```


## HTTP request
[☝️Inicio](#cronos-backend-node-js)
forma de obtener lo que envia por POST PUT DELETE
```javascript
export const getUser = async (req: Request, res: Response) => {
    const { id } = req.params; //mediante url
    const {name, email} = req.body //mediante post
    const files = req.files  //arrar de imagenes
}
```

## Encriptar el password
[☝️Inicio](#cronos-backend-node-js)
hacer uso de bcrypt
```javascript
import bcrypt from 'bcryptjs';
    const salt = bcrypt.genSaltSync();
    body.password = bcrypt.hashSync(body.password, salt);
```

## Almacenar Imagenes
[☝️Inicio](#cronos-backend-node-js)
usar la funcion fileSave() esta funcion almacena la imagen y retorna los nombres del archivo
```javascript
//le enviamo toto lo que venga del Request
const images = req.files;
//el segundo paramatro es el array con el nombre o nombres a evaluar de los inputs
const result = fileSave({ file: images!, fieldName: ['imagen'] });

//file save acepta dos parametros mas que son opcionales
//allowedTypes: verifica las extenciones permitidas ejemplo 'jpg' , 'png', etc
//cuarto parametro si se cambia por update, este deja de verifcar que todos los nombres del array se cumplan
const result = fileSave ({ file, fieldName, allowedTypes = [], mode = 'create' }) 

//FORM DE RETONO DE fileSave()
// "result" puede ser error | nameFiles
        if ('error' in result) return res.status(400).json({
            status: 'error',
            message: 'Error al guardar imagen',
            data: result.error
        });

//si todo esta bien obtenemos el nombre
        const { imagen } = result.nameFiles;


//ELIMINAR IMAGEN
import fileDelete from '../helpers/fileDelete';
//enviar el nombre de la imagen
fileDelete(usuario.imagen);
```


## Generar Tocken
[☝️Inicio](#cronos-backend-node-js)
hacer uso de la funcion generateJWT()
```javascript
import { generateJWT } from '../helpers/jwt';
const token = await generateJWT({ uid: usuario.id, email: usuario.email });
```

## Crear Modelos
[☝️Inicio](#cronos-backend-node-js)
en la carpeta model crear con el nombre.ts
```javascript
import Model from "../core/model";

class User extends Model {
    protected tableName = 'usuarios';
    protected primaryKey = 'id';
    protected fillable = ['nombre', 'email', 'password', 'imagen'];
    protected hidden = ['password']; //no es obligatorio
    protected timestamps = true; //no es obligatorio esta en false
    protected created = 'created_at'; //no es obligatorio
    protected updated = 'updated_at'; //no es obligatorio
}

export default new User();
```

## Guardar datos
[☝️Inicio](#cronos-backend-node-js)
```javascript
const { body } = req;
//el parametro que acepta el un objeto
const usuario = await User.create(body);
```

## Actualizar datos
[☝️Inicio](#cronos-backend-node-js)
```javascript
const { id } = req.params;
const { body } = req;
const user = await User.update(usuario.id, body);
```

## Eliminar datos
[☝️Inicio](#cronos-backend-node-js)
```javascript
const { id } = req.params;
await User.delete(usuario.id);
```

## Consultas
[☝️Inicio](#cronos-backend-node-js)
```javascript
//obtener todos los datos de la tabla no se puede anidar
User.all();
//obtener un dato de la tabla no se puede anidar
User.find($id);
//puede anidar consultas con los metodos, puede no usar uno o varios metodos
//pero debe respetar el orden y terminar con .get() o .first();
User.select()
    .join()
    .where()
    .andWhere()
    .orWhere()
    .orderBy()
    .limit()
    .get();
```

el metodo `where()` puede se reemplazado por `whereBetween()` y `whereConcat()` pero no se pueden anidar entre si
el metodo `andWhere()` y `orWhere()` solo funciona con `where()`, `whereBetween()` y `whereConcat()`

```javascript
//select solo las columnas que se quieren obtener
//select() permite varios parametros
User.select('name', 'email').get();

//join sirve para unir tablas
User.join('nombreOtraTabla', 'clientes.id', '=', 'ventas.cliente_id').get();

//where sirve para buscar por igualdad
//los parametro de where(), si solo envia dos parametros se asume que busca por igualdad
User.where('column', 'valueColumnn').get();
//si envia tres parametros se asume que busca por operador
User.where('column', 'operador', 'valueColumn').get();

//andWhere sirve para buscar por una condicion adicional "AND" (y tambien)
//los parametro de andWhere(), si solo envia dos parametros se asume que busca por igualdad
User.where('column', 'valueColumn').andWhere('colum', 'valueColumn').get();
//si envia tres parametros se asume que busca por operador
User.where('column', 'operador', 'valueColumn').andWhere('column', 'operador', 'valueColumn').get();

//orWhere sirve para buscar por una condicion adicional "OR" (o tambien)
//los parametro de orWhere(), si solo envia dos parametros se asume que busca por igualdad
User.where('column', 'valueColumn').orWhere('colum', 'valueColumn').get();
//si envia tres parametros se asume que busca por operador
User.where('column', 'operador', 'valueColumn').orWhere('columm', 'operador', 'valueColumn').get();

//orderBy sirve para ordenar los datos de la consulta por una columna en especifico
//ascendente (asc) o descendente (desc)
User.orderBy('column', 'desc').get();

//los parametro de limit() son los campos que se quieren limitar permite varios parametros
User.limit(10).get();

//whereBetween sirve para buscar por un rango de valores
//los parametro de whereBetween() son la columna, el valor minimo y el valor maximo
User.whereBetween('column', 'valueMin', 'valueMax').get();

//whereConcat sirve para buscar por una concatenacion de valores
//los parametro de whereConcat() son la columna, el valor minimo y el valor maximo
User.whereConcat('columnas', 'operadorOvalor', 'valor').get();

//ejemplo whereConcat con dos parametros
User.whereConcat('column1 - column2', 'value').get();
//ejemplo whereConcat con tres parametros
User.whereConcat('column1 - column2', 'operador', 'value').get();
```


## EJEMPLOS DE CONSULTAS
[☝️Inicio](#cronos-backend-node-js)
```javascript
//obtener todos los datos de la tabla
User.all();

//obtener un dato de la tabla
User.find($id);

//obtener todos los datos de la tabla ordenados por id de forma descendente
User.orderBy('id', 'desc').get();

//obtener todos los datos de la tabla ordenados por id de forma ascendente
User.orderBy('id', 'asc').get();

//obtener todos los datos de la tabla ordenados por id de forma ascendente y limitar a 10
User.orderBy('id', 'asc').limit(10).get();

//obtener todos los datos de la tabla ordenados por id de forma ascendente
User.orderBy('id', 'asc').limit(10).get();

//obtener todos los datos de la tabla ordenados por id de forma ascendente  y obtener solo los datos de la columna name
User.select('name').orderBy('id', 'asc').limit(10).get();

//obtener todos los datos de la tabla ordenados por id de forma ascendente  y obtener solo los datos de la columna name y email
User.select('name', 'email').orderBy('id', 'asc').limit(10).get();

//obtener todos los datos de la tabla ordenados por id de forma ascendente  y obtener solo los datos de la columna name y email y unir la tabla roles
User.select('name', 'email').join('roles', 'users.id', '=', 'roles.user_id').orderBy('id', 'asc').limit(10).get();


//obtener todos los datos de la tabla ordenados por id de forma ascendente  y obtener solo los datos de la columna name y email y unir la tabla roles y obtener solo los datos de la columna name de la tabla roles y obtener solo los datos de la tabla roles donde el id sea igual a 1 y el id de la tabla users sea igual a 1
User.select('name', 'email', 'roles.name').join('roles', 'users.id', '=', 'roles.user_id').where('roles.id', 1).andWhere('users.id', 1).orderBy('id', 'asc').limit(10).get();

const etiquetas = await blogEtiquetas.select('etiquetas.id', 'etiquetas.nombre')
            .join('etiquetas', 'blogs_etiquetas.etiqueta_id', '=', 'etiquetas.id')
            .where('blogs_etiquetas.blog_id', '=', id)
            .get();
```