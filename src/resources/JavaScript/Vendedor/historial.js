const conexion=require('../../resources/JavaScript/Vendedor/conexion/conectarVendedor.js');
const contenidoHistorial=document.querySelector('#Historial');


const mostrarContenido=()=>{
    contenidoHistorial.innerHTML='';
    conexion.query('SELECT * FROM Pedido', (error, rows, fields)=>{
        if(error){
            throw error;
        }else{
            let long= rows.length;
            for(i=(long-1); i>-1; i--){
                const productoR=document.createElement('div');
                let texto=`Pedido: ${rows[i].id_pedido}: Nombre del cliente: ${rows[i].nombre_pedido} || Costo: $${rows[i].precio } || Estado: ${rows[i].estado}` ;
                productoR.textContent=texto;
                contenidoHistorial.prepend(productoR);
            }
        }
    });
}

mostrarContenido();