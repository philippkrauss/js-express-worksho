# Section 2: Simple CRUD

## send CRUD requests

### list users
`curl http://localhost:3000/users`

### get user 1
`curl http://localhost:3000/users/1`

### create new user
`curl -X POST localhost:3000/users -H "Content-Type: application/json" -d '{"user": {"id": 6, "name":"new user","email":"new@user.de"}}'`

### update user 7
`curl -X PUT localhost:3000/users -H "Content-Type: application/json" -d '{"user": {"id": 6, "name":"new user","email":"new@user.de"}}'`

### delete user 1
`curl -X DELETE http://localhost:3000/users/1`
