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

insert into
    labels (description, shortDescription, image)
values
    ('Wines', 'Wines', '');

--brands--
create table brands (
    id int(6) not null auto_increment primary key not null,
    description varchar(20) not null,
    shortDescription varchar(10) not null,
    enabled boolean default true not null,
    created timestamp default current_timestamp
);

describe brands;

insert into
    brands (description, shortDescription)
values
    ('KG', 'KG');

--measurementUnits--
create table measurementUnits (
    id int(6) not null auto_increment primary key not null,
    description varchar(20) not null,
    shortDescription varchar(10) not null,
    enabled boolean default true not null,
    created timestamp default current_timestamp
);

describe measurementUnits;

insert into
    measurementUnits (description, shortDescription)
values
    ('CMS', 'CMS');

--shippingTypes--
create table shippingTypes (
    id int(6) not null auto_increment primary key not null,
    description varchar(20) not null,
    shortDescription varchar(10) not null,
    enabled boolean default true not null,
    created timestamp default current_timestamp
);

describe shippingTypes;

insert into
    shippingTypes (description, shortDescription)
values
    ('Mercado envío', 'ME');

--brands--
create table brands (
    id int(6) not null auto_increment primary key not null,
    description varchar(20) not null,
    shortDescription varchar(10) not null,
    enabled boolean default true not null,
    created timestamp default current_timestamp
);

describe brands;

insert into
    brands (description, shortDescription)
values
    ('Bodega López', 'Bodega López');






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
describe products;

id
description 
shortDescription 
about
sku
barCode
minimunStock
criticalStock
maximunStock
brandID

productMeasurements
    id  attribute - quantity - measurementUnit
    1   pack        6          units
    2   hight       30         cms
    3   weight      30         grs
    4   capacity    1          lts

measurementUnit (lts, grms, cms)

productShippingTypes


productvariants att type
suppliers 

related products 
Frequently bought together 
priceLists

receipts
delivery orders
stock wareshouses

reglas de abastecimiento / reordering
idiomas
imageLists
traceability
dbdesigner