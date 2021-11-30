let btnBusca = document.getElementById("buscaCliente");

btnBusca.addEventListener("keyup", (evento) =>{
    if(evento.key == "Enter"){
        let valor = btnBusca.value;
        let path = "/clientes/buscar/";
        if(isNaN(parseInt(valor))){
            let queryItems: [URLSearchParams] = btnBusca.value
            window.location.pathname="/clientes/buscar/"+btnBusca.value
            return;
        }
        else{
            window.location.pathname="/clientes/buscar/?doc="+btnBusca.value
        }
        
        //window.location.pathname="/clientes/buscar/?"+btnBusca.value
    }
})