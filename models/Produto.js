module.exports = (sequelize, DataType) =>{
    const Produto = sequelize.define("Produto",{
        id_produto: {
            type: DataType.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        finca: DataType.STRING(45),
        valor: DataType.DOUBLE,
        origem: DataType.STRING(20),
        rotulo: DataType.STRING(200),
        ativo: DataType.ENUM('ativo', 'inativo'),
        descricao: DataType.TEXT
    }, {},
    {
        tablename: 'Produtos',
        timestamps: false
    });

    Produto.associate = (Models) =>{
        Produto.belongsToMany(Models.Pedido,{
            as: "pedidos",
            foreignKey: "id_produto",
            through: "Pedidos_Produtos",
            otherKey: "id_pedido"
        }),

        Produto.belongsToMany(Models.Uva,{
            as: "uvas",
            foreignKey: "produto_id",
            through: "Produtos_Uvas",
            otherKey: "uva_id"
        })
    }

    return Produto
}