const mongoose = require("mongoose")
const ProduitSchema = new mongoose.Schema({
    nom:String,
    description:String,
    prix:Number,
    created_at:{
        type:Date,
        defautl:Date.now(),
    },
})
module.exports = Produit = mongoose.model('produit',ProduitSchema)