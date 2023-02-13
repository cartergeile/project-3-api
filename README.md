# Project 3 API

Aaron Humphres, Carter Geile, and Isobel Morales

## Overview 

This API will allow the users of our react front-end application to CRUD boats and their boats. 

This application uses token authentication instead of sessions. 

## Models/Schemas
```
Trip: {
    location: {
        type: String,
        enum: ['Mediterranean', 'Caribbean', 'Indian Ocean', 'Antarctica', 'Far East', 'Mississippi River' ],
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    boats: [boatSchema],
    owner: {
        type: monggose.Schema.Types.ObjectId,
        ref: 'User'
    }
}

Boat: {
    name: {
        type: String,
        required: true
    },
    captain: {
        type: String,
        required: true
    },
    passengerCapacity: {
        type: Number,
        required: true
    },
    length: {
        type: Number,
        required: true
    },
    petsAllowed: {
        type: Boolean,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
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
```

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

| Verb   | URI Pattern               | Controller#Action |
|--------|---------------------------|-------------------|
| POST   | `/boats/:tripId`          | `boats#create`    |
| PATCH  | `/boats/:tripId/:boatId`  | `boats#update`    |
| DELETE | `/boats/:tripId/:boatId`  | `boats#delete`    |

### Users

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| POST   | `/sign-up`             | `users#signup`    |
| POST   | `/sign-in`             | `users#signin`    |
| PATCH  | `/change-password/`    | `users#changepw`  |
| DELETE | `/sign-out/`           | `users#signout`   |