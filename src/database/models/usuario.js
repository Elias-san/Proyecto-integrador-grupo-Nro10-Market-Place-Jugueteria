module.exports = (sequelize,dataTypes)=>{

    let alias="usuario";
    let cols ={
        idusuario:{
            type:dataTypes.INTEGER,
            autoincrement: true,
            primaryKey:true
        },
        nombre:dataTypes.STRING,
        apellido:dataTypes.STRING,
        usuario:dataTypes.STRING,
        avatar:dataTypes.STRING,
        categoria:dataTypes.INTEGER,
        email:dataTypes.STRING,
        clave:dataTypes.STRING,
        direccion:dataTypes.STRING,
        localidad:dataTypes.STRING,
        provincia:dataTypes.STRING,
        telefono:dataTypes.STRING,
    };

    let config={
        tableName:"usuarios",
        timestamps: false,
    }

    let usuario = sequelize.define(alias,cols,config);
    
    usuario.associate = function(models){
        usuario.belongsToMany(models.productos,{
            as:"productos",
            through:"producto_usuario",
            foreignkey:"idusuario",
            otherkey:"idproducto",
            timestamps:false,
        });

    };
    return usuario;
}