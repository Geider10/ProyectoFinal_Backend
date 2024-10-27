## Tabla de Contenidos
1. [Presentación](#presentación)
2. [Instalación](#instalación)
3. [Desarrollo](#desarrollo)
4. [Herramientas](#herramientas)
5. [Despliegue](#despliegue)

## Presentación
Es un sistema que te permite manipular productos y almacenarlos de manera remota. 
El objetivo es tener control del stock de los productos en tiempo real para los clientes.

### Caracteristicas
* Gestion de stock y estado de los productos
* Gestion de varios carritos
* Operaciones CRUD sobre productos en la base de datos
* Utiliza MongoDB para la persistencia
* Estructura del proyecto en capas

## Instalación

### Instrucciones de instalación
1. Clonar el repositorio:
   ```sh
   git clone https://github.com/Geider10/ProyectoFinal_Backend.git

2. Instalar dependencias:
    ```sh
    npm install
### Archivos de configuración
* .env
```sh
MONGO_URL  permite hacer la conexion con una db de mongo atlas
SECRET_KEY = sirve para generar un jwt seguro
EMAIL_ADMIN = email para gestionar el servicio de nodemailer
PASS_ADMIN =  pass generado por craete_password de google para nodemailer
```
### Utilizar aplicación
Levantar el servidor
```sh
npm start MONGO
```
Levantar el frontend
```sh
npm run dev
```

## Desarrollo

### Endpoints
* Ruta del product
```
GET : http://localhost:3000/api/product?limit=5
GET : http://localhost:3000/api/product/:pId
POST : http://localhost:3000/api/product
PUT : http://localhost:3000/api/product/:pId
DELETE : http://localhost:3000/api/product/:pId
```
* Ruta del cart
```
GET : http://localhost:3000/api/cart
GET : http://localhost:3000/api/cart/:cId
POST : http://localhost:3000/api/cart
POST : http://localhost:3000/api/cart/:cId/product/:pId
POST : http://localhost:3000/api/cart/:cId/purchase
PUT : http://localhost:3000/api/cart/:cId/product/:pId
DELETE : http://localhost:3000/api/cart/:cId/product/:pId
DELETE : http://localhost:3000/api/cart/:cId
```
* Ruta del user
```
GET : http://localhost:3000/api/user/protected
POST : http://localhost:3000/api/user/register
POST : http://localhost:3000/api/user/login
```
## Herramientas
### Stack técnologico
Backend: JavaScript, Node.js, Express, MongoDB.

### Librerías
- [bcrypt](https://www.npmjs.com/package/bcrypt): utíl para encriptar datos sensibles.
- [dotenv](https://www.dotenv.org/docs/): utíl para manejas variables de entorno.
- [express](https://expressjs.com/): framework utíl para desarrollar el servidor y el API Rest.
- [express-handlebars](https://www.npmjs.com/package/express-handlebars): utíl para crear vistas y mostrar las respuestas del back.
- [jsonwebtoten](https://jwt.io/introduction): utíl para autenticar al usuario en el front con un token
- [mongoose](https://mongoosejs.com/): ODM utíl para facilitar la conexion y las peticiones con MongoDB.
- [mongoose-paginate-v2](https://www.npmjs.com/package/mongoose-paginate-v2): utíl para mostrar datos segmentados al usuario que vienen del back.
- [nodemailer](https://nodemailer.com/): utíl para gestionar el envio de mail a los usuarios registrados.
- [passport](https://www.passportjs.org/): middleware utíl para hacer autenticaciónes de servicios terceros.
- [passport-jwt](https://www.passportjs.org/packages/passport-jwt/): utíl para autenticar al usuario con jwt


## Despliegue
Link deploy: 