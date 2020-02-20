module.exports = (sequelize,dataTypes)=>{
let alias= "categorias";

let cols = {
    id:{
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

    categoria.associate = function(models){
        categoria.hasMany(models.productos,{
            alias:"productos",
            foreignkey:"categoriaid",
            timestamps:false,
        })
    }

return categoria;
}