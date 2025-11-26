/**
 * ========================================
 * SOCIALSCRIPT 
 * ========================================
 * 
 * Utilise l'API DiceBear pour les avatars (comme l'API Agify vu en cours)
 * @author Louise
 * @date Novembre 2025
 */

// ========================================
// 1. CONFIGURATION DES AVATARS (API DICEBEAR)
// ========================================

/**
 * Fonction pour générer l'URL d'un avatar via l'API DiceBear qui permet de générer des avatars aléatoires
 * seed = tjrs le même avatar pour une personne
 */
function getAvatarUrl(nom) {
    const urlAvatar = `https://api.dicebear.com/9.x/adventurer/svg?seed=${nom}`;
    return urlAvatar;
}

// ========================================
// 2. STOCKAGE DES DONNÉES
// ========================================

const scenarios = [];
const DIV_SCENARIO = document.getElementById('scenario');

// ========================================
// 3. INITIALISATION AU CHARGEMENT
// ========================================

initialization();

function initialization() {
    getAllScenarios();
}

function getAllScenarios() {
    axios.get("http://localhost:3000/scenarios")
        .then(function (response) {
            console.log("Scénarios récupérés :", response.data);
            response.data.forEach(function (scenario) {
                scenarios.push(scenario);
            });
            console.log(`${scenarios.length} scénarios chargés`);
            showLevelButtons();
        })
        .catch(function (error) {
            console.error("Erreur :", error);
            DIV_SCENARIO.innerHTML = "Erreur lors du chargement des scénarios :(";
        });
}

// ========================================
// 4. AFFICHAGE DES BOUTONS DE NIVEAU
// ========================================

function showLevelButtons() {
    DIV_SCENARIO.innerHTML = '';

    const titre = document.createElement('h2');
    titre.textContent = "Choisissez votre niveau de difficulté";
    DIV_SCENARIO.appendChild(titre);

    const niveaux = ['facile', 'moyen', 'difficile'];
    niveaux.forEach(function (niveau) {
        const btn = document.createElement('button');
        btn.textContent = niveau.charAt(0).toUpperCase() + niveau.slice(1);
        btn.classList.add('btn');
        btn.classList.add('btn-secondary');
        btn.addEventListener('click', function () {
            showScenarioByLevel(niveau);
        });
        DIV_SCENARIO.appendChild(btn);
    });
}

// ========================================
// 5. FILTRAGE PAR NIVEAU
// ========================================

function showScenarioByLevel(niveau) {
    const scenariosFiltres = [];
    for (let i = 0; i < scenarios.length; i++) {
        if (scenarios[i].niveau === niveau) {
            scenariosFiltres.push(scenarios[i]);
        }
    }

    if (scenariosFiltres.length > 0) {
        showThemeButtons(scenariosFiltres);
    }
}

// ========================================
// 6. CHOIX DU THEME 
// ========================================

function showThemeButtons(scenariosFiltres) {
    DIV_SCENARIO.innerHTML = '';

    const titre = document.createElement('h2');
    titre.textContent = 'Choisissez un thème';
    DIV_SCENARIO.appendChild(titre);

    const themes = [];
    for (let i = 0; i < scenariosFiltres.length; i++) {
        const t = scenariosFiltres[i].theme;
        if (!themes.includes(t)) themes.push(t);
    }

    for (let i = 0; i < themes.length; i++) {
        const btn = document.createElement('button');
        btn.textContent = themes[i];
        btn.classList.add('btn');
        btn.classList.add('btn-primary');
        btn.addEventListener('click', function () {
            chooseScenarioByTheme(scenariosFiltres, themes[i]);
        });
        DIV_SCENARIO.appendChild(btn);
    }

    const btnRetour = document.createElement('button');
    btnRetour.textContent = "Retour aux niveaux";
    btnRetour.classList.add('btn-return');
    btnRetour.style.marginTop = '20px';
    btnRetour.addEventListener('click', function () {
        showLevelButtons();
    });
    DIV_SCENARIO.appendChild(btnRetour);
}

function chooseScenarioByTheme(scenariosFiltres, themeChoisi) {
    for (let i = 0; i < scenariosFiltres.length; i++) {
        if (scenariosFiltres[i].theme === themeChoisi) {
            renderScenario(scenariosFiltres[i]);
            break;
        }
    }
}

// ========================================
// 7. AFFICHAGE DU SCÉNARIO
// ========================================

function renderScenario(scenario) {
    DIV_SCENARIO.innerHTML = '';


    // Titre avant l'élement interactif
    const titreContexte = document.createElement('h3'); // ou 'div' avec une classe
    titreContexte.textContent = "Contexte :";
    titreContexte.classList.add('section-title');  //** integrer au css ** /
    DIV_SCENARIO.appendChild(titreContexte);

    // CONTEXTE
    const pContexte = document.createElement('p');
    pContexte.textContent = scenario.contexte;
    pContexte.classList.add('scenario-contexte');
    DIV_SCENARIO.appendChild(pContexte);

    // INTERLOCUTEUR
    const divInterlo = document.createElement('div');
    // création div contenant avatar + question 
    divInterlo.classList.add('interlocuteur-container');
    const urlAvatar = getAvatarUrl(scenario.interlocuteur.avatar);
    const imgAvatar = document.createElement('img');
    imgAvatar.src = urlAvatar;
    imgAvatar.alt = "Avatar de " + scenario.interlocuteur.nom;
    imgAvatar.classList.add('imgAvatar');
    imgAvatar.style.verticalAlign = 'middle';
    divInterlo.appendChild(imgAvatar);

    const spanNom = document.createElement('strong'); //nom de l'interlocteur
    spanNom.textContent = " " + scenario.interlocuteur.nom;
    divInterlo.appendChild(spanNom);

    const spanReplique = document.createTextNode(': "' + scenario.interlocuteur.replique + '"');
    divInterlo.appendChild(spanReplique);

    DIV_SCENARIO.appendChild(divInterlo);

        // Titre avant l'élement interactif
    const titreOptions = document.createElement('h2'); // ou 'div' avec une classe
    titreOptions.textContent = "Choisissez une réponse :";
    titreOptions.classList.add('section-title');
    DIV_SCENARIO.appendChild(titreOptions);

    // BOUTONS OPTIONS
    for (let i = 0; i < scenario.options.length; i++) {
        const option = scenario.options[i];
        const btnOption = document.createElement('button');
        btnOption.textContent = option.texte;
        btnOption.classList.add('btn', 'option-btn');

        btnOption.addEventListener('click', function () {
            showResult(option, divResultat, urlAvatar, scenario);
        });

        DIV_SCENARIO.appendChild(btnOption);
    }

    
    // RESULTAT
    const divResultat = document.createElement('div');
    divResultat.id = 'resultDiv';
    divResultat.classList.add('result-container');
    DIV_SCENARIO.appendChild(divResultat);




    // BOUTON REJOUER (caché au départ)
    const btnRestart = document.createElement('button');
    btnRestart.textContent = "Rejouer le scénario";
    btnRestart.classList.add('restart-btn');
    btnRestart.style.marginTop = '20px';
    btnRestart.style.display = 'none';
    btnRestart.addEventListener('click', function () {
        renderScenario(scenario);
    });
    DIV_SCENARIO.appendChild(btnRestart);

    // BOUTON REVENIR AUX NIVEAUX
    const btnRetourNiveau = document.createElement('button');
    btnRetourNiveau.textContent = "Retour aux niveaux";
    btnRetourNiveau.classList.add('btn-return');
    btnRetourNiveau.style.marginTop = '10px';
    btnRetourNiveau.addEventListener('click', function () {
        showLevelButtons();
    });
    DIV_SCENARIO.appendChild(btnRetourNiveau);
}

// ========================================
// 8. AFFICHAGE DU RÉSULTAT 
// ========================================

function showResult(option, divResultat, urlAvatar, scenario) {
    // remplace le contenu de la divResultat
    divResultat.innerHTML = `
        <div class="feedback-container">
            <h3>Résultat de votre choix</h3>
            <div class="feedback-reaction">
                <strong>Réaction de l'interlocteur·ice :</strong>
                <img src="${urlAvatar}" class="imgAvatar" alt="Avatar de l'interlocuteur·ice"></img>
                <p>${option.reaction}</p>
            </div>
            <div class="feedback-analyse">
                <strong>Analyse :</strong>
                <p>${option.analyse}</p>
            </div>
            <p class="feedback-type">Type : <span>${option.type}</span></p>
        </div>
    `;
    divResultat.style.display = 'block';

//  // Masquer toutes les autres options non choisies //! ils sont dans divSCENARIO
// const tousLesBoutons = document.querySelectorAll('.option-btn');
// tousLesBoutons.forEach(btn => {
//      console.log('Texte du bouton :', btn.textContent, '| Option choisie :', option.eaction
//     if (btn.textContent !== option.texte) {
//         btn.style.display = 'none'; // cache les autres options
//     } else {
//         btn.classList.add('selected-option'); // option choisie
//     }
// });

    // Affiche le bouton Rejouer
    const btnRestart = DIV_SCENARIO.querySelector('.restart-btn');
    if (btnRestart) btnRestart.style.display = 'inline-block';
}
