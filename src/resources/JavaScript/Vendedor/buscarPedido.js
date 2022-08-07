const conexion=require('../../resources/JavaScript/Vendedor/conexion/conectarVendedor.js');
const botonBuscarPedido=document.querySelector('#buscarProducto');


botonBuscarPedido.addEventListener('click',()=>{
    let textoBuscar=document.getElementById('PedidoB').value;
    if(textoBuscar!==''){
        buscarProducto(textoBuscar);
    }else{
        document.getElementById('verificacionTXT').innerHTML='INGRESE EL NOMBRE DEL PEDIDO';
        setTimeout(()=>{
            document.getElementById('verificacionTXT').innerHTML='';
        },5000);
    }
});

const buscarProducto=(pedido)=>{
    conexion.query(`SELECT * FROM Pedido WHERE nombre_pedido='${pedido}'`,(error, rows, fields)=>{
        if(error){
            throw error;
        }else{
            if(rows.length!==0){
                document.getElementById('txtLocalizacion').innerHTML=rows[0].ubicacion;
                document.getElementById('txtEstado').innerText=rows[0].estado;
            }else{
                document.getElementById('verificacionTXT').innerHTML='No existe';
                setTimeout(()=>{
                    document.getElementById('verificacionTXT').innerHTML='';
                },5000);
            }
        }
    });
}