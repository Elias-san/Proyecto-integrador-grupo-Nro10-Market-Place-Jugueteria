module.exports = (sequelize,dataTypes)=>{
    let alias= "carritos";
    
    let cols = {
        idcarrito:{
            type:dataTypes.INTEGER,
            autoincrement: true,
            primaryKey:true
        },
        idproducto:dataTypes.INTEGER,
        idusuario:dataTypes.INTEGER,
        cantidad:dataTypes.INTEGER,
        codigo:dataTypes.STRING,
    };
    let config = {
        tableName:"carrito",
        timestamps: false,
    };
    let carrito = sequelize.define(alias,cols,config);
    
        carrito.associate = (models)=>{
            carrito.hasMany(models.productos,{
                as: "productos",
                foreignKey:"carritoid",
                timestamps:false,
            })
        };
        carrito.associate = (models)=>{
            carrito.belongsTo(models.usuario,{
                as: "usuario",
                foreignKey:"carritoid",
                timestamps:false,
            });
        };
    
    return carrito;
    }