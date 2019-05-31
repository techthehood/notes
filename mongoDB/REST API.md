# REST API

Representational State Transfer - Application Programming Interface (REST API or RESTful API)   

The Rest API - common/basic url structures

| Operation | HTTP Method | one |
| --- | --- | :---: |
| Create | POST /tasks ||
| Read | POST /tasks ||
| Read | POST /tasks/:id | * |
| Update | PATCH /tasks/:id | * |
| Delete | DELETE /tasks/:id | * |
 * = single resource

### Installing postman

[download from postman site](https://www.getpostman.com/downloads/)   
move to archive folder
```
  /version-control/nodejs/postman
```
double click to install/run
skip the login

#### using postman
1. choose request (or use the new btn)
2. request name: get weather
3. choose or save a collection : Weather App
4. save

type the url
```
  https://example.com/req/forecast?address=philadelphia
```
