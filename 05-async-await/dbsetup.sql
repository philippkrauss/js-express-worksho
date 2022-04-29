create database workshop;
use workshop;
CREATE TABLE IF NOT EXISTS users (
    id int(11) NOT NULL,
    name varchar(200) NOT NULL,
    email varchar(200) NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
  ALTER TABLE users ADD PRIMARY KEY (id);
  ALTER TABLE users MODIFY id int(11) NOT NULL AUTO_INCREMENT;

INSERT INTO users (id, name, email) VALUES
  (1, 'Test', 'test@a.bc'),
  (2, 'John', 'john@a.bc'),
  (3, 'Philipp', 'philipp@x.yz'),
  (4, 'Alex', 'alex@b.cd'),
  (5, 'Sandra', 'sandra@c.de');

select * from users;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'my-secret-pw';
ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'my-secret-pw';
flush privileges;
