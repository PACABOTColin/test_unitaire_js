/**
 * Fonction qui affiche le résultat d'un test unitaire
 *     - En vert si le test est passé
 *     - En rouge si le test a échoué
 * @param {String} message
 * @param {undefined} theoric theoric result value
 * @param {undefined} real real description must be the same type than 
 * @returns {bool}
 */
var colors = [[95,"#00FF00"],[90,"orange"],[70,"red"]];
function assert(message, theoric, real) {
    var monEl = window.document.createElement('p');
    var retour = new Boolean(null);
    if (theoric === real) 
    {
        message = message + ' : OK';
        monEl.className = 'OK';
        retour = true;
    }
    else
    {
        message = message + ' : ERREUR wanted value is ' + theoric;
        monEl.className = 'KO';
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
function assertValues(unTabDeParams, unVecteurDeResultats, uneFonction) 
{
    var fail = 0 , good = 0;
    var i = 0;
    var params;
    var result;
    unTabDeParams.forEach(function (line)
    {
        if(Array.isArray(line))
        {
            params = line.join();
            result = uneFonction.apply(null, line);
        }
        else 
        {
            params = line;
            result = uneFonction(line);
        }
        if (assert(uneFonction.name + '(' + params + ') = ' + result, unVecteurDeResultats[i], result))
        {
            good ++;
        }
        else
        {
            fail ++;
        }        
        i++;
    });
    sumupTests(uneFonction.name, good, fail);
}

function shortColors()
{
    var i;
    for (i = 0; i < colors.length - 1; i++)
    {
        if (colors[i][0] > colors[i + 1][0])
        {
            var tmp;
            tmp =colors[i];
            colors[i] = colors[i + 1];
            colors[i + 1] = tmp;
        }
    }
}

/**
 * 
 * @param {string} functionName
 * @param {int} good
 * @param {int} fail
 * @returns no
 */
function sumupTests(functionName, good, fail)
{
    var i = 0;
    var newP = window.document.createElement('p');
    newP.innerHTML = functionName + ": test reussi à :" + good * 100 / fail + "%";
    shortColors();
    while (i < colors.length - 1 && colors[i][0] < good * 100 / fail)
    {
        i++;
    }
    newP.style['color'] = colors[i][1];
    window.document.querySelector('body').appendChild(newP);
}

window.addEventListener("load", function (){
    assertValues([[9,10],[8,9],[2,8],[6,7],[5,6],[4,5],[3,4],[2,3],[1,2]],[0.3,0.27,2,3,4,5,6,7,8], recupAnciennete); 
});