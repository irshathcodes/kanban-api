 # Api for Todo List
 


**Server:** Node, Express

**Database:** MongoDB


## API Reference

#### Register User

```http
  POST https://todo-list-crud-api.herokuapp.com/api/auth/register
```
#### request body
  {
    "name" : "your name",
    "email" : "name@gmail.com",
    "password" : "secret"
}

&nbsp;


#### Login User

```http
  POST https://todo-list-crud-api.herokuapp.com/api/auth/login
```

#### request body
  {
   "email" : "email@gmail.com",
   "password" : "secret"
   }

&nbsp;

**Note:** All the Requests Below should be sent along with JWT Token in authorization header. 




You should include this for all requests.
```
headers: {
    "Authorization" : "Bearer yourtoken",
}
```

&nbsp;


#### Get All Todo

```http
  GET https://todo-list-crud-api.herokuapp.com/api/todo
```

&nbsp;

#### Create Todo

```http
  POST https://todo-list-crud-api.herokuapp.com/api/todo
```
 #### request body 
  {
  "todoName" : "your todo"
  }

&nbsp;


#### Update Todo

```http
  PATCH https://todo-list-crud-api.herokuapp.com/api/todo/todoId

```
#### request body
  {
  "todoName" : "your updated todo",
  "completed" : true
  }


| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `todo ID` | `string` | **Required**. Todo ID |


&nbsp;

#### Delete Single Todo

```http
  DELETE https://todo-list-crud-api.herokuapp.com/api/todo/{todoId}
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `todo ID` | `string` | **Required**. Todo ID |


&nbsp;

#### Delete All Todo

```http
  DELETE https://todo-list-crud-api.herokuapp.com/api/todo
```

&nbsp;

#### Delete User and their data

```http
  DELETE https://todo-list-crud-api.herokuapp.com/api/todo/user/deleteAccount
```
