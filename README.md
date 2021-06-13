# BookWorms
---
<div align="center">
    <img alt="Logo" src="./docs/images/logo.png" width="100%">
</div>

# 👾 Description

Bookworms is a book social network where users can share their book shelves. Users called bookworms can register or login to use the platform. They can edit their shelves, they can search for books by author or title or look around the Discover section where they'll find all the books available on the social network categorized by genre. They can add them to the shelf of their choice. These shelves can be viewed by their followers. As a bookworm, you have access to search for friends on the net to follow them and also see their bookshelves. Book shelves are categorized as:

 - Recommendations
 - Currently reading
 - Want to read
 - Read

When you enter to see more information about a book you can see its title, author, rating, description, more books by author, and genre, Also, there are 4 buttons which are responsible for adding/removing the book to/from each shelve.

---
# 🚀 How to run 
    
First you need to make sure you have installed [Docker](https://docs.docker.com/engine/install/) and run it.
    
Then clone the repo and change to the directory of the project:
```ssh
git clone git@github.com:saulmontesdeoca/bookworms.git
cd bookworms
```

You can do it 2 ways:
1. Docker-compose

```ssh
docker-compose up -d
```

Now open a browser and head to **'localhost:80'**.
    
2. Minikube

Make sure you have installed [Minikube](https://minikube.sigs.k8s.io/docs/start/) and [Kubectl](https://kubernetes.io/es/docs/tasks/tools/install-kubectl/).

```ssh
minikube start
eval $(minikube docker-env)
kubectl apply -f api-claim0-persistentvolumeclaim.yaml,api-deployment.yaml,client-claim0-persistentvolumeclaim.yaml,client-deployment.yaml,lb-backend-claim0-persistentvolumeclaim.yaml,lb-backend-deployment.yaml,lb-backend-service.yaml,lb-frontend-claim0-persistentvolumeclaim.yaml,lb-frontend-deployment.yaml,lb-frontend-service.yaml,node-modules-persistentvolumeclaim.yaml
kubectl service lb-frontend
```

# 💾 Databases

- In MongoDB there are 2 collections: users and books.
- Database schema: embedding.
- Authors are embedded in the documents of the books collection and the posts are embedded in the documents of the users collection. 
- Bookworms:

<div align="center">
    <img alt="Logo" src="./docs/images/users_schema.png" width="70%">
</div>

- Books:

<div align="center">
    <img alt="Logo" src="./docs/images/books_schema.png" width="70%">
</div>


# 🏛 Architecture

Structured in layers, there is the frontend and backend layers which are managed by load balancers. Each layer is in a docker container. The databases used are clusters in RedisLabs and MongoDB Atlas. This way, a modular and scalable solution with redundancy and high availability can be achieved

<div align="center">
    <img alt="Logo" src="./docs/images/Arquitectura.png" width="100%">
</div>


# 🎨 Frontend

Folder structure:

```
- bookworms/
    - public/
    - src/
        - auth/
            - Auht
        - components/
            - BookCarousel
            - BookCover
            - BookInfoHeader
            - BookshelfCard
            - BookshelfResume
            - DicoverCarousel
            - FeedCarousel
            - FeedCarouselBook
            - FollowingCard
            - Layout
            - LoginForm
            - LoginLayout
            - Nav
            - PageCover
            - PostCard
            - ProfileCover
            - SearchCard
            - SearchCover
            SearchResult
            - SigninForm
            - UserCard
        - pages/
            - BookDetails
            - Discover
            - Home
            - Login
            - MyBooks
            - Profile
            - Search
            - Signin
        -routing/
            - PublicRoute
            - PrivateRoute
        - App.js
        - index.css
        - index.js
```
