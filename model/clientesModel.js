const bcrypt = require("bcryptjs");

const clientes = [
    {
        id:1,
        nome: "Heitor",
        doc: "222.333.444-55",
        uf: "MG",
        cidade: "Belo Horizonte"
    },
    {
        id:2,
        nome: "teste",
        email: "teste@gmail.com",
        admin:false,
        password: "123",
        doc: "333.333.444-55",
        uf: "SP",
        cidade: "Santos"
    },
    {
        id:3,
        nome: "DH",
        doc: "286-567.765/0001-90",
        uf: "SP",
        cidade: "São Paulo"
    },
    {
        id: 4,
        nome: "teste2",
        email: "teste2@gmail.com",
        admin:true,
        password: "$2a$10$6TJeD5WOUtSswXle2ixGR.sIDOeAuI9yYDfcoTxP/5FNqh9f4bU56",
        doc: "333.333.444-55",
        uf: "SP",
        cidade: "Santos"
    }
]

function listarClientes(){
    let clientesMap = clientes.map( cliente =>{
        return {
            id: cliente.id,
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

/*function cadastrarCliente(nome, nascimento, email, password, pessoa, doc, cep, end1, complemento, uf, cidade){*/
function cadastrarCliente(cadastro){
    //verificando se o email informado já está cadastrado.
    let resultado = clientes.find(cliente => {
        if(cliente.email == cadastro.email){
            console.log("model encontrou o email!");
            return cliente;
        }
        });
    if(resultado == undefined){
        //criando um id com Hash para o cliente
        //let idHash = bcrypt.hashSync(toString(clientes.length+1), 10); 
        let novoCliente = {
            id: (clientes.length)+1,
            //id: idHash,
            nome: cadastro.nome,
            nascimento: cadastro.nascimento,
            email: cadastro.email,
            password: cadastro.password,
            admin: false,
            pessoa: cadastro.pessoa,
            doc: cadastro.doc,
            cep: cadastro.cep,
            end1: cadastro.end1,
            complemento: cadastro.complemento,
            num: cadastro.num,
            uf: cadastro.uf,
            cidade: cadastro.cidade
        };
        clientes.push(novoCliente);
        return {
            exists: false,
            created: true
        }
    }
    else{
        return{
            exists:true,
            created:false
        }
    }
};

function editarCliente(id, novosDados){
    let res = clientes.filter(cliente =>{
        if (cliente.id == id){
            cliente.nome = novosDados.nome,
            cliente.nascimento = novosDados.nascimento,
            cliente.email = novosDados.email,
            cliente.password = novosDados.password,
            cliente.pessoa = novosDados.pessoa,
            cliente.admin = false,
            cliente.doc = novosDados.doc,
            cliente.cep = novosDados.cep,
            cliente.end1 = novosDados.end1,
            cliente.complemento = novosDados.complemento,
            cliente.num = novosDados.num,
            cliente.uf = novosDados.uf,
            cliente.cidade = novosDados.cidade
        }
    });
    if(res != undefined){
        return true;
    }
    else{
        return false;
    }
}

function sigIn(user){
    let cliente = clientes.find(cliente =>{
       return cliente.email === user.email;
    });
    if(cliente!=undefined){
        //se o email cadastrado existe, realiza hashCompare do password
        if(bcrypt.compareSync(user.password, cliente.password)){
            return {
                error:false,
                message:null,
                login:true,
                nome: cliente.nome,
                admin:cliente.admin
            }
        }
        
        else{
            return{
                error:true,
                message:"Senha incorreta",
                login:false
            }
        } 
    }
    else{
        return{
            error:true,
            message: "Usuario não encontrado",
            login: false
        }
    }
}


//Exportando funções
module.exports = {
    listarClientes,
    buscarClienteID,
    cadastrarCliente,
    editarCliente,
    sigIn
}