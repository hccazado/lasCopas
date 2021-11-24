window.addEventListener("load", ()=>{
    let btnCep = document.getElementById("getCEP");
    btnCep.addEventListener("click", ()=>{
        getCEP();
    })
})

function getCEP(){
    let cep = document.getElementById('cep');
    //console.log(cep.value);
    let endereco = `https://viacep.com.br/ws/${cep.value}/json/`;
    axios.get(endereco).then(resultado =>{
        console.log(resultado.data);
        document.getElementById('end1').value = resultado.data.logradouro;
        document.getElementById('bairro').value = resultado.data.bairro;
        document.getElementById('uf').value = resultado.data.uf;
        document.getElementById('cidade').value = resultado.data.localidade;
    })
    .catch(error =>{
        console.log(error);
    })
}