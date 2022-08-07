    const conexion=require('../../resources/JavaScript/Vendedor/conexion/conectarVendedor.js');
import {Arbol, arrayDatos} from '../ArbolBinario/arbol.js';
const lista=document.querySelector('#lista_productos');
const botonRealizarPedido=document.querySelector('#Hacer_pedido');
let pagoTotal=0;
let producto=[];

let arbolPedidos=new Arbol();


const datosPrecargados=()=>{
    conexion.query(`SELECT * FROM Producto`, (error, rows, fields)=>{
        if(error){
            throw error;
        }
        else{
            let long=rows.length;
            for(let i=0; i<long; i++){
                arbolPedidos.add(rows[i].nombre, rows[i]);
            }
            arbolPedidos.mostrar_InOrden();
            for(let i=0;i<long;i++){
                const elemento=` <li id="elemento">
                <p class="text">${rows[i].nombre} </p>
                <input type="button" class="liButon" id="${rows[i].nombre}" value="-">
                <p class="text" id="text_${rows[i].nombre}"> 0 </p>
                <input type="button" class="liButon" id="${rows[i].nombre}" value="+"> 
            </li>`;
                producto.push(rows[i].nombre);
                lista.insertAdjacentHTML("beforeend",elemento);
            }
        }
    })    
}
datosPrecargados();

const calcularPrecioPagar=(producto, accion)=>{
    conexion.query(`SELECT costo FROM producto WHERE nombre='${producto}'`,(error, rows, fields)=>{
        if(error){
            throw error;
        }else{
            if(rows.length!==0){
                if(accion==="+"){
                    document.getElementById('precioActual').innerHTML="$"+pagoTotal+".00";
                    pagoTotal+=parseInt(rows[0].costo);
                    document.getElementById('precioActual').innerHTML="$"+pagoTotal+".00";
                }else if(accion==='-'){
                    document.getElementById('precioActual').innerHTML="$"+pagoTotal+".00";
                    pagoTotal-=parseInt(rows[0].costo);
                    document.getElementById('precioActual').innerHTML="$"+pagoTotal+".00";
                }
            }
        }
    }); 
}

const cantidadProducto=(producto, accion)=>{
    let cantidadActual=parseInt(document.getElementById("text_"+producto).textContent);
    if(accion==='+'){
        cantidadActual+=1;
        calcularPrecioPagar(producto, accion);
    }else if(accion==='-'){
        if(cantidadActual===0){
            cantidadActual=0;
        }else{
            cantidadActual-=1;
            calcularPrecioPagar(producto, accion);
        }
    }
    document.getElementById("text_"+producto).innerHTML=cantidadActual;

}

lista.addEventListener('click', (e)=>{ 
   if(e.target.type=='button'){
        let accion=e.target.value;
        let producto=e.target.id;
        cantidadProducto(producto,accion);
   }
});


const CargarPedidoCocinero=(idPedido)=>{
    for(let i=0; i<producto.length; i++){ 
        let hayPedido=parseInt(document.getElementById("text_"+producto[i]).textContent);
        if(hayPedido!==0){
            let query=`SELECT id_producto FROM Producto WHERE nombre='${producto[i]}'`;
            conexion.query(query,(error, rows, fields)=>{
                if(error){
                    throw error;
                }else{
                    //id producto || id pedido || cantidad de producto
                    let idProducto=rows[0].id_producto;
                    let cantidadProducto=document.getElementById("text_"+producto[i]).textContent;
                    //id pedido como parametro esta
                    //let query=`INSERT INTO Pedido_Producto VALUES('${rows[0].id_producto}','${idPedido}',${document.getElementById("text_"+producto[i]).textContent})`;   
                    let query=`INSERT INTO Pedido_Producto VALUES('${idProducto}','${idPedido}','${cantidadProducto}')`;
                    conexion.query(query,(error)=>{
                        if(error){
                            throw error;
                        }else{
                            document.getElementById("text_"+producto[i]).innerHTML='0';
                        }
                    });
                }

            });

        }
    }
}

const CargarPedido=()=>{
    let nombrePedido=document.getElementById('nombrePedido').value;
    //checamos que el precio no sea 0 y que tenga nombre el pedido
    if(pagoTotal!==0&&nombrePedido!==''){
        conexion.query(`SELECT * FROM Pedido WHERE nombre_pedido='${nombrePedido}'`,(error, rows, fields)=>{
            if(error){
                throw error;
            }else{
                if(rows.length===0){
                    let usuario=JSON.parse(localStorage.getItem("usuario"));
                    //sacamos la ubicacion
                    conexion.query(`SELECT ubicacion FROM Cuenta WHERE usuario='${usuario}'`,(error, rows, fields)=>{
                        if(error){
                            throw error;
                        }else{
                            let ubicacion=rows[0].ubicacion;
                            //metemos la ubicacion en pedidos
                            conexion.query(`INSERT INTO Pedido VALUES(0,'${nombrePedido}','${pagoTotal}','pendiente', '${ubicacion}')`,(error, rows, fields)=>{
                                if(error){
                                    throw error;
                                }else{
                                    document.getElementById('precioActual').innerHTML="$00.00";
                                    document.getElementById('nombrePedido').value='';
                                    pagoTotal=0;
                                    //hacemos que el pedido se le asigne que productos va a tener 
                                    conexion.query(`SELECT id_pedido FROM Pedido WHERE nombre_pedido='${nombrePedido}'`,(error, rows, fields)=>{
                                        if(error){
                                            throw error;
                                        }else{
                                            CargarPedidoCocinero(rows[0].id_pedido);
                                        }
                                    });
                                }
                            }); 
                        }
                    });
                }else{
                    console.log("ya existe");
                }   
            }
        }); 
    }
}

botonRealizarPedido.addEventListener('click',()=>{
    CargarPedido();
});

