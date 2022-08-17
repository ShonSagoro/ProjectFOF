const conexion=require('../../resources/JavaScript/Administrador/conexion/conectarAdministrador.js');
const botonRegistrar=document.querySelector('#btnRegistrar');
const textareaDescripcion=document.querySelector('#DescripcionPR');

textareaDescripcion.addEventListener("keypress",(e)=>{
    const descLength=textareaDescripcion.value.length+1;
    const maxLength=250;
    if(descLength<=maxLength){
        document.getElementById('textarea_count').innerHTML=descLength+"/250 (Max. 250 caracteres)";
    }
});

textareaDescripcion.addEventListener("keydown",(e)=>{
    if(e.key==="Backspace"){
        const descLength=textareaDescripcion.value.length-1;
        if(descLength>=0){
            document.getElementById('textarea_count').innerHTML=descLength+"/250 (Max. 250 caracteres)";
        }  
    }
});



botonRegistrar.addEventListener('click', ()=>{
    let texto;
    let nombrePR =document.getElementById("NombrePR").value;
    let descripcionPR =document.getElementById("DescripcionPR").value;
    let costoPR =document.getElementById("CostoPR").value;
    if(nombrePR!="" && descripcionPR!=""){
        if(costoPR>0 &&descripcionPR.length<=250 ){
            conexion.query("SELECT * FROM Producto WHERE nombre='"+nombrePR+"'", (error, rows, fields)=>{
                if(error){
                    throw error;
                }else{
                    if(rows.length!==0){
                        document.getElementById("ValidacionProducto").innerHTML="Producto ya existente"
                    }else{
                        let query=`INSERT INTO Producto  VALUES (0,'${nombrePR}','${descripcionPR}','${costoPR}')`;
                        conexion.query(query, function (err) {
                            if (err) {
                                throw err;
                            }else { 
                                document.getElementById("NombrePR").value='';
                                document.getElementById("DescripcionPR").value='';
                                document.getElementById("CostoPR").value='';
                                Contador_caracteres();
                                texto="PRODUCTO REGISTRADO";
                            }
                        }); 
                    }
            }
            });
        }else{
            texto="Precio del producto invalido o descripcion muy larga";  
        }

    }else{
         texto="Ingreso de datos invalidos, no se registro";
    } 
    document.getElementById("ValidacionProducto").innerHTML=texto;
});
