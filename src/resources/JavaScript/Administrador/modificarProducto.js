const conexion=require('../../resources/JavaScript/Administrador/conexion/conectarAdministrador.js');
const botonBuscar=document.querySelector('#buscarProducto');
const botonReemplazar=document.querySelector('#btnReemplazar');
const botonEliminar=document.querySelector('#btnEliminar');
let bandera=0;


const Contador_caracteres=()=>{
    let elemento=document.getElementById('DescripcionPR').value.length;
    document.getElementById('textarea_count').innerHTML=elemento+"/250 (Max. 250 caracteres)";;
}


botonBuscar.addEventListener('click',()=>{  
    bandera=1;
    let nombreBuscar=document.getElementById('BuscarTxt').value;
    if(nombreBuscar!==''){
        buscarProducto(nombreBuscar);
    }else{
        vaciarDatos();
        document.getElementById('txtDescripcionB').innerHTML="No hay nada que buscar";
    }
});

const buscarProducto=producto=>{
    conexion.query("SELECT * FROM Producto WHERE nombre='"+producto+"'", (error, rows, fields)=>{
        if(error){
            throw error;
        }else{
            if(rows.length!==0){
                document.getElementById('txtDescripcionB').innerHTML=rows[0].descripcion;
                document.getElementById('txtPrecioB').innerHTML="$"+rows[0].costo+".00";
            }else{
                document.getElementById('txtDescripcionB').innerHTML="NO EXISTE";
                document.getElementById('txtPrecioB').innerHTML="NO EXISTE";
            }
    }
    });
}

const vaciarDatos=()=>{
    document.getElementById('txtDescripcionB').innerHTML='';
    document.getElementById('txtPrecioB').innerHTML='';
}

botonReemplazar.addEventListener('click',()=>{
    let nombreBuscarReem=document.getElementById('BuscarTxt').value;
    if(nombreBuscarReem!=''&&bandera!=0){
        buscarProductoReem(nombreBuscarReem);
    }else{
        document.getElementById('verificarAccion').innerHTML="Busque el producto primero";
    }
   bandera=0;
});

const buscarProductoReem=producto=>{
    conexion.query("SELECT * FROM Producto WHERE nombre='"+producto+"'", (error, rows, fields)=>{
        if(error){
            throw error;
        }else{
            if(rows.length!==0){
                let descripcionReem=document.getElementById('DescripcionPR').value;
                let precioReem=document.getElementById('txtPrecioNuevo').value;
                if(descripcionReem!='' && precioReem!=''){
                    if(descripcionReem!==rows[0].descripcion && precioReem!==rows[0].costo){
                        conexion.query("UPDATE Producto SET descripcion='"+descripcionReem+"', costo='"+precioReem+"' WHERE id_producto= '"+rows[0].id_producto+"'", (error)=>{
                            if(error){
                                throw error;
                            }else{
                                document.getElementById('DescripcionPR').value='';
                                document.getElementById('txtPrecioNuevo').value='';
                                document.getElementById('txtDescripcionB').innerHTML=descripcionReem;
                                document.getElementById('txtPrecioB').innerHTML="$"+precioReem+".00";
                            }
                        });
                    }else{
                        document.getElementById('verificarAccion').innerHTML="No necesita cambiar, los datos son iguales";
                    }
                }else if(descripcionReem!=''&&precioReem==''){
                    let precioN=rows[0].costo;
                    conexion.query("UPDATE Producto SET descripcion='"+descripcionReem+"' WHERE id_producto= '"+rows[0].id_producto+"'", (error)=>{
                        if(error){
                            throw error;
                        }else{
                            document.getElementById('DescripcionPR').value='';
                            document.getElementById('txtPrecioNuevo').value='';
                            document.getElementById('txtDescripcionB').innerHTML=descripcionReem;
                            document.getElementById('txtPrecioB').innerHTML="$"+precioN+".00";
                        }
                    });
                }else if(descripcionReem==''&&precioReem!=''){
                    let descripcionN=rows[0].descripcion;
                    conexion.query("UPDATE Producto SET costo='"+precioReem+"' WHERE id_producto= '"+rows[0].id_producto+"'", (error)=>{
                        if(error){
                            throw error;
                        }else{
                            document.getElementById('DescripcionPR').value='';
                            document.getElementById('txtPrecioNuevo').value='';
                            document.getElementById('txtDescripcionB').innerHTML=descripcionN;
                            document.getElementById('txtPrecioB').innerHTML="$"+precioReem+".00";
                        }
                    });
                }else{
                    document.getElementById('verificarAccion').innerHTML="INGRESE DATOS A REEMPLAZAR";
                }
        }else{
            document.getElementById('txtDescripcionB').innerHTML="NO EXISTE";
            document.getElementById('txtPrecioB').innerHTML="NO EXISTE";
        }
    }
    });
}

botonEliminar.addEventListener('click',()=>{
    let nombreBuscarEl=document.getElementById('BuscarTxt').value;
    if(nombreBuscarEl!=''&& bandera!=0){
        document.getElementById('DescripcionPR').value  ='';
        document.getElementById('txtPrecioNuevo').value=''
        buscarProductoELiminar(nombreBuscarEl);
    }else{
        document.getElementById('verificarAccion').innerHTML="Busque el producto primero";
    }
    bandera=0;
    
});

const buscarProductoELiminar=producto=>{
    document.getElementById('DescripcionPR').value='';
    document.getElementById('txtPrecioNuevo').value='';
    conexion.query("SELECT * FROM Producto WHERE nombre='"+producto+"'", (error, rows, fields)=>{
        if(error){
            throw error;
        }else{
            if(rows.length!==0){
                conexion.query("DELETE FROM Producto WHERE id_producto= '"+rows[0].id_producto+"'", (error)=>{
                    if(error){
                        throw error;
                    }
                    else{
                        document.getElementById('txtDescripcionB').innerHTML="Eliminado";
                        document.getElementById('txtPrecioB').innerHTML="Eliminado";
                        document.getElementById('verificarAccion').innerHTML="Producto eliminado";
                    }
                });
            }
            else{
                document.getElementById('txtDescripcionB').innerHTML="NO EXISTE";
                document.getElementById('txtPrecioB').innerHTML="NO EXISTE";
            }
    }
    });
}