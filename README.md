# Project 3 API

Aaron Humphres, Carter Geile, and Isobel Morales

test change

## Overview 

This API will allow the users of our react front-end application to CRUD boats and their reviews. 

This application uses token authentication instead of sessions. 

## Models/Schemas
```
Boat: {
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    type: {
        type: ,
        required: true
    },
    image: {
        type: String
    },
    weather: {
        type: enum
    },
    reviews: [reviewSchema],
    owner: {
        type: monggose.Schema.Types.ObjectId,
        ref: 'User'
    }
}

user: {
    {
		email: {
			type: String,
			required: true,
			unique: true,
		},
		hashedPassword: {
			type: String,
			required: true,
		},
		token: String,
	},
	{
		timestamps: true,
		toObject: {
			transform: (_doc, user) => {
				delete user.hashedPassword
				return user
			},
		},
	}
}

Review: {
   note: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    } 
}
```

## Routes

### Boats

| Verb   | URI Pattern   | Controller#Action |
|--------|---------------|-------------------|
| GET    | `/boats`      | `boats#index`     |
| GET    | `/boats/:id`  | `boats#show`      |
| POST   | `/boats`      | `boats#create`    |
| PATCH  | `/boats/:id`  | `boats#update`    |
| DELETE | `/boats/:id`  | `boats#delete`    |

### Users

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| POST   | `/sign-up`             | `users#signup`    |
| POST   | `/sign-in`             | `users#signin`    |
| PATCH  | `/change-password/`    | `users#changepw`  |
| DELETE | `/sign-out/`           | `users#signout`   |

### Reviews

| Verb   | URI Pattern                   | Controller#Action  |
|--------|-------------------------------|--------------------|
| POST   | `/reviews/:boatId`            | `reviews#create`   |
| PATCH  | `/reviews/:boatId/:reviewId`  | `reviews#update`   |
| DELETE | `/reviews/:boatId/:reviewId`  | `reviews#delete`   |