module.exports = (sequelize,dataTypes) =>{
    let alias = 'productos';

    let cols = {
        idproducto: {
            type:dataTypes.INTEGER,
            primaryKey:true,
            autoincrement:true,
        },
        nombre:dataTypes.STRING,
        descripcion:dataTypes.STRING,
        usuarioid:dataTypes.INTEGER,
        edadid:dataTypes.INTEGER,
        genero:dataTypes.STRING,
        marca:dataTypes.STRING,
        precio:dataTypes.DOUBLE,
        stock:dataTypes.INTEGER,
        categoriaid:dataTypes.INTEGER,
        url_imagen:dataTypes.STRING,
        };

    let config = {
        tableName:"producto",
        timestamps:false
    };

    let Producto = sequelize.define(alias,cols,config);
    
    Producto.associate = (models)=>{
    Producto.belongsTo(models.categorias,{
        as: "categoria",
        foreignKey:"categoriaid",
        timestamps:false,
    })

    Producto.belongsTo(models.edades,{
        as:"edades",
        foreignKey:"edadid",
        timestamps:false,
    })
/*
    Producto.belongsToMany(models.usuario,{
        as:"usuarios",
        through:"producto_usuario",
        foreignKey:"idproducto",
        otherKey:"idusuario",
        timestamps:false,
    })

  */  
};

return Producto
}