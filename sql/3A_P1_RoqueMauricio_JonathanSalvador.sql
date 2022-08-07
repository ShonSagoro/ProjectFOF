/*
Roque Mauricio Martinez Castillo
Jonathan Salvador Gomez Roque
3A
*/

CREATE DATABASE IF NOT EXISTS Empresas;
USE Empresas;

DROP TABLE area_trabajo;
DROP TABLE duenio;
DROP TABLE empleado;
DROP TABLE empresa;
DROP TABLE industria;
DROP TABLE producto;
DROP TABLE producto_empresa;
DROP TABLE sistema_especializado;
DROP TABLE vicepresidente;

CREATE TABLE IF NOT EXISTS producto(
	id_producto INT NOT NULL auto_increment,
    nombre VARCHAR(255) NOT NULL,
    descripcion VARCHAR(255) NOT NULL,
    produccion INT NOT NULL,
    cant_ult_ventas INT NOT NULL,
	PRIMARY KEY(id_producto)
)ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS empresa(
	id_empresa INT NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    descripcion VARCHAR(255) NOT NULL,
    vision VARCHAR(255) NOT NULL,
    fecha_creacion DATE NOT NULL,
	PRIMARY KEY(id_empresa)
)ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS producto_empresa(
	productos_id_producto INT NOT NULL,
    empresas_id_empresa INT NOT NULL,
    PRIMARY KEY(productos_id_producto,empresas_id_empresa),
    CONSTRAINT fkempresas_id_empresa ##fkproducto_empresa_empresa
    FOREIGN KEY(empresas_id_empresa)
    REFERENCES empresa(id_empresa)
    on delete cascade
    on update cascade,
    CONSTRAINT fkproductos_id_producto ##fkproducto_empresa_producto
    FOREIGN KEY(productos_id_producto)
    REFERENCES producto(id_producto)
    on delete cascade
    on update cascade
)ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS industria(
	id_industria INT NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    ubicacion VARCHAR(255) NOT NULL,
    fecha_creacion DATE NOT NULL,
	empresa_id_empresas INT NOT NULL,
    duenio_id_duenios INT NOT NULL UNIQUE,
    PRIMARY KEY(id_industria),
    CONSTRAINT fkindustria_empresa
    FOREIGN KEY (empresa_id_empresas)
    REFERENCES empresa(id_empresa)
    on delete cascade
    on update cascade
)ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS area_trabajo(
	id_area_trabajo INT NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    descripcion VARCHAR(255),
    num_trabajadores INT NOT NULL,
    PRIMARY KEY(id_area_trabajo),
    industria_id_area INT NOT NULL,
    CONSTRAINT fkindustria_trabajo
    FOREIGN KEY (industria_id_area)
    REFERENCES industria(id_industria)
    on delete cascade
    on update cascade
)ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS sistema_especializado(
	id_sistema_especializado INT NOT NULL,
    nombre_del_sistema VARCHAR(255) NOT NULL,
    funcion_del_sistema VARCHAR(255),
    costo_del_sistema INT NOT NULL,
    PRIMARY KEY(id_sistema_especializado),
    id_area_de_trabajo INT NOT NULL,
    CONSTRAINT fkarea_de_trabajo
    FOREIGN KEY (id_area_de_trabajo)
    REFERENCES area_trabajo(id_area_trabajo)
    on delete cascade
    on update cascade
)ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS duenio(
	id_duenio INT NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    descripcion_puesto VARCHAR(255),
    salario INT NOT NULL,
    PRIMARY KEY(id_duenio),
    industria_id_area INT NOT NULL,
    CONSTRAINT fkindustria_areas
    FOREIGN KEY (industria_id_area)
    REFERENCES industria(id_industria)
    on delete cascade
    on update cascade
)ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS vicepresidente(
	id_vicepresidente INT NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    descripcion_puesto VARCHAR(255),
    salario INT NOT NULL,
    PRIMARY KEY(id_vicepresidente),
    duenio_id_nombre INT NOT NULL UNIQUE,
    CONSTRAINT fkduenio_id_nombre
    FOREIGN KEY (duenio_id_nombre)
    REFERENCES duenio(id_duenio)
    on delete cascade
    on update cascade
)ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS empleado(
	id_empleado INT NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    puesto VARCHAR(255) NOT NULL,
    descripcion_puesto VARCHAR(255),
    salario INT NOT NULL,
    PRIMARY KEY(id_empleado),
    duenio_id_nombre INT NOT NULL UNIQUE,
    CONSTRAINT fkempleado_id_duenio
    FOREIGN KEY (duenio_id_nombre)
    REFERENCES duenio(id_duenio)
    on delete cascade
    on update cascade
)ENGINE=INNODB;

INSERT INTO producto
VALUES('1','Coca-Cola',
'Bebida azucarada y carbonatada, popular entre familias mexicanas a la hora de comer',
'600','90000');
INSERT INTO producto
VALUES('2','Ketchup',
'Salsa de tomate azucarada, excelente para unos huevitos revueltos',
'420','30000');
INSERT INTO producto
VALUES('3','Fanta', 
'Bebida azucarada y carbonatada, popular por su buen sabor',
'500','40000');
INSERT INTO producto
VALUES('4','Manzanita sol',
'Bebida azucarada y carbonatada, sabor a manzana, ideal para desayunar',
'300','20000');

INSERT INTO empresa
VALUES('1','The Coca-Cola Company','Empresa fabricadora de las bebidas carbonatadas.',
'Formar parte de cada comida Mexicana','1892-08-02');

INSERT INTO empresa
VALUES('2','Pepsico','Empresa fabricadora de las bebidas carbonatadas y alimentos procesados.',
'Formar parte de las fiestas','1965-10-03');

INSERT INTO empresa
VALUES('3','Nestlé S.A.','Empresa líder a nivel mundial en Nutrición, Salud y Bienestar.',
'Ofrecer al mundo una opcion nutritiva','1866-01-08');

INSERT INTO empresa
VALUES('4','Kraft Heinz','Compañía estadounidense agroalimentaria; cuyo lema expresa que tiene "57 variedades" de salsa.',
'Ofrecer salsas de todos los tipos','1869-03-12');

INSERT INTO producto_empresa
VALUES('1','1');
INSERT INTO producto_empresa
VALUES('2','4');
INSERT INTO producto_empresa
VALUES('3','1');
INSERT INTO producto_empresa
VALUES('4','2');
##Nestlé S.A.

INSERT INTO industria
VALUES('1','Coca-cola company','Estados Unidos','1887-04-10','1','1');
INSERT INTO industria
VALUES('2','Coca-cola FEMSA','Mexico','1896-06-14','1','2');
INSERT INTO industria
VALUES('3','Pepsico','Argentina','1897-10-07','2','3');
INSERT INTO industria
VALUES('4','Nestle','Chile','1890-09-08','3','4');

INSERT INTO area_trabajo
VALUES('1','Embotellado','Zona donde se enbotellan las bebidas de coca cola','9','2');
INSERT INTO area_trabajo
VALUES('2','Limpieza','Zona donde se colocan los utensilios de limpieza','3','1');
INSERT INTO area_trabajo
VALUES('3','Control de calidad','Zona para verficar si un producto pasa todos los estandares de calidad','10','3');
INSERT INTO area_trabajo
VALUES('4','Purificadoras','filtran de agua que se recolecta','2','4');

INSERT INTO sistema_especializado
VALUES('22034','Repartidor de líquido','Reparte la cantidad establecida para cada botella dentro del envase','1000000','4');
INSERT INTO sistema_especializado
VALUES('22035','Embotellador','Crea las botellas o usa las ya recicladas para limpiar el producto y luego ser usada','3000000','1');
INSERT INTO sistema_especializado
VALUES('22036','Control de calidad','Verifica que tanto el envase y el líquido dentro de esta cumpla los estandares','4000000','3');
INSERT INTO sistema_especializado
VALUES('22037','Sellador','Sella el envase de plástico, lata o vidrio','2500000','2');

INSERT INTO duenio
VALUES('1','Ricardo Lopez','Persona que dirige y gestiona su propia empresa, asumiendo los riesgos del negocio como consecuencia de sus decisiones., ','300000','1');
INSERT INTO duenio
VALUES('2','Jonathan Gomez','Persona que dirige y gestiona su propia empresa, asumiendo los riesgos del negocio como consecuencia de sus decisiones.','300000','2');
INSERT INTO duenio
VALUES('3','Mauricio Castillo','Persona que dirige y gestiona su propia empresa, asumiendo los riesgos del negocio como consecuencia de sus decisiones.','300000','3');
INSERT INTO duenio
VALUES('4','Kristell Mateos','Persona que dirige y gestiona su propia empresa, asumiendo los riesgos del negocio como consecuencia de sus decisiones.','300000','4');

INSERT INTO vicepresidente
VALUES('1','Eczar Candelaria','Preside al presidente o dueño de la empresa, es uno de los cargos más importantes dentro de una empresa','150000','2');
INSERT INTO vicepresidente
VALUES('2','Paola Penagos','Preside al presidente o dueño de la empresa, es uno de los cargos más importantes dentro de una empresa','150000','1');
INSERT INTO vicepresidente
VALUES('3','Crescencio Perez','Preside al presidente o dueño de la empresa, es uno de los cargos más importantes dentro de una empresa','150000','3');
INSERT INTO vicepresidente
VALUES('4','Hiram Mendez','Preside al presidente o dueño de la empresa, es uno de los cargos más importantes dentro de una empresa','150000','4');

INSERT INTO empleado
VALUES('1','Claudia Flores','Gerente General','Definir a donde se va a dirigir la empresa en un corto, medio y largo plazo, entre otras muchas tareas','80000','2');
INSERT INTO empleado
VALUES('2','Marcos Jimenez','Jefe de Area','Responsable de cumplir las solicitudes de los superiores de la empresa. Tiene que cumplir los objetivos que se le plantean sobre determinadas areas y velar por satisfacer las demandas de la empresa','60000','1');
INSERT INTO empleado
VALUES('3','Andres Juarez','Contralor',' Funcionario encargado de supervisar las tareas contables de una empresa, incluidos los informes financieros y la gestion, tambien se encarga de supervisar el libro mayor, el plan de cuentas y otros estados financieros de una empresa','100000','3');
INSERT INTO empleado
VALUES('4','Pedro Fernández','Tesorero','Gestion de los fondos o el dinero y los movimientos monetarios de una empresa o entidad','80000','4');
/* Mostrar Datos	-- 213465 // 213469 --	*/
SELECT * FROM producto;
SELECT * FROM empresa;
SELECT * FROM producto_empresa;
SELECT * FROM industria;
SELECT * FROM area_trabajo;
SELECT * FROM duenio;
SELECT * FROM vicepresidente;
SELECT * FROM empleado;
SELECT * FROM sistema_especializa;

UPDATE  empresa SET id_empresa=10 WHERE id_empresa=4;

DELETE FROM empresa WHERE id_empresa=10;
use proyectointegrador_fof;
SELECT * FROM user;
use mysql;
##DELETE FROM user WHERE Host='%';
grant usage on ProyectoIntegrador_FOF.* to a_sesion_fof identified by '280303';
grant usage on ProyectoIntegrador_FOF.* to a_duenio_fof identified by '22702';
grant usage on ProyectoIntegrador_FOF.* to a_vendedor_fof identified by '33803';
grant usage on ProyectoIntegrador_FOF.* to a_cocinero_fof identified by '44904';
grant usage on ProyectoIntegrador_FOF.* to a_administrador_fof identified by '55005';

grant all privileges on ProyectoIntegrador_FOF.* to admin_duenio;





##Reparar tablas de usuarios
REPAIR TABLE mysql.global_priv;
REPAIR TABLE mysql.db;
##CREAR UN NUEVO USUARIO Y HACER CONSULTAS DE SELECT, ESE USUARIO SOLO TENDRA PERMISOS DE SELECT


CREATE OR REPLACE VIEW consulta_INNER_JOIN_productos AS SELECT *
FROM Pedido_producto
INNER JOIN producto
ON Pedido_producto.producto_id_producto=producto.id_producto;
    
CREATE OR REPLACE VIEW consulta_SELECT_pedido AS SELECT * FROM Pedido;

CREATE OR REPLACE VIEW consulta_SELECT_pedido AS SELECT * FROM Producto;
CREATE OR REPLACE VIEW consulta_SELECT_pedido AS SELECT * FROM Cuenta;
CREATE OR REPLACE VIEW consulta_SELECT_pedido AS SELECT * FROM Venta;

use proyectointegrador_fof;

## agregar usuario GRANT USAGE ON 
grant SELECT, INSERT on ProyectoIntegrador_FOF.* to a_sesion_fof;
grant SELECT,UPDATE,DELETE, INSERT on ProyectoIntegrador_FOF.* to a_administrador_fof;
grant SELECT, UPDATE on ProyectoIntegrador_FOF.* to a_cocinero_fof;
grant SELECT,UPDATE, INSERT on ProyectoIntegrador_FOF.* to a_duenio_fof;
grant SELECT,UPDATE,DELETE, INSERT on ProyectoIntegrador_FOF.* to a_vendedor_fof;



/*
Administrador

SELECT
UPDATE
DELETE
INSERT

Cocinero

SELECT
UPDATE

Dueño

SELECT
INSERT
UPDATE


Vendedor

SELECT
INSERT
UPDATE
DELETE

INICIO DE SESION y REGISTRO

SELECT
INSERT

*/

