module.exports = (sequelize, DataType) =>{
    const Uva = sequelize.define("Uva",{
        id_uva:{
            type: DataType.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        nome_uva:DataType.STRING(20),

    },{
        tablename: 'Uvas',
        timestamps: false
    });
    
    Uva.associate = (Models) => {
        Uva.belongsToMany(Models.Produto,{
            as: "vinhos",
            foreignKey: "uva_id",
            through: "Produtos_Uvas",
            otherKey: "produto_id"
        })
    }

    return Uva;
}