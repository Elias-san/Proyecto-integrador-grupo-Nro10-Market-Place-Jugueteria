module.exports = (sequelize,dataTypes)=>{
let alias= "categorias";

let cols = {
    idcategoria:{
        type:dataTypes.INTEGER,
        autoincrement: true,
        primaryKey:true
    },
    nombre:dataTypes.STRING,
};
let config = {
    tableName:"categoria",
    timestamps: false,
};
let categoria = sequelize.define(alias,cols,config);

    categoria.associate = (models)=>{
        categoria.hasMany(models.productos,{
            as: "productos",
            foreignKey:"categoriaid",
            timestamps:false,
        })
    };

return categoria;
}