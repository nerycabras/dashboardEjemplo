module.exports = function(mongoose) {
    var Schema = mongoose.Schema;
    var Usuario = new Schema({
        nombre               :    {type: String, index: true},
        contrasenia          :    {type: String},
        correo          :    {type: String}
    });
    
    var Torneo = new Schema({
        contrasenia        :    {type: String}
    });
    // declare seat covers here too
    var models = {
      Usuario : mongoose.model('Usuario', Usuario),
      Torneo : mongoose.model('Torneo', Torneo)
    };
    return models;
}