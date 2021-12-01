module.exports = (sequelize, DataType) => {
    const ProdutoUva = sequelize.define("ProdutoUva", {
        
        id_produto: {
            type: DataType.INTEGER.UNSIGNED,
            references: 'Produtos',
            referencesKey: 'id_produto'
        },
        id_uva: {
            type: DataType.INTEGER.UNSIGNED,
            references: 'Uvas',
            referencesKey: 'uva_id'
        }
    },{
        tableName: "Produtos_Uvas",
        timestamps: false
    });

    ProdutoUva.associate = (Models)=>{

        ProdutoUva.belongsTo(Models.Produto,{
            foreignKey: "id_produto"
        }),
        
        ProdutoUva.belongsTo(Models.Uva, {
            foreignKey: "id_uva"
        })

    }

    return ProdutoUva;
}