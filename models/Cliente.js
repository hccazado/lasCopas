module.exports = (sequelize, DataType) =>{
    const Cliente = sequelize.define('Cliente',{
        id_cliente:{
            type:DataType.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
        },
        sobrenome:DataType.STRING,
        sobrenome:DataType.STRING,
        dt_nascimento:DataType.DATEONLY,
        cadastro:{
            type:DataType.ENUM,
            values:['fisica','juridica']
        },
        documento:DataType.STRING,
        id_login: DataType.SMALLINT.UNSIGNED
    },{
        tablename: 'Clientes',
        timestamps:false
    })
    return Cliente
}

/*
id_cliente INT UNSIGNED NOT NULL AUTO_INCREMENT,
    nome VARCHAR(120) NOT NULL,
    sobrenome VARCHAR (100),
    dt_nascimento date,
    cadastro ENUM('fisica','juridico'),
    documento char(25),
    id_login SMALLINT UNSIGNED,
*/