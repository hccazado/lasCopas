module.exports = (sequelize, DataType) =>{
    const PedidoProduto = sequelize.define("PedidoProduto", {
        id_pedido: {
            type: DataType.INTEGER.UNSIGNED,
            primaryKey: true,
            references: "Pedidos",
            referencesKey: "id_pedido"
        },
        id_produto: {
            primaryKey: true,
            type: DataType.INTEGER.UNSIGNED,
            references: "Produtos",
            referencesKey: "id_produto"
        },
        quantidade: DataType.INTEGER.UNSIGNED,
        valor: DataType.DOUBLE
    },{
        tableName: 'Pedidos_Produtos',
        timeStamps: false
    });

    PedidoProduto.associate = (Models) =>{
        PedidoProduto.belongsTo(Models.Pedido,{
            as: "pedido",
            foreignKey: "id_pedido"
        }),
        PedidoProduto.belongsTo(Models.Produto,{
            as: "produto",
            foreignKey: "id_produto"
        })
    }

    return PedidoProduto;
}