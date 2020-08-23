create database HEA;

use HEA;
----------
--labels--
----------
create table labels (
    id int(6) not null auto_increment primary key not null,
    description varchar(30) not null,
    shortDescription varchar(20) not null,
    image varchar(300) not null,
    enabled boolean default true not null,
    created timestamp default current_timestamp
);

describe labels;
insert into labels (description, shortDescription, image) values ('Wines', 'Wines', '');


--------------------
--measurementUnits--
--------------------
create table measurementUnits (
    id int(6) not null auto_increment primary key not null,
    description varchar(30) not null,
    shortDescription varchar(20) not null,
    enabled boolean default true not null,
    created timestamp default current_timestamp
);

describe measurementUnits;
insert into measurementUnits (description, shortDescription) values ('CMS', 'CMS');

-----------------
--shippingTypes--
-----------------
create table shippingTypes (
    id int(6) not null auto_increment primary key not null,
    description varchar(30) not null,
    shortDescription varchar(20) not null,
    enabled boolean default true not null,
    created timestamp default current_timestamp
);

describe shippingTypes;
insert into shippingTypes (description, shortDescription) values ('Mercado envío', 'ME');

----------
--brands--
----------
create table brands (
    id int(6) not null auto_increment primary key not null,
    description varchar(30) not null,
    shortDescription varchar(20) not null,
    enabled boolean default true not null,
    created timestamp default current_timestamp
);

describe brands;
insert into brands (description, shortDescription) values ('Bodega López', 'Bodega López');


--PRODUCTS--
create table products (
    id int(7) not null auto_increment primary key not null,
    description varchar(200) not null,
    shortDescription varchar(100) not null,
    about varchar(500),
    sku varchar(15) not null,
    barCode int(12),
    minimunStock int(6),
    criticalStock int(6),
    maximunStock int(6),
    brandID int(6) not null,
    image varchar(300) not null,
    enabled boolean default true not null,
    created timestamp default current_timestamp,

    INDEX (brandID),
    FOREIGN KEY (brandID) REFERENCES brands(id) ON UPDATE CASCADE ON DELETE RESTRICT
);
describe products;

insert into products (description, shortDescription, about, sku, barCode, minimunStock, criticalStock, maximunStock, brandID, image ) 
values ('Vino cabernet', 'Cabernet', 'about', '', 0, 10, 5, 100, 1, '');


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