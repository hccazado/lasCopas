const vinhos = [{
    id:10,
    rotulo: "images/uploads/rotulos/EM-roble.png",
    finca: "Trapiche",
    origem: "Argentina",
    uvas: ["malbec, merlot"],
    ano: 2016,
    preco: "79,90",
    cosecha: "temprana",
    tipo: "tinto",
    temDescricao: true,
    descricao: "Um vilnho tinto de notas amadeiradas e aroma floral, sabor residual de rapadura. um autentico vinho argentino."},
{
    id:20,
    rotulo: "images/uploads/rotulos/Trapiche - cabernet.png",
    finca: "Traoiche",
    origem: "Argentina",
    uvas: ["suavignon"],
    cosecha: "temprana",
    ano: 2018,
    preco: "74,90",
    tipo: "tinto",
    temDescricao: false,
    descricao: "Um vilnho tinto de notas amadeiradas e aroma floral, sabor residual de rapadura. um autentico vinho argentino."}
]

function listarVinhos(){
    return vinhos;
};

function cadastrarVinho(uvas, cosecha, tipo, finca, ano, preco, origem, rotulo){
    let novoVinho = {
        uvas: uvas,
        cosecha: cosecha,
        tipo: tipo,
        finca: finca,
        ano: ano,
        preco: preco,
        origem: origem,
        rotulo: rotulo
    }
    vinhos.push(novoVinho);
    console.log("Model: vinho inserido no vetor");
};

function buscarVinhoID (id){
    
    let resultado = vinhos.find(vinho =>{
        if (vinho.id == id){
            return vinho;
        }
    });
    return resultado;
};

function editarVinho(editar){
    let buscar = buscarVinhoID(editar.id);
    
    buscar.finca = editar.finca;
    buscar.origem = editar.origem;
    buscar.uvas = editar.uvas;
    buscar.ano = editar.ano;
    buscar.preco = editar.preco;
    buscar.tipo = editar.tipo;
    buscar.descricao = editar.descricao;
    if(editar.rotulo!=null){
        buscar.rotulo = editar.rotulo;
    }
};

module.exports = {
    listarVinhos,
    buscarVinhoID,
    editarVinho,
    cadastrarVinho
}