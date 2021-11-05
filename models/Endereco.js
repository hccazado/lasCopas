const Cliente = require("./Cliente");

module.exports = (sequelize, DataType) =>{
    const Endereco = sequelize.define("Endereco",{
        id_endereco: {
            type: DataType.INTEGER.UNSIGNED,
            PrimaryKey: true,
            autoIncrement: true
        },
        cep: DataType.CHAR(10),
        endereco: DataType.VARCHAR(100),
        complemento: DataType.VARCHAR(50),
        numero: DataType.CHAR(5),
        cidade: DataType.VARCHAR(45),
        uf: DataType.VARCHAR(2),
        id_cliente: {
            type:DataType.INTEGER.UNSIGNED,
            references:{
                model: Cliente,
                key: 'id_cliente'
            }
        }
    },{
        tablename: 'Clientes',
        timestamps:false
    });

    Endereco.associate = (Models) =>{
        Endereco.belongsTo(Models.Cliente,{
            as: 'enderecos',
            foreignKey:'id_cliente'
        })
    }

    return Endereco;
}