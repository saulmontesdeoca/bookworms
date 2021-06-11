# Bases de datos
## MongoDB
Para establecer la base de datos de MongoDB necesitas:

1. Crear un cluster en MongoDB Atlas.
2. Sacar usuario y constraseña de administrador.
3. Poner tu IP en Atlas con permiso de acceder a hacer operaciones en clúster.
4. Deberas tambien de descargar MongoDB Compass.
5. Acceder al cluster usando el string mongo+srv.
6. Por último, crear la base de datos 'bookworms', la colección 'books' e importar el file que esta en esta carpeta llamado books.json en la base de datos.

## Redis
Para redis solo hace falta crear tu cuenta en la plataforma y crear un cluster, [aquí](https://redislabs.com/try-free/).

## Nota
Tendrás que cambiar las líneas de conexión a estas bases de datos que se encuentran en el archivo api/app.py.
