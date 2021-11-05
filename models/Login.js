module.exports = (sequelize,DataType) => {
    const Login = sequelize.define('Login',{
        id_login:{
            type:DataType.SMALLINT.UNSIGNED,
            primaryKey:true,
            autoIncrement: true
        },
        email:{
            type:DataType.STRING,
            unique:true
        },
        senha:DataType.STRING,
        admin:{
            type:DataType.SMALLINT.UNSIGNED,
            defautValue: 0
        }
    },{
        tableName: 'Login',
        timestamps: false
    });

    Login.associate = (Models)=>{
        Login.belongsTo(Models.Cliente, {
            foreignKey: 'id_login',
            as: 'login'
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