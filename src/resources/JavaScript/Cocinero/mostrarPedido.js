const conexion=require('../../resources/JavaScript/Cocinero/conexion/conectarCocinero.js');
import {Arbol, arrayDatos} from '../ArbolBinario/arbol.js';
const lista=document.querySelector('#PedidoActual');
const btnCompletarPedido=document.querySelector('#pedidoCompletado');
let arbolPedidos=new Arbol();


const cargarPedido=()=>{
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
    //actualizar la lista de pedidos cada 5 minutos
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


const cambiar_estado=(estadoPedido, idPedido)=>{
    let query=`UPDATE Pedido SET estado='${estadoPedido}' WHERE id_pedido='${idPedido}'`;
    conexion.query(query,(error, rows, fields)=>{
        if(error){
            throw error;
        }
    });

}
     

const buscarIdProducto=(idPedido, nombrePedido)=>{
    lista.innerHTML='';
    let estado='preparandose';
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
                        <p>-${rows[i].nombre} ||| Cantidad:${rows[i].cantidad_producto}</p>
                    </div>
                `;
            }
            elemento+=`</li>`;
            lista.insertAdjacentHTML("beforeend",elemento);
        }
    });
    cambiar_estado(estado, idPedido);
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
                if(arrayDatos[0].estado!=='completado'){
                    //buscamos el id de los productos para agregar los datos
                    buscarIdProducto(arrayDatos[0].id_pedido, arrayDatos[0].nombre_pedido); 
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

const elminarPedidoArbol=(nombreNodo, nodo)=>{
    arbolPedidos.eliminar(nombreNodo);
    agregarLista();
}

btnCompletarPedido.addEventListener('click', ()=>{
    if(arrayDatos.length!==0){
        lista.innerHTML='';
        conexion.query(`SELECT * FROM Pedido`,(error, rows, fields)=>{
            if(error){
                throw error;
            }else{
                arbolPedidos.mostrar_PreOrden();
                //solo hara una unica vez el sacar los datos
                if(arrayDatos[0].estado!=='completado' && arrayDatos.length!==0){
                    //cambiamos el estado
                    let estado="completado";
                    cambiar_estado(estado, arrayDatos[0].id_pedido);
                    elminarPedidoArbol(arrayDatos[0].nombre_pedido, arrayDatos[0]); 
                }          
            }
        });
    }
});