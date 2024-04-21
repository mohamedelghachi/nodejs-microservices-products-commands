const express = require("express");
const app = express();
const PORT = process.env.PORT_ONE || 4001;
const mongoose = require("mongoose");
const Commande = require("./Commande");
const axios = require('axios');
app.use(express.json());
//Connexion à la base de données
mongoose.set('strictQuery', true);
mongoose.connect(
    "mongodb://localhost/commande-service").then(() => console.log("Connected to MongoDB")).catch(err => console.log(err));

//Calcul du prix total d'une commande en passant en paramètre un
//tableau des produits
function prixTotal(produits) {
    let total = 0;
    for (let t = 0; t < produits.length; ++t) {
        total += produits[t].prix;
    }
    // console.log("prix total :" + total);
    return total;
}
//Cette fonction envoie une requête http au service produit pour
// récupérer le tableau des produits qu'on désire commander (en se
// basant sur leurs ids)
async function httpRequest(ids) {
    try {
        const URL = "http://localhost:4000/produit/acheter"
        const response = await axios.post(URL, { ids: ids }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        //appel de la fonction prixTotal pour calculer le prix
        // total de la commande en se basant sur le résultat de la requête
        // http
        console.log(response.data);
        return prixTotal(response.data);
    } catch (error) {
        console.error(error);
    }
}
app.post("/commande/ajouter", async (req, res, next) => {
    // Création d'une nouvelle commande dans la collection
    // commande
    const { ids, email_utilisateur } = req.body;
    httpRequest(ids).then(total => {
        const newCommande = new Commande({
            produits:ids,
            email_utilisateur: email_utilisateur,
            prix_total: total,
        });
        newCommande.save()
            .then(commande => res.status(201).json(commande))
            .catch(error => res.status(400).json({ error }));
    });
});
app.listen(PORT, () => {
    console.log(`Commande-Service at ${PORT}`);
});
