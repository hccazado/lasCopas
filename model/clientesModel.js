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
        let novoCliente = {
            id: (clientes.length)+1,
            nome: cadastro.nome,
            nascimento: cadastro.nascimento,
            email: cadastro.email,
            password: cadastro.password,
            pessoa: cadastro.pessoa,
            doc: cadastro.doc,
            cep: cadastro.cep,
            end1: cadastro.end1,
            complemento: cadastro.complemento,
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

function sigIn(user){
    let cliente = clientes.find(cliente =>{
       return cliente.email === user.email;
    });
    if(cliente!=undefined){
        if(cliente.password === user.password){
            return {
                error:false,
                message:null,
                login:true
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
    sigIn
}