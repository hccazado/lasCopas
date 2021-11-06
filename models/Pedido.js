module.exports = (sequelize, DataType) => {
    const Pedido = sequelize.define("Pedido",{
        id_pedido: {
            type: DataType.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        id_endereco: DataType.INTEGER.UNSIGNED,
        id_cliente: DataType.INTEGER.UNSIGNED
    },{
        tablename: 'Pedidos',
        timestamps: 'false'
    });

    Pedido.associate = (Models) =>{
        Pedido.hasOne(Models.Endereco,{
            as: "endereco",
            foreignKey: "id_endereco"
        }),
        Pedido.belongsTo(Models.Cliente,{
            as: "cliente",
            foreignKey: "id_cliente"
        }),
        Pedido.hasMany(Models.PedidoProduto,{
            as: "produtos",
            foreignKey: "id_pedido"
        })
    }

    return Pedido;
}