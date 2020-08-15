create database HEA;

use HEA;

--labels--
create table labels (
    id int(6) not null auto_increment primary key not null,
    description varchar(20) not null,
    shortDescription varchar(10) not null,
    image varchar(300) not null,
    enabled boolean default true not null,
    created timestamp default current_timestamp
);
describe labels;
insert into labels (description, shortDescription, image) values ('Wines', 'Wines', '');


--weightUnits--
create table weightUnits (
    id int(6) not null auto_increment primary key not null,
    description varchar(20) not null,
    shortDescription varchar(10) not null,
    enabled boolean default true not null,
    created timestamp default current_timestamp
);
describe weightUnits;
insert into weightUnits (description, shortDescription) values ('KG', 'KG');

--measurementUnits--
create table measurementUnits (
    id int(6) not null auto_increment primary key not null,
    description varchar(20) not null,
    shortDescription varchar(10) not null,
    enabled boolean default true not null,
    created timestamp default current_timestamp
);
describe measurementUnits;
insert into measurementUnits (description, shortDescription) values ('CMS', 'CMS');

--shippingTypes--
create table shippingTypes (
    id int(6) not null auto_increment primary key not null,
    description varchar(20) not null,
    shortDescription varchar(10) not null,
    enabled boolean default true not null,
    created timestamp default current_timestamp
);
describe shippingTypes;
insert into shippingTypes (description, shortDescription) values ('Mercado envío', 'ME');








--PRODUCTS--
create table products (
    id int(6) not null auto_increment primary key not null,
    description varchar(100) not null,
    shortDescription varchar(50) not null,
    sku varchar(15) not null,
    size varchar(300) not null,
    image varchar(300) not null,
    enabled boolean default true not null,
    created timestamp default current_timestamp
);
describe labels;
insert into labels (description, shortDescription, image) values ('Wines', 'Wines', '');

weightUnits
measurementUnits
shippingTypes

dimensions table
    measurementUnitID
    value
    shapeID

Tipo de presentacion (Flavor, etc)
related products
Frequently bought together

id
SKU
description
shortDescription
about
Sizes (Pack Unit)
shippingTypeID
weightUnitID
manufacturer
Minimun stock


