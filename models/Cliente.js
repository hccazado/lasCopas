
module.exports = (sequelize, DataType) =>{
    const Cliente = sequelize.define('Cliente',{
        id_cliente:{
            type:DataType.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
        },
        nome:DataType.STRING,
        sobrenome:{
            type: DataType.STRING,
            allowNull: true
        },
        dt_nascimento:{
            type: DataType.DATEONLY,
            allowNull: true
        },
        cadastro:{
            type:DataType.ENUM,
            values:['fisica','juridica']
        },
        documento:DataType.STRING,
        id_login: DataType.SMALLINT
    },{
        tablename: 'Clientes',
        timestamps:false
    });
    
    /*Cliente.associate = (Model)=>{
        Cliente.hasOne(Model.Login,{
            ForeignKey: id_login,
            as: 'login'
        })
    }*/
    Cliente.associate = (Models) =>{
        Cliente.hasOne(Models.Login,{
            foreignKey: 'id_Login',
            as: 'login'
        }),
        Cliente.hasMany(Models.Endereco,{
            as: 'Enderecos',
            foreignKey: 'id_cliente'
        })
    }

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