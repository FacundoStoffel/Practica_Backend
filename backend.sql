create database backend;

create table persona
(
 dni INT,
 nombre VARCHAR(30) NOT NULL,
 apellido VARCHAR(30) NOT NULL,
 primary key (dni)
 );
 
create table usuario(
 mail VARCHAR(40), 
 nickname VARCHAR(20) NOT NULL,
 password VARCHAR(20) NOT NULL,
 primary key(mail)
 );