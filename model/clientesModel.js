const clientes = [
    {
        id:123,
        nome: "Heitor",
        doc: "222.333.444-55",
        uf: "MG",
        cidade: "Belo Horizonte"
    },
    {
        id:456,
        nome: "teste",
        doc: "333.333.444-55",
        uf: "SP",
        cidade: "Santos"
    },
    {
        id:765,
        nome: "DH",
        doc: "286-567.765/0001-90",
        uf: "SP",
        cidade: "São Paulo"
    }
]

function listarClientes(){
    let clientesMap = clientes.map( cliente =>{
        return {
            doc: cliente.doc,
            nome: cliente.nome,
            uf: cliente.uf,
            cidade: cliente.cidade
        };
    });
    return clientesMap;
}

function buscarClienteID(id){
    let resultado = clientes.find(cliente =>{
        return cliente.id == id;
    });
    return resultado;
}

function cadastrarCliente(nome, nascimento, email, password, pessoa, doc, cep, end1, complemento, uf, cidade){
    let novoCliente = {
        id: doc,
        nome: nome,
        nascimento: nascimento,
        email: email,
        password: password,
        pessoa: pessoa,
        doc: doc,
        cep: cep,
        end1: end1,
        complemento: complemento,
        uf: uf,
        cidade: cidade
    };
    clientes.push(novoCliente);
};


//Exportando funções
module.exports = {
    listarClientes,
    buscarClienteID,
    cadastrarCliente
}