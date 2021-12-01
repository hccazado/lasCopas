let fieldBusca = document.getElementById("buscaProduto");
let btBck = document.getElementById("btBck");

fieldBusca.addEventListener("keyup", (evento) =>{
    if(evento.key == "Enter"){
        let valor = fieldBusca.value;
        window.location.pathname="/gerenciar/pedidos/buscar/"+fieldBusca.value
    }
});

btBck.addEventListener("click", () =>{
    window.history.back();
});