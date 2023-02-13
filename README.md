# Project 3 API

Aaron Humphres, Carter Geile, and Isobel Morales

## Overview 

This API will allow the users of our react front-end application to CRUD boats and their reservations. 

This application uses token authentication instead of sessions. 

## Resources

### Boats

##### Routes Table

| Verb   | URI Pattern   | Controller#Action |
|--------|---------------|-------------------|
| GET    | `/boats`      | `boats#index`     |
| GET    | `/boats/:id`  | `boats#show`      |
| POST   | `/boats`      | `boats#create`    |
| PATCH  | `/boats/:id`  | `boats#update`    |
| DELETE | `/boats/:id`  | `boats#delete`    |

### Users

#### Routes Table

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| POST   | `/sign-up`             | `users#signup`    |
| POST   | `/sign-in`             | `users#signin`    |
| PATCH  | `/change-password/`    | `users#changepw`  |
| DELETE | `/sign-out/`           | `users#signout`   |

### Reservations

##### Routes Table

| Verb   | URI Pattern                             | Controller#Action       |
|--------|-----------------------------------------|-------------------------|
| POST   | `/reservations/:boatId`                 | `reservations#create`   |
| PATCH  | `/reservations/:boatId/:reservationId`  | `reservations#update`   |
| DELETE | `/reservations/:boatId/:reservationId`  | `reservations#delete`   |