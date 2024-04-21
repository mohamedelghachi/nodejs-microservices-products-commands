const mongoose = require("mongoose")
const CommandeSchema = new mongoose.Schema({
    produits:{
        type:[String]
    },
    email_utilisateur:String,
    prix_total:Number,
    created_at:{
        type:Date,
        defautl:Date.now(),
    },
})
module.exports = Commande = mongoose.model('commande',CommandeSchema)