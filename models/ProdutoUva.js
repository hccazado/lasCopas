module.exports = (sequelize, DataType) => {
    const ProdutoUva = sequelize.define("ProdutoUva", {
        produto_id: {
            type: DataType.INTEGER.UNSIGNED,
            references: 'Produtos',
            referencesKey: 'id_produto'
        },
        uva_id: {
            type: DataType.INTEGER.UNSIGNED,
            references: 'Uvas',
            referencesKey: 'uva_id'
        }
    },{
        tablename: "Produtos_Uvas",
        timestamps: false
    });

    return ProdutoUva;
}