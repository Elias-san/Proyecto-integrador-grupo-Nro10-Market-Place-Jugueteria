module.exports = (sequelize,dataTypes)=>{
    let alias="edades";

    let cols ={
        id:{
            type:dataTypes.INTEGER,
            primaryKey: true,
            autoincrement: true
        },
        edad:{
            type:dataTypes.STRING,
        }
    };

    let config = {
        tableName:"edad",
        timestamps: false,
    };

    let edad = sequelize.define(alias,cols,config);

    edad.associate= function(models){
        edad.hasMany(models.productos,{
            as:"productos",
            foreignkey:"edadid",
            timestamps:false,
        });

}

return edad;
}