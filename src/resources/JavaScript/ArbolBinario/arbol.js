let arrayDatos=[];
class NodoArbol{
    constructor(llave, dato){
        this.llave=llave;
        this.dato=dato;
        this.der=null;
        this.izq=null;
    }
}

class Arbol{
    constructor(){
        this.raiz=null;
        this.array=[];
    }

    tieneRaiz(){
        return this.raiz===null;
    }

    add(llave, valor){
        if(this.tieneRaiz()){
            this.raiz=new NodoArbol(llave, valor);
        }else{
            let ladoIzquierdo;
            let actual=this.raiz;
            while(true){
                if(actual.llave>llave){
                    ladoIzquierdo=true;
                }else{
                    ladoIzquierdo=false;
                }
                if(ladoIzquierdo){
                    if(actual.izq===null){
                        actual.izq=new NodoArbol(llave, valor);
                        break;
                    }else{
                        actual=actual.izq;
                    }
                }else{
                    if(actual.der===null){
                        actual.der=new NodoArbol(llave, valor);
                        break;
                    }else{
                        actual=actual.der;
                    }
                }
            }
        }
    }
    buscar_dato(llave){
        if(this.raiz===null ||llave===null){
            return null;
        }
        let actual=this.raiz;
        while(actual.llave!=llave){
            if(actual.llave<llave){
                actual=actual.der;
            }else{
                actual=actual.izq;
            }
            if(actual===null){
                return null;
            }
        }
        return actual;
    }

    econtrar_minimo(){
        let minimo=this.buscar_minimo(this.raiz);
        return minimo;
    }
    buscar_minimo(nodo){
        let anterior=nodo;
        if(!this.tieneRaiz()){
            while(nodo!=null){
                anterior=nodo;
                nodo=nodo.izq;
            }
        return anterior;
        }
        return null;
    }
    ordenar_PreOrden(nodo){
        if(nodo===null){
            return;
        }
        arrayDatos.push(nodo.dato);
        this.ordenar_PreOrden(nodo.izq);
        this.ordenar_PreOrden(nodo.der);
    }

    mostrar_PreOrden(){
        arrayDatos=[];
        this.ordenar_PreOrden(this.raiz);
    }

    ordenar_InOrden(nodo){
        if(nodo===null){
            return;
        }
        this.ordenar_InOrden(nodo.izq);
        arrayDatos.push(nodo.dato);
        this.ordenar_InOrden(nodo.der);
    }
    
    mostrar_InOrden(){
        arrayDatos=[];
        this.ordenar_InOrden(this.raiz);
    }
    ordenar_PostOrden(nodo){
        if(nodo===null){
            return;
        }
        this.ordenar_PostOrden(nodo.izq);
        this.ordenar_PostOrden(nodo.der);
        arrayDatos.push(nodo.dato);
    }
    
    mostrar_PostOrden(){
        arrayDatos=[];
        this.ordenar_PostOrden(this.raiz);
    }

    eliminar(llave){
        let actual=this.raiz;
        let anterior=this.raiz;
        let ladoIzquierdo=true;
        if(llave===null){
            return null;
        }
        while(actual.llave!==llave){
            anterior=actual;
            if(actual.llave<llave){
                actual=actual.der;
                ladoIzquierdo=false;
            }else{
                actual=actual.izq;
                ladoIzquierdo=true;
            }
            if(actual===null){
                return false;
            }
        }

        if(actual.izq===null && actual.der===null){
            if(actual===this.raiz){
                this.raiz=null;
            }
            if(!ladoIzquierdo){
                anterior.der=null;
            }else{
                anterior.izq=null;
            }
        }

        else if(actual.izq===null && actual.der!==null){         
            if(actual===this.raiz){
                this.raiz=actual.der;
            }
            if(actual.llave<this.raiz.llave){
                anterior.izq=actual.der;
            }else{
                anterior.der=actual.izq;
            }
        }
        
        else if(actual.izq!==null && actual.der===null){
            if(actual===this.raiz){
                this.raiz=actual.izq;
            }
            if(actual.llave<this.raiz.llave){
                anterior.izq=actual.izq;
            }else{
                anterior.der=actual.izq;
            }
            
        }

        else{
            let nodoR=this.getNodoRemplazado(actual);
            if(actual===this.raiz){
                this.raiz=nodoR;
            }
            else if(ladoIzquierdo){
                anterior.izq=nodoR;
            }else{
                anterior.der=nodoR;
            }
            nodoR.izq=actual.izq; 
        }
    }

    getNodoRemplazado(nodoEliminado){
        let nodoRemplazado=nodoEliminado;
        let nodoAnteriorR=nodoEliminado; 
        let actual=nodoEliminado.der; 

        while(actual!==null){
            nodoAnteriorR=nodoRemplazado;
            nodoRemplazado=actual;
            actual=actual.izq;
        }

        if(nodoRemplazado!==nodoEliminado.der){
            nodoAnteriorR.izq=nodoRemplazado.der; 
            nodoRemplazado.der=nodoEliminado.der;
        }
        return nodoRemplazado;
    }
}


export {NodoArbol, Arbol, arrayDatos};