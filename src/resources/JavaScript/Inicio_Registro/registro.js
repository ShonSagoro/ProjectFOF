const conexion = require('./resources/JavaScript/Inicio_Registro/conexion/conectarSesion.js');
const botonRegistro = document.querySelector('#btnRegistro');
const rolSelect=document.querySelector('#rol');


/*
  if(correo!='' && usuario!='' && contrasenia!=''){
        if(contrasenia==contraseniaR){


            let query="INSERT INTO Cuenta VALUES ("+0+",'"+usuario+"','"+correo+"','"+contrasenia+"','"+rol+"',null);";
            conexion.query(query, (error, results, fields)=>{
                if(error){
                    document.getElementById("validacionRegistro").innerHTML="MAL";
                    throw error;
                }
            });
            window.location.assign("index.html");
        }else{
            let texto="Las contraseñas no coiciden, vuelva a intentarlo";
            document.getElementById("validacionRegistro").innerHTML=texto;
        }
    }else{
        document.getElementById("validacionRegistro").innerHTML="LLENE EL FORMULARIO COMPLETO";
    } 
    
*/
rolSelect.addEventListener('click',()=>{
    let rol=document.getElementById('rol').value;
    if(rol==='Vendedor'){
        console.log('Entre');
        const element= `
        <label  for="txtDireccionR">Direccion: </label>
        <input id="txtDireccionR" type="text" placeholder="Direccion"> 
        `
        document.getElementById('direccion').innerHTML=element;
    }
    else{
        document.getElementById('direccion').innerHTML='';
    }
});


const verificarOtrosRoles=(rol,correo,usuario,contrasenia,contraseniaR)=>{
    if(correo!='' && usuario!='' && contrasenia!=''){
        if(contrasenia===contraseniaR){
            let query="INSERT INTO Cuenta VALUES ("+0+",'"+usuario+"','"+correo+"','"+contrasenia+"','"+rol+"',null);";
            conexion.query(query, (error, results, fields)=>{
                if(error){
                    document.getElementById("validacionRegistro").innerHTML="Error";
                    throw error;
                }
            });
            window.location.assign("index.html");
        }else{
            let texto="Las contraseñas no coiciden, vuelva a intentarlo";
            document.getElementById("validacionRegistro").innerHTML=texto;
        }
    }else{
        document.getElementById("validacionRegistro").innerHTML="LLENE EL FORMULARIO COMPLETO";
    } 
}

const verificarVendedor=(rol,correo,usuario,contrasenia,contraseniaR,direccion)=>{
    if(direccion!=''&&correo!='' && usuario!='' && contrasenia!=''){
        if(contrasenia===contraseniaR){
            let query=`INSERT INTO Cuenta VALUES(0,'${usuario}','${correo}','${contrasenia}','${rol}','${direccion}');`
            conexion.query(query, (error, results, fields)=>{
                if(error){
                    document.getElementById("validacionRegistro").innerHTML="MAL";
                    throw error;
                }
            });
            window.location.assign("index.html");
        }else{
            let texto="Las contraseñas no coiciden, vuelva a intentarlo";
            document.getElementById("validacionRegistro").innerHTML=texto;
        }
    }else{
        document.getElementById("validacionRegistro").innerHTML="LLENE EL FORMULARIO COMPLETO";
    } 
}



botonRegistro.addEventListener('click', ()=>{
    let rol=document.getElementById('rol').value;
    let correo=document.getElementById("txtCorreoR").value;
    let usuario=document.getElementById("txtUserR").value;
    let contrasenia= document.getElementById("txtPassR").value;
    let contraseniaR= document.getElementById("txtPassRC").value;
    if(rol==='Vendedor'){
        let direccion=document.getElementById("txtDireccionR").value;
        verificarVendedor(rol,correo,usuario,contrasenia,contraseniaR,direccion);
    }else{
        verificarOtrosRoles(rol,correo,usuario,contrasenia,contraseniaR);
    }

});