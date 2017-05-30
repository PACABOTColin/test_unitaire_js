/**
 * Fonction qui affiche le résultat d'un test unitaire
 *     - En vert si le test est passé
 *     - En rouge si le test a échoué
 * @param {String} message
 * @param {undefined} theoric theoric result value
 * @param {undefined} real real description must be the same type than 
 * @param {node} name description
 * @returns {bool}
 */
var colors = [[70,"red"],[90,"orange"],[95,"#00FF00"]];
function assert(message, theoric, real, contener) {
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
    contener.appendChild(monEl);
    return retour;
}
/**
 * Fonction qui procède automatiquement à des tests à l'aide des valeurs passées
 * en paramètres
 * @param {Array} unTabDeParams
 * @param {Array} unVecteurDeResultats
 * @param {function} uneFonction
 * @param {node} contener contai the node where place the results
 * @returns {void}
 */
function assertValues(unTabDeParams, unVecteurDeResultats, uneFonction, contener) 
{
    var tests_contener = window.document.createElement('div');
    tests_contener.className = "test_result"
    var fail = 0 , good = 0;
    var i = 0;
    var params;
    var result;
    var title = window.document.createElement('h1');
    tests_contener.appendChild(title);
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
        if (assert(uneFonction.name + '(' + params + ') = ' + result, unVecteurDeResultats[i], result, tests_contener))
        {
            good ++;
        }
        else
        {
            fail ++;
        }        
        i++;
    });
    sumupTests(uneFonction.name, good, fail, title);
    contener.appendChild(tests_contener);
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
 * @param {node} contener
 * @returns no
 */
function sumupTests(functionName, good, fail, contener)
{
    var i = 0;
    contener.innerHTML = functionName + ": test reussi à :<br/>" + good * 100 / (fail + good) + "%";
    shortColors();
    while (i < colors.length - 1 && colors[i][0] < good * 100 / (fail + good))
    {
        i++;
    }
    contener.style['color'] = colors[i][1];
}

window.addEventListener("load", function (){
    var tests_contener = window.document.createElement("div");
    var max_height = 0;
    window.document.querySelector('body').appendChild(tests_contener);
    assertValues([[9,10],[8,9],[2,8],[6,7],[5,6],[4,5],[3,4],[2,3],[1,2]],[0.3,0.27,2,3,4,5,6,7,8], recupAnciennete, tests_contener);
    assertValues([[9,10],[8,9],[2,8],[6,7],[5,6],[4,5],[3,4],[2,3],[1,2]],[0.3,0.27,0,3,4,5,6,7,8], recupAnciennete, tests_contener); 
    assertValues([[9,10],[8,9],[2,8],[6,7],[5,6],[4,5],[3,4],[2,3],[1,2]],[0.3,0.27,0,0.21,4,5,6,7,8], recupAnciennete, tests_contener);
    assertValues([[9,10],[8,9],[2,8],[6,7],[5,6],[4,5],[3,4],[2,3],[1,2]],[0.3,0.27,0,0.21,0.18,5,6,7,8], recupAnciennete, tests_contener); 
    assertValues([[9,10],[8,9],[2,8],[6,7],[5,6],[4,5],[3,4],[2,3],[1,2]],[0.3,0.27,0,0.21,0.18,0,6,7,8], recupAnciennete, tests_contener); 
    assertValues([[9,10],[8,9],[2,8],[6,7],[5,6],[4,5],[3,4],[2,3],[1,2]],[0.3,0.27,0,0.21,0.18,0,0,7,8], recupAnciennete, tests_contener); 
    assertValues([[9,10],[8,9],[2,8],[6,7],[5,6],[4,5],[3,4],[2,3],[1,2]],[0.3,0.27,0,0.21,0.18,0,0,0,8], recupAnciennete, tests_contener); 
    assertValues([[9,10],[8,9],[2,8],[6,7],[5,6],[4,5],[3,4],[2,3],[1,2]],[0.3,0.27,0,0.21,0.18,0,0,0,0], recupAnciennete, tests_contener);
    tests_contener.childNodes.forEach(function (element)
    {
        if (max_height < element.scrollHeight)
        {
            max_height = element.scrollHeight;
        }
    });
    tests_contener.childNodes.forEach(function (element)
    {
        element.setAttribute("style","height:" + max_height + "px;");
    });
    
});