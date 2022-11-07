
# Kanban Api

A simple task manager api to keep track of your day-to-day tasks and complete them.

link to production server: [kanban api](kanban-board-api.up.railway.app)




## Tech Stack

Node, Express, MongoDB with Mongoose



## Documentation

[Documentation](https://kanban-board-api.up.railway.app/api-docs/)


## Features

- HTTP only cookie based authentication
- swagger api docs
- flexible schema


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`JWT_SECRET` - strong random string

`MONGO_URI` - mongodb connection string

`CLIENT_DOMAIN`- your frontend app url(eg: http://127.0.0.1:3000)

`COOKIE_SECRET` - strong random string

`EMAIL_USERNAME`
`EMAIL_PASSWORD` - your email credentials to send verification links

`NODE_ENV` - development or production


## License

[MIT](https://choosealicense.com/licenses/mit/)


## Feedback

If you have any feedback/suggestions, please reach out to me at [@irshathcodes](https://twitter.com/irshathcodes)

