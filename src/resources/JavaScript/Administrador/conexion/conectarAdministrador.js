const mysql=require('mysql2');

const connection = mysql.createConnection({
        host: '127.0.0.1',
        user: 'a_administrador_fof',
        password:'55005',
        database: 'proyectoIntegrador_fof'
    });

connection.connect(function(err){
        if(err){
            console.log(err.code);
            console.log(err.fatal);
            return;
        }else{
            console.log('coneccion correcta');
        }
});

module.exports=connection;