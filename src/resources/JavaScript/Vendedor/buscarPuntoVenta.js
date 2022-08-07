const conexion=require('../../resources/JavaScript/Vendedor/conexion/conectarVendedor.js');
const botonBuscarVendedor=document.querySelector('#buscarPedido');


botonBuscarVendedor.addEventListener('click',()=>{
    let textoBuscarPV=document.getElementById('VendedorB').value;
    if(textoBuscarPV!=''){
        buscarPuntoVenta(textoBuscarPV);
    }else{
        document.getElementById('verificacionTXT').innerHTML='INGRESE EL NOMBRE DEL VENDEDOR';
    }
});


const buscarPuntoVenta=nombreV=>{
    conexion.query(`SELECT * FROM Cuenta WHERE usuario='${nombreV}'`,(error, rows, fields)=>{
        if(error){
            throw error;
        }else{
            if(rows.length!==0){
                if( rows[0].rol==='Vendedor'){
                    document.getElementById('txtLocalizacionV').innerHTML=rows[0].ubicacion;            
                }else{
                    document.getElementById('txtLocalizacionV').innerHTML="NO ES VENDEDOR";                               
                }
            }else{
                document.getElementById('txtLocalizacionV').innerHTML="NO EXISTE";            
            }
        }
    });

}
