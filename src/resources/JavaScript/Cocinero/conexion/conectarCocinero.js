const mysql=require('mysql2');

const connection = mysql.createConnection({
        host: '127.0.0.1',
        user: 'a_cocinero_fof',
        password:'44904',
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