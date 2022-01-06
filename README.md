 # Api for Todo List
 


**Server:** Node, Express

**Database:** MongoDB


## API Reference

## Register User

 method: POST

```http
https://todo-list-crud-api.herokuapp.com/api/auth/register
```

#### request body
  {
    "name" : "your name",
    "email" : "name@gmail.com",
    "password" : "secret"
}

&nbsp;


## Login User

method: POST

```http
https://todo-list-crud-api.herokuapp.com/api/auth/login
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


## Get All Todo

method: GET

```http
https://todo-list-crud-api.herokuapp.com/api/todo
```

&nbsp;

#### Create Todo

method: POST

```http
https://todo-list-crud-api.herokuapp.com/api/todo
```
 #### request body 
  {
  "todoName" : "your todo"
  }

&nbsp;


## Update Todo

method: PATCH

```http
https://todo-list-crud-api.herokuapp.com/api/todo/todoId

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

## Delete Single Todo

method: DELETE

```http
https://todo-list-crud-api.herokuapp.com/api/todo/{todoId}
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `todo ID` | `string` | **Required**. Todo ID |


&nbsp;

## Delete All Todo

method: DELETE

```http
https://todo-list-crud-api.herokuapp.com/api/todo
```

&nbsp;

##  Delete User and their data

method: DELETE

```http
https://todo-list-crud-api.herokuapp.com/api/todo/user/deleteAccount
```
