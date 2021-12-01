module.exports = (sequelize, DataType) => {
    const Pedido = sequelize.define("Pedido",{
        id_pedido: {
            type: DataType.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        id_endereco: DataType.INTEGER.UNSIGNED,
        id_cliente: DataType.INTEGER.UNSIGNED,
        data: DataType.DATEONLY

    },{
        tableName: "Pedidos",
        timestamps: false
    });

    Pedido.associate = (Models) =>{
        Pedido.belongsTo(Models.Endereco,{
            foreignKey: 'id_endereco'
        }),
        Pedido.belongsTo(Models.Cliente,{
            foreignKey: 'id_cliente'
        }),
        Pedido.hasMany(Models.PedidoProduto,{
            foreignKey: 'id_pedido'
        })
        Pedido.belongsToMany(Models.Produto, {
            through: 'Pedidos_Produtos',
            foreignKey: 'id_pedido',
            as: 'produto'
        })
        
    }

    return Pedido;
}