# Pre entrega 01 - Backend 

Servidor que contiene endpoints para gestionar los productos y carritos de compra de un e-commerce

## Tabla de Contenidos
1. [Instalación](#instalación)
2. [Configuración](#configuración)
3. [Uso](#uso)
4. [Estructura del Proyecto](#estructura-del-proyecto)
5. [Desarrollo](#desarrollo)
6. [Despliegue](#despliegue)
7. [Contribuir](#contribuir)
8. [Licencia](#licencia)
9. [Autores y Reconocimientos](#autores-y-reconocimientos)
10. [Contactos y Soporte](#contactos-y-soporte)

## Instalación
### Requisitos previos
- Node.js v14.17.0

### Instrucciones de instalación
1. Clonar el repositorio:
   ```sh
   git clone https://github.com/Geider10/Prentega_01.git

2. Descargar dependencias:
    ```sh
    npm install

### Archivos de configuración
`config/default.json`: Configuración por defecto.
`config/production.json`: Configuración para producción.

## Uso
Levantar el servidor:
```sh
npm start
```

### Endpoints de la API/PRODUCTS
**GET** `/api/products`: Obtiene la lista de productos.\
**GET** `/api/products/:id`: Obtiene un producto segun el id.\
**POST** `/api/products`: Crea un nuevo producto\
**PUT** `/api/products/:id`: Actualiza los datos de un producto segun el id\
**DELETE** `/api/products/:id`: Elimina un producto segun el id

### Endpoints de la API/CARTS
**GET** `/api/carts`: Obtiene la lista de carritos.\
**GET** `/api/carts/:id`: Obtiene un carrito segun el id.\
**POST** `/api/carts`: Crea un nuevo carrito\
**POST** `/api/carts/:cid/product/:pid`: Agrega un producto desde `products.json` a un carrito.

## Estructura del proyecto
```
proyecto/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── index.js
├── config/
│   ├── default.json
│   └── production.json
└── README.md
```
## Desarrollo
### Guías de estilo
Sigue las guías de estilo de Airbnb.

### Procedimientos de desarrollo
1. Crea una rama nueva: `git checkout -b feature/nueva-feature`
1. Realiza tus cambios y realiza commits.
1. Envía una solicitud de pull.

### Pruebas
Ejecuta las pruebas con:
```sh
npm test
```
### Postman
Api products
```
GET : http://localhost:8080/api/products?limit=2
GET : http://localhost:8080/api/products/2
POST : http://localhost:8080/api/products
PUT : http://localhost:8080/api/products/2
DELETE : http://localhost:8080/api/products/3
```
Api carts
```
GET : http://localhost:8080/api/carts
GET : http://localhost:8080/api/carts/2
POST : http://localhost:8080/api/carts
POST : http://localhost:8080/api/carts/1/product/5
```
Post/Put product
```
{"name" : "bicicleta", "description":"", "code" : "0005", "price": 200000, "status" : true, "stock": 10, "category": "jugetes"}
```

   
    
## Despliegue
### Entorno de producción
Para desplegar en producción, asegúrate de configurar las variables de entorno adecuadas y usa Docker para construir la imagen.
## Contribuir
### Guía de contribución
Para contribuir, por favor sigue las instrucciones.

### Código de conducta
Este proyecto sigue el Código de Conducta.
## Licencia
Este proyecto está bajo la licencia MIT. Ver el archivo LICENSE para más detalles.
## Autores y reconocimientos
* Geider Frias - Desarrollador 
## Contacto y soporte
Para preguntas o soporte, contacta a yoelde2002@gmail.com

### Notas Adicionales
Cualquier otra información relevante.