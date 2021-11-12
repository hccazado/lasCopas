
module.exports = (sequelize, DataType) =>{
    const Cliente = sequelize.define('Cliente',{
        id_cliente:{
            type:DataType.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
        },
        nome:DataType.STRING(120),
        sobrenome:{
            type: DataType.STRING(100),
            allowNull: true
        },
        dt_nascimento:{
            type: DataType.DATEONLY,
            allowNull: true
        },
        cadastro: DataType.ENUM('fisica','juridica'),
        documento:DataType.STRING,
        id_login: DataType.SMALLINT
    },{
        tablename: 'Clientes',
        timestamps:false
    });
    
    Cliente.associate = (Models) =>{
        Cliente.belongsTo(Models.Login,{
            foreignKey: 'id_login'
        }),
        Cliente.hasMany(Models.Endereco,{
            as: 'enderecos',
            foreignKey: 'id_cliente'
        }),
        Cliente.hasMany(Models.Pedido,{
            as: "pedidos",
            foreignKey: "id_cliente"
        })
    }

    return Cliente
}