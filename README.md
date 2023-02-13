# Project 3 API

Aaron Humphres, Carter Geile, and Isobel Morales

test change

## Overview

This API will allow the users of our react front-end application to CRUD boats and their boats.

This application uses token authentication instead of sessions.

## Routes

### Trips

| Verb   | URI Pattern   | Controller#Action |
|--------|---------------|-------------------|
| GET    | `/trips`      | `trips#index`     |
| GET    | `/trips/:id`  | `trips#show`      |
| POST   | `/trips`      | `trips#create`    |
| PATCH  | `/trips/:id`  | `trips#update`    |
| DELETE | `/trips/:id`  | `trips#delete`    |

### Boats

| Verb   | URI Pattern                | Controller#Action |
|--------|----------------------------|-------------------|
| GET    | `/boats/:tripId`           | `boats#index`     |
| GET    | `/boats/:boatId`           | `boats#show`      |
| POST   | `/boats/:tripId`           | `boats#create`    |
| PATCH  | `/boats/:tripId/:boatId`   | `boats#update`    |
| DELETE | `/boats/:tripId/:boatId`   | `boats#delete`    |

### Reviews

| Verb   | URI Pattern                   | Controller#Action |
|--------|-------------------------------|-------------------|
| POST   | `/reviews/:boatId`            | `reviews#create`  |
| PATCH  | `/reviews/:boatId/:reviewId`  | `reviews#update`  |
| DELETE | `/reviews/:boatId/:reviewId`  | `reviews#delete`  |

### Users

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| POST   | `/sign-up`             | `users#signup`    |
| POST   | `/sign-in`             | `users#signin`    |
| PATCH  | `/change-password/`    | `users#changepw`  |
| DELETE | `/sign-out/`           | `users#signout`   |
