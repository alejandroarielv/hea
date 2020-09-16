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


------------
--products--
------------
create table products (
    id int(7) not null auto_increment primary key not null,
    description varchar(200) not null,
    shortDescription varchar(100) not null,
    about varchar(500),
    sku varchar(15) not null,
    barCode varchar(12),
    contentQuantity dec(5, 2) not null,
    contentMeasurementUnitID int(6) not null,
    minimunStock int(6) not null,
    criticalStock int(6) not null,
    maximunStock int(6) not null,
    brandID int(6) not null,
    image varchar(300),
    enabledToBuy boolean default true not null,
    enabledToSell boolean default true not null,
    created timestamp default current_timestamp not null,

    INDEX (brandID),
    FOREIGN KEY (brandID) REFERENCES brands(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    FOREIGN KEY (contentMeasurementUnitID) REFERENCES measurementUnits(id) ON UPDATE CASCADE ON DELETE RESTRICT
);
describe products;

insert into products (description, shortDescription, about, sku, barCode, contentQuantity, contentMeasurementUnitID, minimunStock, criticalStock, maximunStock, brandID, image)
values ('Mermelada artesanal', 'Mermelada', 'Es una nueva linea', 'm12345678912345', '112345678912', 1, 1, 10, 5, 100, 1, '');


---------------------
--productAttributes--
---------------------
create table productAttributes (
    id int(6) not null auto_increment primary key not null,
    description varchar(30) not null,
    shortDescription varchar(20) not null,
    enabled boolean default true not null,
    created timestamp default current_timestamp
);
describe productAttributes;
insert into productAttributes (description, shortDescription) values ('Alto', 'Alto');
insert into productAttributes (description, shortDescription) values ('Ancho', 'Ancho');
insert into productAttributes (description, shortDescription) values ('Volumen', 'Volumen');


-----------------
--product_label--
-----------------
create table product_label (
    id int(7) not null auto_increment primary key not null,
    productID int(7) not null,
    labelID int(6) not null,
    created timestamp default current_timestamp not null,

    FOREIGN KEY (productID) REFERENCES products(id) ON UPDATE CASCADE ON DELETE RESTRICT
);
create UNIQUE INDEX productID_labelID ON product_label (productID, labelID);
describe product_label;


-------------------------
--product_shippingType--
-------------------------
create table product_shippingType (
    id int(7) not null auto_increment primary key not null,
    productID int(7) not null,
    shippingTypeID int(6) not null,
    created timestamp default current_timestamp not null,

    FOREIGN KEY (productID) REFERENCES products(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    FOREIGN KEY (shippingTypeID) REFERENCES shippingTypes(id) ON UPDATE CASCADE ON DELETE RESTRICT
);
create UNIQUE INDEX productID_ShippingTypeID ON product_shippingType (productID, shippingTypeID);
describe product_shippingType;


-------------------
--product_feature--
-------------------
create table product_feature (
    id int(7) not null auto_increment primary key not null,
    productID int(7) not null,
    productAttributeID int(6) not null,
    about varchar(50) not null,
    created timestamp default current_timestamp not null,

    INDEX (productID),
    FOREIGN KEY (productID) REFERENCES products(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    FOREIGN KEY (productAttributeID) REFERENCES productAttributes(id) ON UPDATE CASCADE ON DELETE RESTRICT
);
create UNIQUE INDEX productID_productAttributeID ON product_feature (productID, productAttributeID);
describe product_feature;



productvariants 
suppliers 
related products 
Frequently 
bought together 
priceLists 
receipts 
delivery 
orders 
stock 
wareshouses 
reglas de abastecimiento / reordering 
idiomas 
imageLists 
traceability 
dbdesigner
