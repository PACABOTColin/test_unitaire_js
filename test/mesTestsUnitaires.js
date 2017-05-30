/**
 * Fonction qui affiche le résultat d'un test unitaire
 *     - En vert si le test est passé
 *     - En rouge si le test a échoué
 * @param {String} message
 * @param {bool} test
 * @returns {bool}
 */
function assert(message, test) {
    var monEl = window.document.createElement('p');
    var retour = new Boolean(null);
    if (test) {
        message = message + ' : OK';
        monEl.style.color = 'green';
        retour = true;
    } else {
        message = message + ' : ERREUR';
        monEl.style.color = 'red';
        retour = false;
    }
    monEl.innerHTML = message;
    window.document.querySelector('body').appendChild(monEl);
    return retour;
}

/**
 * Fonction qui procède automatiquement à des tests à l'aide des valeurs passées
 * en paramètres
 * @param {Array} unTabDeParams
 * @param {Array} unVecteurDeResultats
 * @param {function} uneFonction
 * @returns {void}
 */
function assertValues(unTabDeParams, unVecteurDeResultats, uneFonction) {
    var i = 0, reussite = 0, tauxReussite = 0;
    var params = new String(null);
    var retourUneFonction = new String(null);
    var monEl = window.document.createElement('p');
    unTabDeParams.forEach(function (uneLigneDeParams) {
        // Est-ce un tableau pour un test avec plus d'un paramètre ?
        if (Array.isArray(uneLigneDeParams)) {
            params = uneLigneDeParams.join();
            retourUneFonction = uneFonction.apply(null, uneLigneDeParams);
        } else {
            params = uneLigneDeParams;
            retourUneFonction = uneFonction(params);
        }
        if (assert(uneFonction.name + '(' + params + ') = ' + unVecteurDeResultats[i], retourUneFonction === unVecteurDeResultats[i])) {
            reussite++;
        }
        i++;
    });
    tauxReussite = Number((reussite / i * 100).toFixed(0));
    // Coloration en fonction du taux de réussite
    if (tauxReussite === 100) {
        monEl.style.color = 'green';
    } else if (tauxReussite >= 75) {
        monEl.style.color = 'orange';
    } else {
        monEl.style.color = 'red';
    }
    monEl.innerHTML = '================== ' + uneFonction.name + ' : ' + tauxReussite + '% de réussite ! ==================';
    window.document.querySelector('body').appendChild(monEl);
}


/*****
 * Mes tests
 */

/*assert('recupPrimeDist : Avec zéro = 0€', recupPrimeDist(0) === 0);
 assert('recupPrimeDist : Avec 10000 = 100€', recupPrimeDist(10000) === 100);
 assert('recupPrimeDist : Avec 90000 = 900€', recupPrimeDist(90000) === 900);
 assert('recupPrimeDist : Avec 110000 = 900€', recupPrimeDist(110000) === 900);*/
assertValues([0, 10000, 90000, 110000], [0, 100, 900, 900], recupPrimeDist);
/*assert('recupPrimeAncien : Avec une ancienneté < 4ans = 0.0', recupPrimeAncien(2) === 0.0);
 assert('recupPrimeAncien : Avec une ancienneté = 4ans = 300', recupPrimeAncien(4) === 300);
 assert('recupPrimeAncien : Avec une ancienneté = 6ans (> 4ans) = 360', recupPrimeAncien(6) === 360);*/
assertValues([2, 4, 6], [0.0, 300, 360], recupPrimeAncien);
/*assert('recupPrimeAnnuelle : Avec 0 accident = 10€', recupPrimeAnnuelle(10, 0.0, 0) === 10.00);
 assert('recupPrimeAnnuelle : Avec 1 accident = 5€', recupPrimeAnnuelle(10, 0.0, 1) === 5.00);
 assert('recupPrimeAnnuelle : Avec 2 accidents = 3.33€', recupPrimeAnnuelle(10, 0.0, 2) === 3.33);
 assert('recupPrimeAnnuelle : Avec 3 accidents = 2.5€', recupPrimeAnnuelle(10, 0.0, 3) === 2.50);
 assert('recupPrimeAnnuelle : Avec 4 (> 3) accidents = 0€', recupPrimeAnnuelle(10, 0.0, 4) === 0);*/
assertValues([[10, 0.0, 0], [10, 0.0, 1], [10, 0.0, 2], [10, 0.0, 3], [10, 0.0, 4]], [10.00, 5.00, 3.33, 2.50, 0], recupPrimeAnnuelle);



