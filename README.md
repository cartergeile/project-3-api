# Project 3 API

Aaron Humphres, Carter Geile, and Isobel Morales

## Overview 

This API will allow the users of our react front-end application to CRUD boats and their reservations. 

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
    reservations: [reservationSchema],
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

Reservation: {
    rate: {
        type: Number
    },
    date: {
        type: Date
    },
    duration: {
        type: Number
    },
    weather: {
        type: String
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

### Reservations

| Verb   | URI Pattern                             | Controller#Action       |
|--------|-----------------------------------------|-------------------------|
| POST   | `/reservations/:boatId`                 | `reservations#create`   |
| PATCH  | `/reservations/:boatId/:reservationId`  | `reservations#update`   |
| DELETE | `/reservations/:boatId/:reservationId`  | `reservations#delete`   |