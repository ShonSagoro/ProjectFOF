CREATE DATABASE IF NOT EXISTS ProyectoIntegrador_FOF;
Drop database ProyectoIntegrador_Producto;
use ProyectoIntegrador_FOF;
DROP TABLE Producto;
CREATE TABLE IF NOT EXISTS Producto(
    id_producto INT NOT NULL auto_increment,
    nombre VARCHAR(50) NOT NULL,
    descripcion VARCHAR(250) NOT NULL,
    costo int,
	PRIMARY KEY (id_producto)  
) ENGINE = INNODB;
DROP TABLE Cuenta;
CREATE TABLE IF NOT EXISTS Cuenta(
    id_cuenta INT NOT NULL auto_increment,
    usuario VARCHAR(50) NOT NULL,
    cuenta VARCHAR(70) NOT NULL,
    contraseña VARCHAR(20) NOT NULL,
    rol VARCHAR(15) NOT NULL,
    ubicacion VARCHAR(250),
	PRIMARY KEY (id_cuenta)  
) ENGINE = INNODB;

Drop Table Pedido;
Drop Table Pedido_Producto;

CREATE TABLE IF NOT EXISTS Pedido(
    id_pedido  INT NOT NULL auto_increment,
    nombre_pedido VARCHAR(30) NOT NULL,
    precio INT NOT NULL,
    estado VARCHAR(20) NOT NULL,
	ubicacion VARCHAR(200) NOT NULL,
	PRIMARY KEY (id_pedido)
) ENGINE = INNODB;

CREATE TABLE IF NOT EXISTS Venta(
    id_venta  INT NOT NULL auto_increment,
    ganancia INT NOT NULL,
    fecha DATE NOT NULL unique,
	PRIMARY KEY (id_venta)
) ENGINE = INNODB;

use proyectointegrador_fof;
DROP TABLE Venta;
DROP TABLE Punto_venta;

CREATE TABLE IF NOT EXISTS Pedido_Producto(
	producto_id_producto INT NOT NULL,
    pedido_id_pedido INT NOT NULL,
    cantidad_producto INT NOT NULL,
    PRIMARY KEY(producto_id_producto,pedido_id_pedido),
    CONSTRAINT fkpedido_producto_pedido
    FOREIGN KEY(producto_id_producto)
    REFERENCES Producto(id_producto)
    on delete cascade
    on update cascade,
    CONSTRAINT fkpedido_producto_producto
    FOREIGN KEY(pedido_id_pedido)
    REFERENCES Pedido(id_pedido)
    on delete cascade
    on update cascade
)ENGINE = INNODB;

##para saber si es vendedor el script verificara antes.

/*
	producto_id_producto INT NOT NULL,
    pedido_id_pedido INT NOT NULL,
    cantidad_producto INT NOT NULL,
    PRIMARY KEY(producto_id_producto,pedido_id_pedido),
    CONSTRAINT fkpedido_producto_pedido ##fkproducto_empresa_empresa
    FOREIGN KEY(producto_id_producto)
    REFERENCES Producto(id_producto)
    CONSTRAINT fkpedido_producto_producto ##fkproducto_empresa_producto
    FOREIGN KEY(pedido_id_pedido)
    REFERENCES Pedido(id_pedido)
*/
SELECT * FROM Pedido_Producto;
INSERT INTO Pedido_Producto VALUES ('2','1','3');
INSERT INTO Pedido_Producto VALUES ('3','2','2');
INSERT INTO Pedido_Producto VALUES ('2','3','1');
INSERT INTO Pedido_Producto VALUES ('9','4','4');

INSERT INTO Pedido VALUES(0, 'Maria', '70', 'Pendiente', 'Col. Benito Juarez, 147');
INSERT INTO Pedido VALUES(0, 'Juan', '160', 'Completado', 'Col. Benito Juarez, 147');
INSERT INTO Pedido VALUES(0, 'Roque', '40', 'Preparandose', 'Col. Benito Juarez, 147');
INSERT INTO Pedido VALUES(0, 'Aylin', '10', 'Pendiente', 'Col. Benito Juarez, 147');

INSERT INTO Cuenta VALUES(0, 'admin', 'Shon@gmail.com', 'root', 'Encargado',null);
INSERT INTO Cuenta VALUES(0, 'Kristell', 'Kristell@gmail.com', '22709', 'Cocinero','AV. INDEPENDENCIA NO. 1282-A');
INSERT INTO Cuenta VALUES(0, 'Juan', 'Juan@gmail.com', '52300', 'Dueño',null);
INSERT INTO Cuenta VALUES(0, 'Gerardo', 'Gerardo@gmail.com', '93379', 'Vendedor', 'AV. 20 DE NOVIEMBRE NO 1053');
INSERT INTO Cuenta VALUES(0, 'Jose', 'Jose@gmail.com', '93379', 'Vendedor','CALLE MATAMOROS NO.280');
INSERT INTO Cuenta VALUES(0, 'Pedro', 'Pedro@gmail.com', '93379', 'Vendedor','AV. 5 DE MAYO NO. 1652');

SELECT * FROM Cuenta;
insert into Producto values (0,'Banderilla','Banderilla mitad cheddar mitad salchicha, muy rico','25');
insert into Producto values (0,'Torta de cochito','Torta con jamon, queso, sus verduras y cochito','25');
insert into Producto values (0,'Torta de cochinita pibil','Torta con jamon, queso, sus verduras, rajas y cochinita pibil','30');
insert into Producto values (0,'Choco-Flan','Un pastel imposible, donde la base es pastel de chocolate y la copa es de flan','12');

delete from Pedido where id_pedido='1';
SELECT *
        FROM Pedido_producto
        INNER JOIN producto
        ON Pedido_producto.producto_id_producto=producto.id_producto;
##UPDATE Producto SET descripcion='Banderila mitad cheddar mitad salchicha, muy rico', costo='25' WHERE id_producto= '1';
UPDATE Venta SET ganancia='600' WHERE fecha='2022-12-23';
INSERT INTO Venta VALUES(0,'500','2022-12-23');
select * from Producto;
select * from Cuenta;
select * from Venta; 	
SELECT * FROM Pedido_producto;
use proyectointegrador_fof;	 
select * from Pedido_producto;
SELECT * FROM pedido;
use proyectointegrador_fof;
SELECT *
FROM Pedido_productoproducto
INNER JOIN producto
ON Pedido_producto.producto_id_producto=producto.id_producto
INNER JOIN pedido
ON Pedido_producto.pedido_id_pedido=pedido.id_pedido WHERE nombre='Pizza';
SELECT *
FROM Pedido_producto
INNER JOIN pedido
ON Pedido_producto.pedido_id_pedido=pedido.id_pedido;

SELECT *
FROM Pedido_producto
INNER JOIN pedido ON Pedido_producto.pedido_id_pedido=pedido.id_pedido 
INNER JOIN producto ON Pedido_producto.producto_id_producto=producto.id_producto
WHERE producto.id_producto='1';

SELECT *
FROM Pedido_producto
    INNER JOIN Producto
    ON Pedido_producto.producto_id_producto=producto.id_producto WHERE pedido_id_pedido='3';
    
SELECT *
FROM Pedido_producto
INNER JOIN Producto
ON Pedido_producto.producto_id_producto=Producto.id_producto WHERE producto_id_producto='2';

SELECT * FROM pedido;
UPDATE Pedido SET estado='pendiente' WHERE id_pedido='20';
UPDATE Pedido SET estado='pendiente' WHERE id_pedido='2';
UPDATE Pedido SET estado='pendiente' WHERE id_pedido='3';
SELECT * FROM producto;
SELECT * FROM Pedido;
SELECT * FROM Pedido_producto;
SELECT *
FROM Pedido_producto
INNER JOIN Pedido
ON Pedido.id_pedido=Pedido_producto.pedido_id_pedido WHERE id_pedido='1';



select * from Cuenta WHERE usuario='Gerardo' and rol='Vendedor';

delete from Pedido Where id_pedido='9';

/*
id_punto_venta  INT NOT NULL auto_increment,
	nombre_vendedor VARCHAR(20) NOT NULL,
	ubicacion VARCHAR(200) NOT NULL,
    cuenta_vendedor_id INT NOT NULL,
*/