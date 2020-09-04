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
--PRODUCTS--
------------
create table products (
    id int(7) not null auto_increment primary key not null,
    description varchar(200) not null,
    shortDescription varchar(100) not null,
    about varchar(500),
    sku varchar(15) not null,
    barCode varchar(12),
    minimunStock int(6) not null,
    criticalStock int(6) not null,
    maximunStock int(6) not null,
    brandID int(6) not null,
    image varchar(300),
    enabled boolean default true not null,
    created timestamp default current_timestamp not null,

    INDEX (brandID),
    FOREIGN KEY (brandID) REFERENCES brands(id) ON UPDATE CASCADE ON DELETE RESTRICT
);
describe products;

insert into products (description, shortDescription, about, sku, barCode, minimunStock, criticalStock, maximunStock, brandID, image ) 
values ('Mermelada artesanal', 'Mermelada', 'Es una nueva linea', 'm12345678912345', '112345678912', 10, 5, 100, 1, '');

insert into products (description, shortDescription, about, sku, barCode, minimunStock, criticalStock, maximunStock, brandID, image ) 
values ('Vino artesanal', 'Vino artesanal', 'Es una nueva linea', 'V12345678912345', '112345678912', 10, 5, 100, 1, '');


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
insert into productAttributes (description, shortDescription) values ('Pack', 'Pack');
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

    INDEX (productID),
    FOREIGN KEY (productID) REFERENCES products(id) ON UPDATE CASCADE ON DELETE RESTRICT);

create UNIQUE INDEX productID_labelID
ON product_label (productID, labelID);
describe product_label;








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





SELECT 
    p.*, 
    JSON_OBJECT('id', id, 'project_name', project_name, 'parent_id', parent_id) js
FROM tbl_projects p;


SELECT JSON_OBJECT('projects', JSON_ARRAYAGG(js)) results
FROM (
	SELECT JSON_OBJECT(
		'id', p.id, 
		'project_name', p.project_name, 
		'parent_id', p.parent_id,
		'children', JSON_ARRAYAGG(
			JSON_OBJECT(
				'id', p1.id, 
				'project_name', p1.project_name, 
				'parent_id', p1.parent_id
			)
		)
	) js
	FROM tbl_projects p
	LEFT JOIN tbl_projects p1 ON p.id = p1.parent_id
	WHERE p.parent_id = 0
	GROUP BY p.id, p.project_name, p.parent_id
) x



SELECT JSON_OBJECT(
    "id", p.id,
    "desc", p.description,
    "brand", JSON_OBJECT(b.id, b.description)) as product
FROM products as p JOIN brands as b ON p.brandID=b.id;