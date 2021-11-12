module.exports = (sequelize, DataType) => {
    const Pedido = sequelize.define("Pedido",{
        id_pedido: {
            type: DataType.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        id_endereco: {
            type: DataType.INTEGER.UNSIGNED,
            references: 'Enderecos',
            referencesKey: 'id_endereco'
        },
        id_cliente: {
            type: DataType.INTEGER.UNSIGNED,
            references: 'Clientes',
            referencesKey: 'id_cliente'
        }
    },{
        tablename: 'Pedidos',
        timestamps: 'false'
    });

    Pedido.associate = (Models) =>{
        Pedido.belongsTo(Models.Endereco,{
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