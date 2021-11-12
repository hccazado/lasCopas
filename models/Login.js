module.exports = (sequelize,DataType) => {
    const Login = sequelize.define('Login',{
        id_login:{
            type:DataType.SMALLINT.UNSIGNED,
            primaryKey:true,
            autoIncrement: true
        },
        email:{
            type:DataType.STRING(120),
            unique:{
                args: true,
                msg: "Email já cadastrado!"
            }
        },
        senha:DataType.STRING(200),
        admin:{
            type:DataType.SMALLINT.UNSIGNED,
            defaultValue: 0
        }
    },{
        tableName: 'Login',
        timestamps: false
    });

    Login.associate = (Models)=>{
        Login.hasOne(Models.Cliente, {
            foreignKey: 'id_login'
        })
    };

    return Login
}

/*
id_login SMALLINT UNSIGNED AUTO_INCREMENT,
    email VARCHAR(120) NOT NULL UNIQUE,
    senha VARCHAR(200) NOT NULL,
    admin SMALLINT UNSIGNED,
    PRIMARY KEY(id_login)
*/