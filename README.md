# Proyecto Final - Backend
Es un sistema que te permite manipular productos y almacenarlos de manera remota. 
El objetivo es tener control del stock de los productos en tiempo real para los clientes.

### Caracteristicas
* Gestion de stock y estado de los productos
* Gestion de varios carritos
* Operaciones CRUD sobre productos en la base de datos
* Utiliza MongoDB para la persistencia
* Estructura del proyecto organizada en carpetas

## Tabla de Contenidos
1. [Instalación](#instalación)
2. [Utilizar aplicación](#utilizar-aplicación)
3. [Estructura del proyecto](#estructura-del-proyecto)
4. [Stack de tecnologías](#stack-de-tecnologías)
5. [Desarrollo](#desarrollo)
6. [Despliegue](#despliegue)
7. [Contribuir](#contribuir)
8. [Licencia](#licencia)
9. [Autores y reconocimientos](#autores-y-reconocimientos)
10. [Contacto y soporte](#contacto-y-soporte)

## Instalación
### Requisitos previos
- Node.js v14.17.0

### Instrucciones de instalación
1. Clonar el repositorio:
   ```sh
   git clone https://github.com/Geider10/ProyectoFinal_Backend.git

2. Instalar dependencias:
    ```sh
    npm install
### Archivos de configuración
`package.json`: Configuración por defecto.


`.env`:  Definir credeciales y variables de entorno.


`.env.uri`: Conectarte con el connection.string de tu cluster de MongoDB Atlas. En el connection poner tu contreseña y hacer referencia a la base de datos que se requeire.


## Utilizar aplicación
Levantar el servidor: puerto 8080
```sh
npm start
```
Levantar el cliente: puerto 3030
```sh
npm run dev
```


## Estructura del proyecto
```
proyecto/
├── src/
|   ├── controllers/
|   |   ├── cartsManager.js # Tiene funciones y manipula el modelo del carrito
│   │   └── productManager.js # Tiene funciones y manipula el modelo del producto
|   |
│   ├── models/
│   │   ├── cartModel.js # Tiene un schema para usar populate
│   │   └── productModel.js # Tiene un schema para usar paginate
│   │
│   ├── public/
│   │   ├── css/
|   |   |   └── style.css
│   │   └── js/ 
│   │       ├── index.js # Utiliza socket.io el cliente para enviar data al servidor
│   │       └── productsManager # Utiliza fetch el cliente para agregar productos en la base de datos
|   |
│   ├── router/
│   │   ├── cartRoutes.js # recibe y accede al manager para enviar respuestas
│   │   ├── productRoutes.js #  recibe y accede al manager para enviar respuestas
│   │   └── viewRoutes.js # accede al productManager para obtener los productos y mostrarlos en los handlebars
│   │
│   ├── views/
│   │   ├── layouts/
|   |   |   └── main.handlebars # Gestiona los demas handlebars
│   │   ├── cartProducts.handlebars # Muestra con populate los productos de un carritoId
│   │   ├── home.handlebars # Lista de todos los productos con socket.io
│   │   ├── paginateProducts.handlebars # Muestra una tabla de productos usando paginate
│   │   └── realtimeproducts.handlebars # Formulario para agregar productos con socket.io
│   │
|   ├── app.js # Punto de inicio de la aplicación
│   └── utils.js # Manejar archivos
│
├── .env
├── .gitignore
├── package-lock.json
├── package.json
└── README.md
```
## Stack de tecnologías
* Lengugajes: JavaScript
* Frameworks y Librerías: 
* Bases de Datos: Mongo DB
* Herramientas y Servicios: 

## Desarrollo
### Guías de estilo
Utilizo guías de estilo de Airbnb y utilizo estos patrones:
* Arquitectura API REST

* Principios SOLID
### Definición de endpoints
Products : 

1. Get: retorna por consola un objeto de tipo `paginate` donde muestra los documentos, total de documentos, el numero de pagina, etc. Muestra por defecto la pagina 1 y retorna un limite de 10 productos.
2. Get: segun los `query.params` que le pasen en la ruta cambia el objeto paginate. Los query se concatenan con `&` o se pasa un solo query, los query son: `limit=4`, `page=2`, `sort=1/-1`, `category=deportes,etc`.
3. Get: retorna un json con los datos de un producto si recibe en la ruta el `_id` de un producto.
4. Post: permite agregar un producto con condiciones, el producto que recibe del cliente `req.body` tiene que tener los campos completos o no se agrega y ademas transforma el atributo de `status: true` de dicho producto.
5. PUT: actualiza los datos segun un id , necesita recibir en la ruta `_id` de un producto y tiene que recibir del cliente un producto con todos campos completos `req.body`.
6. DELETE: elimina un producto segun un id. El `_id` tiene que existir en la base de datos.


Carts : 

1. Get: retorna un json donde muestra los carritos con sus atibutos.
2. Get: renderiza un handlebars donde muestra los productos que contiene un carrito. Utiliza `populate` en el modelo para hacer la conexion con `colleccion.products` y  mostrar los datos de los`productosId` , necesita en la ruta el `_id`del carrito.
3. Post: genera un nuevo carrito no necesita recibir un `req.body` ya que sus atributos `_id:, products:[]` lo genera por defecto mongoDB. Asi esta definido el modelo del carrito.
4. Post: agrega un producto que exista a algun carrito que exista, pasar en la ruta `cId, pId` ya que es necesario para que se pueda pushiar el `productoId` dentro del `cartId`. Si agrega el mismo producto se suma la cantidad dentro carrito, no hace falta mandar un `req.body`.
5. Put: actualiza el array products de un carrito segun el id, la ruta necesita el `cId` del carrito y el `req.body` tiene que seguir el mismo formato `{products:[]}` .
6. Put: actualiza solo el atributo de la cantidad de un producto que este agregado dentro de un carrito, en la ruta hay que pasar `cId` del carrito y `pId` del producto. Los Id tiene que exitir y en `req.body` solo hay que pasar la cantidad como objeto.
7. Delete: elimina un producto que este agregado dentro de un carrito, en la ruta hay que pasar `cId` del carrito y `pId` del producto. Los Id tiene que existir.
8. Delete: deja vacio el array de productos de un carrito, en la ruta hay que pasar `cId` de dicho carrito que exista.
### Postman
api/productsRouter
```
1 GET : http://localhost:8080/api/productsRouter
2 GET : http://localhost:8080/api/productsRouter?limit=5&page=1&sort=1&category=juguetes
3 GET : http://localhost:8080/api/productsRouter/:pId
4 POST : http://localhost:8080/api/productsRouter
5 PUT : http://localhost:8080/api/productsRouter/:pId
6 DELETE : http://localhost:8080/api/productsRouter/:pId
```
schema del producto
```
metodo post/put
  {
    "name": "escritorio",
    "description": "mesa grande ideal para tu PC",
    "code": "0022",
    "price": 250000,
    "status": false,
    "stock": 5,
    "category": "muebles"
  }
```

api/cartsRouter
```
1 GET : http://localhost:8080/api/cartsRouter
2 GET : http://localhost:8080/api/cartsRouter/cId
3 POST : http://localhost:8080/api/cartsRouter
4 POST : http://localhost:8080/api/cartsRouter/cId/product/pId
5 PUT : http://localhost:8080/api/cartsRouter/cId
6 PUT : http://localhost:8080/api/cartsRouter/cId/product/pId
7 DELETE : http://localhost:8080/api/cartsRouter/cId/product/pId
8 DELETE : http://localhost:8080/api/cartsRouter/cId
```
schema del cart
```
metodo post
{
}

metodo put
{
    "products":[
        {
            "productId": "66b2d441a8dafba7d25926d4",
            "quantity": 2,
            "_id": "66b7bf21524a19f8e6b12743"
        },
        {
            "productId": "66b2673149fee3fd643ecff2",
            "quantity": 5,
            "_id": "66b929f7f7577e770d377cd4"
        }
    ]
}
```
### Dependencias
- [dotenv](https://www.dotenv.org/docs/): Carga variables de entorno desde un archivo `.env`.
- [express](https://expressjs.com/): Framework de Node.js.
- [express-handlebars](https://www.npmjs.com/package/express-handlebars): Motor de plantillas para Express.
- [mongoose](https://mongoosejs.com/): ODM (Object Data Modeling) para MongoDB y Node.js.
- [mongoose-paginate-v2](https://www.npmjs.com/package/mongoose-paginate-v2): Plugin de paginación para Mongoose.
- [socket.io](https://socket.io/): Biblioteca para aplicaciones web en tiempo real.

### Pruebas
Ejecuta las pruebas con:
```sh
npm test
```
    
## Despliegue
### Entorno de producción
Para desplegar en producción
* Configurar variables de entornos
* Optimizar las imagenes en webp
### Link del deploy
Es un sistema backend no tiene un lindo front.

## Contribuir
### Guía de contribución
Para contribuir de manera efectiva y ordena, por favor sigue las instrucciones.
1. Configura el entorno: Clona el repositorio, instala dependencias y configura las variables de entorno.
2. Sigue los estándares: Asegúrate de seguir las convenciones de código y ejecutar pruebas antes de enviar un pull request.
3. Envía Pull Requests: Crea una nueva rama, realiza tus cambios, y envía un pull request para revisión.
4. Actualizar documentacion: Si es necesario. 
### Código de conducta
Para mantener un entorno respetuoso e inclusivo, todos los colaboradores deben:
1. Tratar a los demás con respeto.
2. Fomentar la inclusión y la diversidad.
3. Resolver desacuerdos de manera constructiva.

## Licencia
Este proyecto está bajo la licencia MIT. Ver el archivo LICENSE para más detalles.

## Autores y reconocimientos
* Geider Yoel Frias - Desarrollador 

## Contacto y soporte
* Email: geiderfrias@outlook.es
* Telefono: +54 9 1161539624
* LinkedIn: https://www.linkedin.com/in/geiderfrias/

### Notas Adicionales
Creditos del readme a Omar.