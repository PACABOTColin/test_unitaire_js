/**
 * Fichier JS pour l'exercice sur la prime.
 * GUI : pages/remuneration_chauffeur.html
 * 
 */
window.addEventListener("load", function() {
    // tabEvents est une collection d'évenements
    var tabEvents = ['input'];
    // tabInputs est une collection de <input>
    var tabInputs = window.document.querySelectorAll("input");
    // Parcours de tabInputs en s'appuyant sur le nombre de <input> et sur tabEvents
    for (var i=0; i<tabInputs.length; i++) {
        for (var j=0; j<tabEvents.length; j++) {
            // Ajout d'un Listener sur tous les <input> sur les évènements listés dans tabEvents
            tabInputs[i].addEventListener(tabEvents[j], calculerPrime, false);
        }
    }
    for (var j=0; j<tabEvents.length; j++) {
        window.document.querySelector("#num_accidents").addEventListener(tabEvents[j], function (){
            if(window.document.querySelector("#num_accidents").value >= window.document.querySelector("#num_accidents").max)
            {
                window.document.querySelector("#affAccident").value = "plus de " + window.document.querySelector("#num_accidents").max +" accidents";
            }
            else
            {
                window.document.querySelector("#affAccident").value = window.document.querySelector("#num_accidents").value;
            }
        }, false);
    }
    window.document.querySelector("#btn_annuler").addEventListener("click", function (){
        window.document.querySelector("#videoSensibilisation").style.display = 'none';
    });
}, false);

/**
 * Procédure qui s'occupe du calcul et de l'affichage de la prime
 * 
 * @returns {void}
 */
function calculerPrime() {
    
    // Déclaration des constantes

    // Déclaration des variables
    var nbAncien = recupValeur("#num_ancien");
    var km = recupValeur("#num_km");
    var accidents = recupValeur("#num_accidents");
    var prime = Number(((recupAnciennete(nbAncien) + recupIndemKm(km)) * mallusAccident(accidents)).toFixed(2));
    var primeSansAccident = Number(((recupAnciennete(nbAncien) + recupIndemKm(km))).toFixed(2));
    // Affichage du résultat
    affPrime(prime, primeSansAccident, accidents);
}
/**
 * 
 */
function affPrime(remuneration, remunerationSansAccident, nbAccident) {
    var message = "La prime sera de : " + remuneration + " €";
    if(nbAccident > 0)
    { 
        message += " mais elle aurait été de : " + remunerationSansAccident + " si vous n'aviez pas eu " + nbAccident + " accident"
        if(nbAccident > 1)
            message += "s";
        if(nbAccident >= window.document.querySelector("#num_accidents").max)
        {
            message += " ou plus"
        }
        message += " en tord";
        window.document.querySelector("#videoSensibilisation").style.display = '';
    }
    else
    {
        window.document.querySelector("#videoSensibilisation").style.display = 'none';
    }
    window.document.querySelector("#remuneration").innerHTML = message;
}

/**
 * Fonction qui récupère un entier, sinon 0
 * 
 * @param {string} id
 * @returns {integer}
 */

function recupValeur(id) {
    var champ = parseInt(window.document.querySelector(id).value);
    if (isNaN(champ) || champ < 0) {
        window.document.querySelector(id).value = "";
        return 0;
    }
    else {
        return champ;
    }
}

/**
 * Fonction qui retourne la prime d'ancienneté
 * @param {integer} nb
 * @returns {float}
 */
function recupAnciennete(nb) {
    const nbMin = 4;
    const primeMin = 300;
    const augmentation = 30;
    if (nb >= nbMin) {
        return (primeMin + (nb - nbMin) * augmentation);
    }
    else
    {
        return 0.0;
    }
}

/**
 * Fonction qui retourne l'indemnité kilomètrique
 * @param {int} km
 * @returns {float} indeminite
 */
function recupIndemKm(km) {
    const prix = 0.01, plafond = 900;
    var indem = km * prix;
    if (indem > plafond) {
        return plafond;
    }
    else {
        return indem;
    }
}

/**
 * Fonction qui retourne le multiplicateur de prime en fonction du nombre d'accidents
 * @param {int} nb
 * @returns {float}
 */
function mallusAccident(nb)
{
    const nb_max = 4;
    if(nb < nb_max)
        return 1/(nb+1);
    else 
        return 0;
}