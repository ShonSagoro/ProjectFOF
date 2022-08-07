const {app, BrowserWindow}=require('electron');

app.on('ready',()=>{
    let win=new BrowserWindow({
        webPreferences:{
            nodeIntegration:true,
            contextIsolation: false
        }
    });
    win.loadFile('./src/index.html');
    win.show();
    win.on('closed',()=>{
        app.quit();
    });
});

const mensaje=()=>{
    console.log("Hola mundo");
}