let btnBusca = document.getElementById("buscaCliente");
let btBck = document.getElementById("btBck");

btnBusca.addEventListener("keyup", (evento) =>{
    if(evento.key == "Enter"){
        let valor = btnBusca.value;
        window.location.pathname="/gerenciar/clientes/buscar/"+btnBusca.value
    }
});

btBck.addEventListener("click", () =>{
    window.history.back();
});