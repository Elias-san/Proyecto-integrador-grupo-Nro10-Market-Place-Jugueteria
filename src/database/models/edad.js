module.exports = (sequelize,dataTypes)=>{
    let alias="edades";

    let cols ={
        idedad:{
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

    edad.associate= (models)=>{
        edad.hasMany(models.productos,{
            as:"productos",
            foreignKey:"edadid",
            timestamps:false,
        })

};

return edad;
}