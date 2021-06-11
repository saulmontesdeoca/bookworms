# TC3041 Proyecto Final

# *BookWorms*
---

##### Integrantes:
1. *[Saúl Montes De Oca](http://github.com/saulmontesdeoca/)* - *A01025975* - *CSF*
2. *[Juan Carlos Hurtado Andrade](https://github.com/CarlosHurand)* - *A01025193* - *CSF*

---
## 1. Aspectos generales

Las orientaciones del proyecto se encuentran disponibles en la plataforma **Canvas**.

Este documento es una guía sobre qué información debe entregar como parte del proyecto, qué requerimientos técnicos debe cumplir y la estructura que debe seguir para organizar su entrega.

### 1.1 Requerimientos técnicos

A continuación se mencionan los requerimientos técnicos mínimos del proyecto, favor de tenerlos presente para que cumpla con todos.

* El equipo tiene la libertad de elegir las tecnologías de desarrollo a utilizar en el proyecto.
* El proyecto debe utilizar al menos dos modelos de bases de datos diferentes, de los estudiados en el curso.
* La arquitectura debe ser modular, escalable, con redundancia y alta disponibilidad.
* La arquitectura deberá estar separada claramente por capas (*frontend*, *backend*, *API RESTful*, datos y almacenamiento).
* Los diferentes componentes del proyecto (*frontend*, *backend*, *API RESTful*, bases de datos, entre otros) deberán ejecutarse sobre contenedores [Docker](https://www.docker.com/) o desplegarse en un servicio en la nube.
* Todo el código, *datasets* y la documentación del proyecto debe alojarse en este repositorio de GitHub siguiendo la estructura que aparece a continuación.

### 1.2 Estructura del repositorio
El proyecto debe seguir la siguiente estructura de carpetas:
```
- / 			        # Raíz de todo el proyecto
    - README.md			# Archivo con los datos del proyecto (este archivo)
    - frontend			# Carpeta con la solución del frontend (Web app)
    - api			# Carpeta con la solución de la API o el backend
    - dbs			# Carpeta con los modelos, catálogos y scripts necesarios para generar las bases de datos
    - docs			# Carpeta con la documentación del proyecto
```

### 1.3 Documentación  del proyecto

Como parte de la entrega final del proyecto, se debe incluir la siguiente información:

* Justificación de los modelo de *bases de datos* que seleccionaron.
* Descripción del o los *datasets* y las fuentes de información utilizadas.
* Guía de configuración, instalación y despliegue de la solución.
* Documentación de la API (si aplica). Puede ver un ejemplo en [Swagger](https://swagger.io/). 
* El código debe estar documentado siguiendo los estándares definidos para el lenguaje de programación seleccionado.

## 2. Descripción del proyecto

Bookworms es una red social de libros en el que los usuarios pueden compartir sus repisas de libros. Los usuarios llamados bookworms, pueden registrarse o hacer login para usar la plataforma. Pueden editar sus repisas, pueden buscar libros por autor o titulo o entrar a la sección de descubrir dónde se encuentran todos los libros desponibles en la red social categorizados por género. Pueden añadirlos a la repisa de su elección. Estas repisas de libros la pueden ver sus seguidores. Como bookworm, tienes acceso a buscar a amigos en la red para seguirlos y tambien ver sus repisas. Las repisas de libros llamadas bookshelves se categorizan como:

 - Recomendaciones
 - Actualmente leyendo
 - Quiero leer
 - Leídos

Al entrar a ver más información sobre algún libro pueden ver su titulo, autor, calificación por BookWorms, descripción, más libros sobre el autor (si estan disponibles en la base de datos), más libros del mismo género, Aquí tambien es donde se despliegan 4 botones los cuales se encargan de añadir o remover de las repisas de los usuarios dicho libro.

## 3. Solución

A continuación aparecen descritos los diferentes elementos que forman parte de la solución del proyecto.

### 3.1 Modelos de *bases de datos* utilizados

*[Incluya aquí una explicación del análisis realizado y la justificación de los modelos de *bases de datos* seleccionados. Incluya todo lo que considere necesario para que una persona sin conocimientos técnicos pueda entender de que trata su solución.]*

### 3.2 Arquitectura de la solución

*[Incluya aquí un diagrama donde se aprecie la arquitectura de la solución propuesta, así como la interacción entre los diferentes componentes de la misma.]*

### 3.3 Frontend

*[Incluya aquí una explicación de la solución utilizada para el frontend del proyecto. No olvide incluir las ligas o referencias donde se puede encontrar información de los lenguajes de programación, frameworks y librerías utilizadas.]*

#### 3.3.1 Lenguajes de programación

- Javascript
- CSS
- HTML

#### 3.3.2 Framework

- React

#### 3.3.3 Librerías de funciones o dependencias

- react-bootstrap
- react-multi-carousel

### 3.4 API o backend

*[Incluya aquí una explicación de la solución utilizada para implementar la API del proyecto. No olvide incluir las ligas o referencias donde se puede encontrar información de los lenguajes de programación, frameworks y librerías utilizadas.]*

#### 3.4.1 Lenguaje de programación

- Python

#### 3.4.2 Framework

- Flask

#### 3.4.3 Librerías de funciones o dependencias

- redis (python driver)
- pymongo
- passlib
- flask_pymongo
- dnspython

#### 3.4.4 Documentación API

#### @app.route('/redis/<id>', methods=['POST'])
* **Descripción**:
Verificacion de sesión en redis del id. El id se pasa como parametro en la url. Usado para development
* **URL**:
```python
'/redis/<id>'
```
* **Verbos HTTP**:
    - POST
* **Headers**:

| Plugin | README |
| ------ | ------ |
| Content-Type | application/json |
| token | <token> |
* **Formato JSON de la respuesta**:
```json
'No session'
```
* **Códigos de error**:
    - 408: No session

#### @app.route('/session/<token>', methods=['GET'])
* **Descripción**:

Verificacion de sesión en redis del id recibido por cookies. El id se pasa como parametro en la url. Usado para development.

* **URL**:
```python
'/session/<token>'
```
* **Verbos HTTP**:
    - GET
* **Headers**:

| Plugin | README |
| ------ | ------ |
| Content-Type | application/json |
| token | <token> |

* **Formato JSON de la respuesta**:
```json
'No session'
```
* **Códigos de error**:
    - 408: No session

#### @app.route('/login', methods=['POST'])
* **Descripción**:
Login del usuario. Se encarga de ir a buscar a la BD el usuario y si aparece verifica las contraseñas hasheadas.
* **URL**:
```python
'/login'
```
* **Verbos HTTP**:
    - POST
* **Headers**:

| Plugin | README |
| ------ | ------ |
| Content-Type | application/json |
| token | <token> |
* **Formato JSON del cuerpo de la solicitud**: 
```json
{
    "email",
    "password"
}
```
* **Formato JSON de la respuesta**:
```json
{
    "_id":,
    "first_name",
    "last_name",
    "email",
    "read",
    "want_read",
    "recommendations",
    "currently_reading",
    "posts",
    "following"
}
```
* **Códigos de error**:
    - 500: Server error
    - 408: No session

#### @app.route('/signin', methods=['POST'])

* **Descripción**:
Registro del usuario a la base de datos.
* **URL**:
```python
'/signin'
```
* **Verbos HTTP**:
    - POST
* **Headers**:

| Plugin | README |
| ------ | ------ |
| Content-Type | application/json |
| token | <token> |
* **Formato JSON del cuerpo de la solicitud**: 
```json
{
    "first_name",
    "last_name"
    "email",
    "password",
    "password2"
}
```
* **Formato JSON de la respuesta**:
```json
{
    "_id":,
    "first_name",
    "last_name",
    "email",
    "read",
    "want_read",
    "recommendations",
    "currently_reading",
    "posts",
    "following"
}
```
* **Códigos de error**:
    - 500: Server error
    - 408: No session

@app.route('/logout', methods=['POST'])

* **Descripción**:
Va a redis y elimina la sesion obtenida por el token enviado en cookies y recibido por la API
* **URL**:
```python
'/logout'
```
* **Verbos HTTP**:
    - POST
* **Headers**:

| Plugin | README |
| ------ | ------ |
| Content-Type | application/json |
| token | <token> |

* **Códigos de error**:
    - 500: Server error
    - 408: No session

#### @app.route('/users', methods=['GET'])

* **Descripción**:
Devuelve todos los usuarios en la base de datos
* **URL**:
```python
'/users'
```
* **Verbos HTTP**:
    - GET
* **Headers**:

| Plugin | README |
| ------ | ------ |
| Content-Type | application/json |
| token | <token> |

* **Formato JSON de la respuesta**:
Un array de objetos como el siguiente:
```json
{
    "_id":,
    "first_name",
    "last_name",
    "email",
    "read",
    "want_read",
    "recommendations",
    "currently_reading",
    "posts",
    "following"
}
```
* **Códigos de error**:
    - 404: Not found
    - 408: No session

#### @app.route('/users', methods=['POST'])

* **Descripción**:
Registra a un usuario a la base de datos
* **URL**:
```python
'/users'
```
* **Verbos HTTP**:
    - POST
* **Headers**:

| Plugin | README |
| ------ | ------ |
| Content-Type | application/json |
| token | <token> |
* **Formato JSON del cuerpo de la solicitud**: 
```json
{
    "first_name",
    "last_name"
    "email",
    "password",
    "password2"
}
```
* **Códigos de error**:
    - 500: Server error
    - 408: No session

#### @app.route('/user/<id>', methods=['GET'])

* **Descripción**:
Regresa el usuario que su id hace match con el recibido en la url
* **URL**:
```python
'/user/<id>'
```
* **Verbos HTTP**:
    - GET
* **Headers**:

| Plugin | README |
| ------ | ------ |
| Content-Type | application/json |
| token | <token> |

* **Formato JSON de la respuesta**:
```json
{
    "_id":,
    "first_name",
    "last_name",
    "email",
    "read",
    "want_read",
    "recommendations",
    "currently_reading",
    "posts",
    "following"
}
```
* **Códigos de error**:
    - 404: Not found
    - 408: No session

#### @app.route('/user/<id>', methods=['DELETE'])

* **Descripción**:
Elimina usuario que su id hace match con el recibido en la url
* **URL**:
```python
'/user/<id>'
```
* **Verbos HTTP**:
    - DELETE
* **Headers**:

| Plugin | README |
| ------ | ------ |
| Content-Type | application/json |
| token | <token> |

* **Códigos de error**:
    - 404: Not found
    - 408: No session

#### @app.route('/get_users', methods=['POST'])

* **Descripción**:
Regresa todos los usuarios cuyo nombre hace match con el query obtenido
* **URL**:
```python
'/get_users'
```
* **Verbos HTTP**:
    - POST
* **Headers**:

| Plugin | README |
| ------ | ------ |
| Content-Type | application/json |
| token | <token> |
* **Formato JSON del cuerpo de la solicitud**: 
```json
{
    "query"
}
```
* **Formato JSON de la respuesta**:
Un array de objetos con el siguiente formato
```json
{
    "_id":,
    "first_name",
    "last_name",
    "email",
    "read",
    "want_read",
    "recommendations",
    "currently_reading",
    "posts",
    "following"
}
```
* **Códigos de error**:
    - 404: Not found
    - 500: Server error
    - 408: No session

#### @app.route('/get_books', methods=['POST'])

* **Descripción**:
Regresa todos los libros cuyo titulo hace match con el query obtenido
* **URL**:
```python
'/get_books'
```
* **Verbos HTTP**:
    - POST
* **Headers**:

| Plugin | README |
| ------ | ------ |
| Content-Type | application/json |
| token | <token> |
* **Formato JSON del cuerpo de la solicitud**: 
```json
{
    "query"
}
```
* **Formato JSON de la respuesta**:
```json
{
    "_id",
    "isbn",
    "text_reviews_count"",
    "series",
    "country_code",
    "language_code",
    "genre",
    "asin",
    "is_ebook",
    "average_rating",
    "kindle_asin",
    "similar_books",
    "description",
    "format",
    "link",
    "authors",
    "publisher",
    "num_pages",
    "publication_day",
    "isbn13",
    "publication_month",
    "edition_information",
    "publication_year",
    "url",
    "image_url",
    "book_id",
    "ratings_count",
    "work_id",
    "title",
    "title_without_series"
}
```
* **Códigos de error**:
    - 404: Not found
    - 408: No session

#### @app.route('/get_books', methods=['GET'])

* **Descripción**:
Devuelve todos los libros en la base de datos
* **URL**:
```python
'/get_books/<id>'
```
* **Verbos HTTP**:
    - GET
* **Headers**:

| Plugin | README |
| ------ | ------ |
| Content-Type | application/json |
| token | <token> |
* **Formato JSON de la respuesta**:
Un array de objetos con el siguiente formato:

```json
{
    "_id",
    "isbn",
    "text_reviews_count"",
    "series",
    "country_code",
    "language_code",
    "genre",
    "asin",
    "is_ebook",
    "average_rating",
    "kindle_asin",
    "similar_books",
    "description",
    "format",
    "link",
    "authors",
    "publisher",
    "num_pages",
    "publication_day",
    "isbn13",
    "publication_month",
    "edition_information",
    "publication_year",
    "url",
    "image_url",
    "book_id",
    "ratings_count",
    "work_id",
    "title",
    "title_without_series"
}
```
* **Códigos de error**:
    - 500: Server error
    - 408: No session

#### @app.route('/find_book/<id>', methods=['GET'])

* **Descripción**:
Devuelve el libro que matchea con el id obtenido en la url del GET request
* **URL**:
```python
'/find_book/<id>'
```
* **Verbos HTTP**:
    - GET
* **Headers**:

| Plugin | README |
| ------ | ------ |
| Content-Type | application/json |
| token | <token> |

* **Formato JSON de la respuesta**:
```json
{
    "_id",
    "isbn",
    "text_reviews_count"",
    "series",
    "country_code",
    "language_code",
    "genre",
    "asin",
    "is_ebook",
    "average_rating",
    "kindle_asin",
    "similar_books",
    "description",
    "format",
    "link",
    "authors",
    "publisher",
    "num_pages",
    "publication_day",
    "isbn13",
    "publication_month",
    "edition_information",
    "publication_year",
    "url",
    "image_url",
    "book_id",
    "ratings_count",
    "work_id",
    "title",
    "title_without_series"
}
```
* **Códigos de error**:
    - 404: Not found
    - 408: No session

#### @app.route('/getBooks/<genre>', methods=['GET'])
    
* **Descripción**:
Regresa todos los libros que matchean el genero dado en la url del GET request
* **URL**:
```python
'/get_books/<genre>'
```
* **Verbos HTTP**:
    - GET
* **Headers**:

| Plugin | README |
| ------ | ------ |
| Content-Type | application/json |
| token | <token> |
* **Formato JSON de la respuesta**:
Un array de objetos con el siguiente formato:
```json
{
    "_id",
    "isbn",
    "text_reviews_count"",
    "series",
    "country_code",
    "language_code",
    "genre",
    "asin",
    "is_ebook",
    "average_rating",
    "kindle_asin",
    "similar_books",
    "description",
    "format",
    "link",
    "authors",
    "publisher",
    "num_pages",
    "publication_day",
    "isbn13",
    "publication_month",
    "edition_information",
    "publication_year",
    "url",
    "image_url",
    "book_id",
    "ratings_count",
    "work_id",
    "title",
    "title_without_series"
}
```
* **Códigos de error**:
    - 404: Not found
    - 408: No session

#### @app.route('/get_authors', methods=['POST'])

* **Descripción**:
Regresa todos los libros cuyo autor matchea el query dado
* **URL**:
```python
'/get_auhtors'
```
* **Verbos HTTP**:
    - POST
* **Headers**:

| Plugin | README |
| ------ | ------ |
| Content-Type | application/json |
| token | <token> |
* **Formato JSON del cuerpo de la solicitud**: 
```json
{
    "query"
}
```
* **Formato JSON de la respuesta**:
Un array de objetos con el siguiente formato
```json
{
    "_id",
    "isbn",
    "text_reviews_count"",
    "series",
    "country_code",
    "language_code",
    "genre",
    "asin",
    "is_ebook",
    "average_rating",
    "kindle_asin",
    "similar_books",
    "description",
    "format",
    "link",
    "authors",
    "publisher",
    "num_pages",
    "publication_day",
    "isbn13",
    "publication_month",
    "edition_information",
    "publication_year",
    "url",
    "image_url",
    "book_id",
    "ratings_count",
    "work_id",
    "title",
    "title_without_series"
}
```
* **Códigos de error**:
    - 404: Not found
    - 408: No session

#### @app.route('/mybookshelves/<bookshelf>', methods=['GET'])

* **Descripción**:
Regresa todos los libros de un bookshelf del user que tiene el id igual que el token recibido
* **URL**:
```python
'/mybookshelves/<bookshelf>'
```
* **Verbos HTTP**:
    - GET
* **Headers**:

| Plugin | README |
| ------ | ------ |
| Content-Type | application/json |
| token | <token> |

* **Formato JSON de la respuesta**:
Un array de objetos con el siguiente formato:
```json
{
    "_id",
    "isbn",
    "text_reviews_count"",
    "series",
    "country_code",
    "language_code",
    "genre",
    "asin",
    "is_ebook",
    "average_rating",
    "kindle_asin",
    "similar_books",
    "description",
    "format",
    "link",
    "authors",
    "publisher",
    "num_pages",
    "publication_day",
    "isbn13",
    "publication_month",
    "edition_information",
    "publication_year",
    "url",
    "image_url",
    "book_id",
    "ratings_count",
    "work_id",
    "title",
    "title_without_series"
}
```
* **Códigos de error**:
    - 404: Not found
    - 408: No session

#### @app.route('/mybookshelf/<action>', methods=['POST'])

* **Descripción**:
Agrega o elimina un libro del bookshelf de un usuario
* **URL**:
```python
'/mybookshelf/<action>'
```
* **Verbos HTTP**:
    - POST
* **Headers**:

| Plugin | README |
| ------ | ------ |
| Content-Type | application/json |
| token | <token> |
* **Formato JSON del cuerpo de la solicitud**: 
```json
{
    "bookshelf",
    "book_id"
}
```
* **Códigos de error**:
    - 500: Server error
    - 408: No session

#### @app.route('/posts', methods=['GET'])

* **Descripción**:
Obtiene todos los post de todos los usuarios que esta siguiendo el usuario que tiene el mismo id que el token recibido
* **URL**:
```python
'/posts'
```
* **Verbos HTTP**:
    - GET
* **Headers**:

| Plugin | README |
| ------ | ------ |
| Content-Type | application/json |
| token | <token> |
* **Formato JSON de la respuesta**:
```json
{
    "user_id",
    "first_name",
    "last_name",
    "bookshelf",
    "date",
    "book_id",
    "book_img",
    "book_title",
    "authors",
    "rating"
}
```
* **Códigos de error**:
    - 404: Not found
    - 408: No session

#### @app.route('/follow', methods=['POST'])

* **Descripción**:
Agrega el id recibido al array de following de un usuario en la base de datos
* **URL**:
```python
'/follow'
```
* **Verbos HTTP**:
    - POST
* **Headers**:

| Plugin | README |
| ------ | ------ |
| Content-Type | application/json |
| token | <token> |
* **Formato JSON del cuerpo de la solicitud**: 
```json
{
    "following"
}
```
* **Códigos de error**:
    - 500: Server error
    - 408: No session

## 3.5 Pasos a seguir para utilizar el proyecto

*[Incluya aquí una guía paso a paso para poder utilizar el proyecto, desde la clonación del repositorio hasta el despliegue de la solución en una plataforma en la nube.]*

## 4. Referencias

*[Incluya aquí las referencias a sitios de interés, datasets y cualquier otra información que haya utilizado para realizar el proyecto y que le puedan ser de utilidad a otras personas que quieran usarlo como referencia]*
