module.exports = (sequelize, DataType) =>{
    const Uva = sequelize.define("Uva",{
        id_uva:{
            type: DataType.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        nome_uva:DataType.STRING(20),

    },{
        tableName: 'Uvas',
        timestamps: false
    });
    
    Uva.associate = (Models) => {
        Uva.belongsToMany(Models.Produto,{
            through: "Produtos_Uvas",
            foreignKey: "id_uva"
        }),

        Uva.hasMany(Models.ProdutoUva,{
            foreignKey: "id_uva"
        });
    
    }

    return Uva;
}