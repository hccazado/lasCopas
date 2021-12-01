module.exports = (sequelize, DataType) =>{
    const Endereco = sequelize.define("Endereco",{
        id_endereco: {
            type: DataType.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        cep: DataType.CHAR(10),
        endereco: DataType.STRING(100),
        complemento: DataType.STRING(50),
        numero: DataType.CHAR(5),
        cidade: DataType.STRING(45),
        bairro: DataType.STRING(45),
        uf: DataType.STRING(2),
        id_cliente: {
            type: DataType.INTEGER.UNSIGNED,
            references: 'Clientes',
            referencesKey: 'id_cliente'
        }
    },{
        tableName: 'Enderecos',
        timestamps:false
    });

    Endereco.associate = (Models) =>{
        Endereco.belongsTo(Models.Cliente,{
            foreignKey:'id_cliente'
        })
        
    }

    return Endereco;
}