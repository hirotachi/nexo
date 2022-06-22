create table if not exists users (
    id int auto_increment primary key,
    email varchar(255) unique,
    headline varchar(255),
    password varchar(255),
    name varchar(255),
    socials json,
    avatar varchar(255),
    role enum('user', 'admin', 'contributor'),
    description longtext
)