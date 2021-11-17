module.exports = (sequelize, DataType) =>{
    const Produto = sequelize.define("Produto",{
        id_produto: {
            type: DataType.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        finca: DataType.STRING(45),
        cosecha: DataType.ENUM('tardia', 'temprana'),
        tipo: DataType.ENUM('tinto', 'branco', 'rosé', 'frisante'),
        ano: DataType.STRING(5),
        valor: DataType.DOUBLE,
        origem: DataType.STRING(20),
        rotulo: DataType.STRING(200),
        ativo: DataType.ENUM('ativo', 'inativo'),
        descricao: DataType.TEXT
    },
    {
        tablename: 'Produtos',
        timestamps: false
    });

    Produto.associate = (Models) =>{
        Produto.belongsToMany(Models.Pedido,{
            through: "Pedidos_Produtos",
            as: "pedidos",
            foreignKey: "id_produto",
        }),

        Produto.belongsToMany(Models.Uva,{
            through: "Produtos_Uvas",
            foreignKey:"id_produto",
            as:"uvas"
        }),

        Produto.hasMany(Models.ProdutoUva,{
            foreignKey:"id_produto",
            onDelete: "CASCADE",
            hooks: true
        })
    }

    return Produto
}