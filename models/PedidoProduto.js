module.exports = (sequelize, DataType) =>{
    const PedidoProduto = sequelize.define("PedidoProduto", {
        id_pedido: {
            type: DataType.INTEGER.UNSIGNED,
            references: "Pedidos",
            referencesKey: "id_pedido"
        },
        id_produto: {
            type: DataType.INTEGER.UNSIGNED,
            references: "Produtos",
            referencesKey: "id_produto"
        },
        quantidade: DataType.INTEGER.UNSIGNED,
        valor: DataType.DOUBLE
    },{
        tablename: "Pedidos_Produtos",
        timestamps: "false"
    });

    PedidoProduto.associate = (Models) =>{
        PedidoProduto.belongsTo(Models.Pedido,{
            as: "pedido",
            foreignKey: "id_pedido"
        }),
        PedidoProduto.hasOne(Models.Produto,{
            as: "produto",
            foreignKey: "id_produto"
        })
    }

    return PedidoProduto;
}