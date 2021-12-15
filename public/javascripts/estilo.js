const container = document.getElementById("detalheProduto");
const detalheRotulo = document.getElementById("detalheRotulo");
const detalheDesc = document.getElementById("detalheDesc");

window.onload(alteraClasses());

window.addEventListener("resize", alteraClasses());

function alteraClasses(){
    if(this.innerWidth<=900){
        container.classList.remove("row");
        detalheRotulo.classList.remove("col-4");
        detalheDesc.classList.remove("col-5");
        detalheRotulo.classList.add("col");
        detalheDesc.classList.add("col");
    }
    else{
        container.classList.add("row");
        detalheRotulo.classList.remove("col");
        detalheDesc.classList.remove("col");
        detalheRotulo.classList.add("col-4");
        detalheDesc.classList.add("col-5");
    }
}