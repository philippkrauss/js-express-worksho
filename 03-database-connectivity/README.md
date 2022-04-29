# Section 3: Database Connectivity

## run mysql in docker
To run a mysql database in your local docker environment, execute the following commands:

```
docker run --name some-mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -p 3306:3306 -d mysql:latest
//wait a bit for the DB to initialize
//if you like, you can check using 
//docker logs -f some-mysql
docker exec -it some-mysql bash
mysql -uroot -p"$MYSQL_ROOT_PASSWORD"
```
now, paste the contents of dbsetup.sql to create DB, tables and test data


