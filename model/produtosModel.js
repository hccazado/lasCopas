const vinhos = [{
    id:10,
    rotulo: "images/uploads/rotulos/EM-roble.png",
    finca: "Trapiche",
    origem: "Argentina",
    uvas: "malbec, merlot",
    ano: 2016,
    preco: "79,90",
    tipo: "tinto",
    temDescricao: true,
    descricao: "Um vilnho tinto de notas amadeiradas e aroma floral, sabor residual de rapadura. um autentico vinho argentino."},
{
    id:20,
    rotulo: "images/uploads/rotulos/Trapiche - cabernet.png",
    finca: "Traoiche",
    origem: "Argentina",
    uvas: ["Cabernet"],
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
        //concatenando path relativo com nome do arquivo para correta exibição no card
        rotulo: rotulo
    }
    vinhos.push(novoVinho);
    console.log("Model: vinho inserido no vetor");
};

function buscarVinhoID (id){
    let resultado = vinhos.filter(vinho =>{
        if (vinho.id == id){
            return vinho;
        }
    });
};

function editarVinho(id, uvas, cosecha, tipo, finca, ano, preco, origem, rotulo=null, descricao){
    let buscar = buscarVinhoID(id);
    
    buscar.rotulo = rotulo,
    buscar.finca = finca,
    buscar.origem = origem,
    buscar.uvas = uvas,
    buscar.ano = ano,
    buscar.preco = preco,
    buscar.tipo = tipo,
    buscar.descricao = descricao
    if(rotulo!=null){
        buscar.rotulo = rotulo
    }
};

module.exports = {
    listarVinhos,
    buscarVinhoID,
    editarVinho,
    cadastrarVinho
}