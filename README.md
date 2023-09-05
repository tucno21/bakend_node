# CRONOS BACKEND NODE.JS

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
- [Rutas con middlewares](#rutas-con-middelwares)
- [Crear controlador y modelo desde consola](#crear-controlador-y-modelo-desde-consola)
- [Constantes generales](#constantes-generales)
- [Helpers depuracion](#helpers-depuracion)
- [Uso en los controladores](#uso-en-los-controladores)
- [HTTP request](#http-request)
- [Middleware en el controlador](#middelwares-en-el-controlador)
- [Validacion de datos del formulario](#validacion-de-datos-del-formulario)
- [HTTP response](#http-response)
- [Eencriptar el password](#encriptar-el-password)
- [Uso en los modelos](#uso-en-los-modelos)
- [Guardar datos](#guardar-datos)
- [Actualizar datos](#actualizar-datos)
- [Eliminar datos](#eliminar-datos)
- [Consultas](#consultas)
- [Ejemplos de consultas](#ejemplos-de-consultas)
- [consultas personalizadas de la base de datos](#consultas-personalizadas-de-la-base-de-datos)
- [Directiva para las vistas](#directiva-para-las-vistas)
- [helper para la vista](#helper-para-la-vista)
- [Obtener las rutas](#obtener-las-rutas)
- [Sessiones](#sessiones)
- [Tabla de validaiones](#tabla-de-validaciones)

## Intalacion

- Clonar el repositorio
- Ejecutar el comando `npm install`
- Crear un archivo `.env` en la raiz del proyecto
- Configurar el archivo `.env` con los datos de la base de datos

## RUTAS WEB
[☝️Inicio](#cronos-backend-node.js)

en la carpeta `router` crear el archivo.ts y el nombre de este archivo se parte de la ruta api
por ejemplo archivo `blogs.ts` y la url quedaria determinado de la siguiente forma

```
http://192.168.158.206:8000/api/blogs
```

```javascript
import { Router } from 'express';
import { createBlog, deleteBlog, getBlog, getBlogs, updateBlog } from '../controllers/blogController';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validarCampos';

const router = Router();

/* middlewares */
const fields = {
    titulo: check('titulo', 'El titulo es obligatorio').not().isEmpty(),
    contenido: check('contenido', 'El contenido es obligatorio').not().isEmpty(),
    usuario_id: check('usuario_id', 'El usuario es obligatorio').not().isEmpty(),
}

router.get('/', getBlogs);
router.get('/:id', getBlog);
router.post('/', [fields.titulo, fields.contenido, validarCampos], createBlog);
router.put('/:id', [fields.titulo, fields.contenido, validarCampos], updateBlog);
router.delete('/:id', deleteBlog);

export default router;
```