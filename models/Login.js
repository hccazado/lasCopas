const Cliente = require("../models");

module.exports = (sequelize,DataType) => {
    const Login = sequelize.define('Login',{
        id_login:{
            type:DataType.SMALLINT,
            primaryKey:true,
            autoIncrement: true
        },
        email:{
            type:DataType.STRING,
            unique:true
        },
        senha:DataType.STRING,
        admin:{
            type:DataType.SMALLINT,
            defautValue: 0
        }
    },{
        tableName: 'Login',
        timestamps: false
    });

    return Login
}

/*
id_login SMALLINT UNSIGNED AUTO_INCREMENT,
    email VARCHAR(120) NOT NULL UNIQUE,
    senha VARCHAR(200) NOT NULL,
    admin SMALLINT UNSIGNED,
    PRIMARY KEY(id_login)
*/