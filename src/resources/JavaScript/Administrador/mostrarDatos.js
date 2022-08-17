const conexion=require('../../resources/JavaScript/Administrador/conexion/conectarAdministrador.js');
import {Arbol, arrayDatos} from '../ArbolBinario/arbol.js';
const botonBuscar=document.querySelector('#buscarProducto');
let arbolProducto= new Arbol();
const contenedorProductos=document.getElementById('Section_Producto');
    



const mostrarListaProductos=()=>{
    contenedorProductos.innerHTML='';
    conexion.query('SELECT * FROM Producto', (error, rows, fields)=>{
        if(error){
            throw error;
        }else{
            let long= rows.length
            if(long!=0){
                for(let i=0; i<long; i++){
                    arbolProducto.add(rows[i].nombre, rows[i]);
                }
                arbolProducto.mostrar_InOrden();
                for(let i=0; i<long; i++){
                    const productoR=document.createElement('div');
                    productoR.textContent=arrayDatos[i].nombre;
                    contenedorProductos.append(productoR);
                    //prepend coloca antes del final ||append coloca al final
                }
            }else{
                contenedorProductos.innerHTML="NO HAY PRODUCTO";
            }
        }   
    });
    
}

botonBuscar.addEventListener('click',()=>{  
    let nombreBuscar=document.getElementById('BuscarTxt').value;
    if(nombreBuscar!==''){
        buscarProducto(nombreBuscar);
    }else{
        vaciarDatos();
    }
});

const buscarProducto=producto=>{
    // producto=producto.toLowerCase();
    conexion.query("SELECT * FROM Producto WHERE nombre='"+producto+"'", (error, rows, fields)=>{
        if(error){
            throw error;
        }else{
            if(rows.length!==0){
                if(rows!==undefined){
                    document.getElementById('txtDescripcionB').innerHTML=rows[0].descripcion;
                    document.getElementById('txtPrecioB').innerHTML="$"+rows[0].costo+".00";
                }else{
                    document.getElementById('txtDescripcionB').innerHTML="NO EXISTE EL PRODUCTO";
                }
            }
    }
    });
}

const vaciarDatos=()=>{
    document.getElementById('txtDescripcionB').innerHTML='';
    document.getElementById('txtPrecioB').innerHTML='';
}

//cargar lista
mostrarListaProductos();

contenedorProductos.addEventListener('click', (e)=>{
    buscarProducto(e.target.textContent);
});