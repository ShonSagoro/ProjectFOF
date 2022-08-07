const conexion=require('../../resources/JavaScript/Cocinero/conexion/conectarCocinero.js');
import {Arbol, arrayDatos} from '../ArbolBinario/arbol.js';
const lista=document.querySelector('#orden_pedido');
let arbolPedidos=new Arbol();


//actualizar arbol
const cargarPedido=()=>{
    conexion.query(`SELECT * FROM Pedido`,(error, rows, fields)=>{
        if(error){
            throw error;
        }else{
            let long=rows.length;
            for(let i=0;i<long;i++){
                //los pedidos no deben estar completos y deben existir
                if(arbolPedidos.buscar_dato(rows[i].nombre_pedido)===null && rows[i].estado!=='completado'){
                  arbolPedidos.add(rows[i].nombre_pedido,rows[i]);
                  //y si hay pedido completados pues que los guarde de una vez
                }
            }
        }
    });
    //actualizar los datos cada 5 minutos
    setInterval(() => {
        conexion.query(`SELECT * FROM Pedido`,(error, rows, fields)=>{
            if(error){
                throw error;
            }else{
                let long=rows.length;
                for(let i=0;i<long;i++){
                    if(arbolPedidos.buscar_dato(rows[i].nombre_pedido)===null && rows[i].estado!=='completado'){
                        arbolPedidos.add(rows[i].nombre_pedido,rows[i]);
                    }
                }
            }
        });
    }, 300000);//300000===5 minutos   
}

cargarPedido();

const buscarIdProducto=(idPedido, nombrePedido)=>{
    let elemento=
            `
            <li id="elemento">
                <p class="text">Pedido de: ${nombrePedido} </p>
            `;
    let query=`SELECT *
    FROM Pedido_producto
    INNER JOIN producto
    ON Pedido_producto.producto_id_producto=producto.id_producto WHERE pedido_id_pedido=${idPedido};`;
    conexion.query(query,(error, rows, fields)=>{
        if(error){
            throw error;
        }else{
            for(let i=0;i<rows.length;i++){
                elemento+=
                `
                    <div class="productoDiv">
                        <p>- ${rows[i].nombre} ||| Cantidad: ${rows[i].cantidad_producto} </p>
                    </div>
                `;
            }
            elemento+=`</li>`;
            lista.insertAdjacentHTML("beforeend",elemento);
        }
    });
}

const agregarLista=()=>{
    //query para que funcione el arbol
    conexion.query(`SELECT * FROM Pedido`,(error, rows, fields)=>{
        if(error){
            throw error;
        }else{
            arbolPedidos.mostrar_PreOrden();
            //solo hara una unica vez el sacar los datos
            if(arrayDatos.length!==0){
                for(let i=0; i<arrayDatos.length;i++){
                    //doble seguridad 
                    if(arrayDatos[0].estado!=='completado'){
                        //buscamos el id de los productos para agregar los datos
                        buscarIdProducto(arrayDatos[i].id_pedido, arrayDatos[i].nombre_pedido); 
                    }
                }
            }else{
                const elemento=`
                    <li class='P0'>
                        <p class="text"> Sin pedidos </p>
                    </li>
                `;
                lista.insertAdjacentHTML("beforeend",elemento);
            }          
        }
    });
}

agregarLista();