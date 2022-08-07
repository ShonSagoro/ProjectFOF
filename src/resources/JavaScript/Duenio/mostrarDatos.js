const conexion=require('../../resources/JavaScript/Duenio/conexion/conectarDuenio.js');
import {Arbol, arrayDatos} from '../ArbolBinario/arbol.js';
const listaProducto=document.getElementById('listaProductos');
const listaPedidos=document.getElementById('listaPedidos');

let arbolPedidos=new Arbol();
let arbolProductos=new Arbol();
let cantidadTotalProductos=0;
let ganancia=0;

const agregarDatosArbolPedidos=()=>{
    let query=`SELECT * FROM Pedido`;
    conexion.query(query, (error, rows, fields)=>{
        if(error){
            throw error;
        }else{
            for(let i=0;i<rows.length;i++){
                if(rows[i].estado==='completado' || rows[i].estado==='Completado'){
                    arbolPedidos.add(rows[i].nombre_pedido, rows[i]);
                }
            }
            arbolPedidos.mostrar_InOrden();
            if(arrayDatos.length!==0){
                for(let i=0; i<arrayDatos.length;i++){
                    const productoR=document.createElement('div');
                    productoR.textContent=`Pedido de: ${arrayDatos[i].nombre_pedido}|| Costo: $${arrayDatos[i].precio}.00`;
                    listaPedidos.append(productoR);
                }
            }else{
                const productoR=document.createElement('div');
                productoR.textContent=`Sin pedidos realizados`;
                listaPedidos.append(productoR);
            }
            
        }

    });
}

const colocarDatosProductos=()=>{
    conexion.query(`SELECT * FROM Producto`,(error, rows, fields)=>{
        if(error){
            throw error;
        }else{
            arbolProductos.mostrar_InOrden();
            if(arrayDatos.length!==0){
                for(let i=0;i<arrayDatos.length;i++){
                    const productoR=document.createElement('div');
                    productoR.textContent=`Producto: ${arrayDatos[i].nombre}|| Cantidad: ${arrayDatos[i].cantidad}`;
                    listaProducto.append(productoR);
                }
            }else{
                const productoR=document.createElement('div');
                    productoR.textContent=`Sin productos vendidos`;
                    listaProducto.append(productoR);
            }
            
        }
    });
}
const agregarDatosArbolProductos=(producto)=>{
    for(let i=0;i<producto.length;i++){
        let cantidad=0;
        let query=`
        SELECT *
        FROM Pedido_producto
        INNER JOIN producto
        ON Pedido_producto.producto_id_producto=producto.id_producto
        INNER JOIN pedido
        ON Pedido_producto.pedido_id_pedido=pedido.id_pedido 
        WHERE nombre='${producto[i]}';
        `;
        conexion.query(query,(error, rows, fields)=>{
            if(error){
                throw error;
            }else{
                if(rows.length!==0){
                    for(let i=0;i<rows.length;i++){
                        if(rows[i].estado==='completado'){
                            cantidad+=parseInt(rows[i].cantidad_producto);  
                        }
                    }
                }
                
                let productoArbol={nombre:producto[i], cantidad: cantidad}
                arbolProductos.add(producto[i], productoArbol);
            }
        });
    }
    colocarDatosProductos();
    agregarCantidadProductos();
}

const agregarDatosProductoArray=()=>{
    let producto=[];
    let query=`SELECT * FROM Producto`;
    conexion.query(query,(error, rows, fields)=>{
        if(error){
            throw error;
        }else{
            for(let i=0;i<rows.length;i++){
                producto.push(rows[i].nombre);
            }
            agregarDatosArbolProductos(producto);
        }
    });
}

const agregarCantidadProductos=()=>{
    let query=`SELECT * FROM Producto`;
    conexion.query(query,(error, rows, fields)=>{
        if(error){
            throw error;
        }else{
            arbolProductos.mostrar_InOrden();
            if(arrayDatos.length!==0){
                for(let i=0;i<arrayDatos.length;i++){
                    cantidadTotalProductos+=parseInt(arrayDatos[i].cantidad);
                }
                document.getElementById('textCantidsadProducto').innerHTML=cantidadTotalProductos;
                cantidadTotalProductos=0;
            }else{
                document.getElementById('textCantidsadProducto').innerHTML=0;
            }
        }
    });
}

const agregarCantidadPedidos=()=>{
    let query=`SELECT * FROM Pedido`;
    conexion.query(query,(error, rows, fields)=>{
        if(error){
            throw error;    
        }else{
            let cantidadPedidos=0;
            for(let i=0;i<rows.length;i++){
                if(rows[i].estado==='completado'){
                    ganancia+=parseInt(rows[i].precio);
                    cantidadPedidos++;
                }
            }
            document.getElementById('textCantidadPedidos').innerHTML=parseInt(cantidadPedidos);
            document.getElementById('txtPrecioG').innerHTML=`$${ganancia}.00`;
            document.getElementById('txtGanancia').innerHTML=`$${ganancia}.00`;
            ganancia=0;
        }
    });
}

const obtenerfecha=()=>{
    let date=new Date();    
    let mes=date.getMonth();
    let dia=date.getDate();
    let year = date.getFullYear();
    document.getElementById('current_date').innerHTML=(dia + " de " + nombrarMeses[mes] + " del " + year);
}

const nombrarMeses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const mostrarPerfil=()=>{
    let usuario = localStorage.getItem('usuario').replace(/"/g, "");    //Quitar comillas para dejar solo el nombre del usuario
    document.getElementById('usuario').innerHTML=usuario;

}

const main=()=>{
    agregarDatosArbolPedidos();
    agregarDatosProductoArray();
    agregarCantidadPedidos(); 
    obtenerfecha();
    mostrarPerfil();
    
}

main();