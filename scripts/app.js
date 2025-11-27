/*

 * SOCIALSCRIPT 
 * ========================================
 * @author Louise
 * @date Novembre 2025
 */

// ========================================
// CONFIGURATION DES AVATARS (API DICEBEAR)
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

// Tableau vide qui contiendra tous les scénarios récupérés du serveur
const scenarios = [];
// Récupère l'élément HTML Scenario où tout sera affiché
const DIV_SCENARIO = document.getElementById('scenario');

// ========================================
// 3. INITIALISATION AU CHARGEMENT
// ========================================

// Lance la fonction d'initialisation dès que le script est chargé
initialization();

function initialization() {
    showLoadingMessage(); //Message de chargement avant chargement scenario
    getAllScenarios(); // Charge tous les scénarios depuis le serveur
}

/**
 * Message de chargement avec un gif 🐈‍⬛
 * Pendant que les scénarios sont récupérés du serveur
 */
function showLoadingMessage() {
    DIV_SCENARIO.innerHTML = `
        <div class="loading-container" style="text-align: center">
            <img src="https://media.tenor.com/X5ATMhUr7PgAAAAi/blu-zushi-cat.gif" 
                 alt="Gif d'un chat qui tourne pour indiquer le chargement en cours" 
                 style="width: 200px; height: 200px;">
            <p>Veuillez patienter pendant le chargement des scénarios...</p>
        </div>
    `;
}

/**
 * Récupère tous les scénarios depuis le serveur via une requête HTTP
 * Utilise la bibliothèque Axios pour faire des requêtes AJAX
 */
function getAllScenarios() {
    // axios.get() fait une requête GET vers le serveur local
    axios.get("http://localhost:3000/scenarios")
        .then(function (response) {
            // then() s'exécute si la requête réussit
            // response.data contient les données reçues du serveur
            console.log("Scénarios récupérés :", response.data);
            // forEach() => parcourt chaque élément du tableau response.data
            response.data.forEach(function (scenario) {
                // Ajoute chaque scénario dans le tableau scenarios
                scenarios.push(scenario);
            });
            console.log(`${scenarios.length} scénarios chargés`);
            // Affichage des boutons de niveau
            showLevelButtons();
        })
        .catch(function (error) {
            // catch() s'exécute si la requête échoue
            console.error("Erreur :", error);
            // Affiche un message d'erreur + image triste 😿
            // * petit problème d'image qui ne s'affiche qu'une seconde 
            DIV_SCENARIO.innerHTML = `
            <div class="loading-container" style="text-align: center">
                <img src="img/cryingcatpixel.png" alt="chat obèse qui pleure car il y a eu une erreur de chargement de page" width="150" height="150">
                <p>Erreur lors du chargement des scénarios :(</p>
            `;
        });
}

// ========================================
// AFFICHAGE DES BOUTONS DE NIVEAU
// ========================================

function showLevelButtons() {
    // Vide complètement le contenu de DIV_SCENARIO
    DIV_SCENARIO.innerHTML = '';

    const titre = document.createElement('h2');   // Crée un titre h2
    titre.textContent = "Choisissez votre niveau de difficulté";
    // Ajoute le titre dans DIV_SCENARIO
    DIV_SCENARIO.appendChild(titre);

    // Crée un container pour les boutons
    const containerBoutons = document.createElement('div');
    containerBoutons.classList.add('container-btn-level');

    // Tableau contenant les 3 niveaux disponibles
    const niveaux = ['Facile', 'Moyen', 'Difficile'];

    // Pour chaque niveau, crée un bouton
    niveaux.forEach(function (niveau) {
        // Crée un élément <button>
        const btn = document.createElement('button');
        btn.textContent = niveau;
        btn.classList.add('btn', 'btn-secondary'); //ajouter plusieur classes
        // evenement qui lance la fonction
        // todo : rajouter un keydown pour accessibilité
        btn.addEventListener('click', function () {
            // Affiche les scénarios du niveau choisi
            showScenarioByLevel(niveau);
        });
        // Ajoute le btn dans le container 
        containerBoutons.appendChild(btn);

    });
    //   Ajoute le containerbtn dans DIV_SCENARIO
    DIV_SCENARIO.appendChild(containerBoutons);
}

// ========================================
// 5. FILTRAGE PAR NIVEAU
// ========================================

function showScenarioByLevel(niveau) {
    // Tableau vide pour stocker les scénarios filtrés
    const scenariosFiltres = [];
    // Boucle for pour parcourir tous les scénarios
    //  i commence à 0, continue tant que i < nombre de scénarios, i augmente de 1
    for (let i = 0; i < scenarios.length; i++) {
        // Si le niveau du scénario correspond au niveau choisi
        if (scenarios[i].niveau === niveau) {
            // Ajoute ce scénario dans le tableau filtré
            scenariosFiltres.push(scenarios[i]);
        }
    }
    // Si on a trouvé au moins un scénario
    if (scenariosFiltres.length > 0) {
        // Affiche les boutons de thème pour ces scénarios
        showThemeButtons(scenariosFiltres);
    }
}

// ========================================
// CHOIX DU THEME 
// ========================================

//    Crée un container pour les boutons
// const containerBoutons = document.createElement('div');
// containerBoutons.classList.add('container-btn-level');

function showThemeButtons(scenariosFiltres) {
    // Vide la DIV
    DIV_SCENARIO.innerHTML = '';
    // Crée le titre
    const titre = document.createElement('h2');
    titre.textContent = 'Choisissez un thème';
    titre.style.textAlign = 'center';  
    DIV_SCENARIO.appendChild(titre);

    // Crée un container pour les boutons thème
    const containerBoutonsTheme = document.createElement('div');
    containerBoutonsTheme.classList.add('container-btn-theme');

    // Tableau vide pour stocker les thèmes uniques
    const themes = [];

    // Boucle for => parcourt tous les scénarios filtrés
    for (let i = 0; i < scenariosFiltres.length; i++) {
        const t = scenariosFiltres[i].theme;
        // includes() vérifie si le thème est déjà dans le tableau
        // Si le thème n'est pas encore dans le tableau, on l'ajoute
        if (!themes.includes(t)) themes.push(t);
    }
    // Recherche de doublon 
    // themes.includes(t) => vérifie si le thème "t" est déjà dans le tableau
    // Le ! = inverse le résultat 
    //   - includes(t) = true  → !includes(t) = false → n'ajoute pas
    //

    // Pour chaque thème unique, crée un bouton
    for (let i = 0; i < themes.length; i++) {
        const btn = document.createElement('button');
        btn.textContent = themes[i];
        btn.classList.add('btn', 'btn-primary');

        // Ajoute les btns dans le container Theme
        containerBoutonsTheme.appendChild(btn);

        // Quand on clique, choisit un scénario de ce thème
        // todo : rajouter un keydown pour accessibilité
        btn.addEventListener('click', function () {
            chooseScenarioByTheme(scenariosFiltres, themes[i]);
        });
        DIV_SCENARIO.appendChild(containerBoutonsTheme);
    }
    // Bouton pour revenir aux niveaux
    //! ici container

    
    // Crée un container pour les boutons options
    const containerBoutonsRetour= document.createElement('div');
    containerBoutonsRetour.classList.add('container-btn-nav');


    const btnRetour = document.createElement('button');
    btnRetour.textContent = "Retour aux niveaux";
    btnRetour.classList.add('btn', 'btn-return');
    // btnRetour.style.marginTop = '20px';
    btnRetour.addEventListener('click', function () {
        // Retourne à l'écran de choix de niveau
        showLevelButtons();

    });
        containerBoutonsRetour.appendChild(btnRetour);
    // Ajoute le container au DOM
    DIV_SCENARIO.appendChild(containerBoutonsRetour);

}

// todo : param 
// Trouve et affiche le premier scénario correspondant au thème choisi
function chooseScenarioByTheme(scenariosFiltres, themeChoisi) {
    // Parcourt les scénarios filtrés
    for (let i = 0; i < scenariosFiltres.length; i++) {
        // Si le thème correspond
        if (scenariosFiltres[i].theme === themeChoisi) {
            // Affiche ce scénario
            renderScenario(scenariosFiltres[i]);
            // break arrête la boucle (on ne prend que le premier)
            break;
        }
    }
}

// ========================================
// 7. AFFICHAGE DU SCÉNARIO
// ========================================

function renderScenario(scenario) {
    // Vide l'écran pour afficher le nouveau scénario
    DIV_SCENARIO.innerHTML = '';

    // --- SECTION CONTEXTE ---

    // Titre de la section contexte
    const titreContexte = document.createElement('h3'); // ? ou 'div' avec une classe
    titreContexte.textContent = "Contexte :";
    titreContexte.classList.add('section-title');  //todo :integrer au css ** /
    DIV_SCENARIO.appendChild(titreContexte);

    // Paragraphe contenant le texte du contexte
    const pContexte = document.createElement('p');
    pContexte.textContent = scenario.contexte;
    pContexte.classList.add('scenario-contexte');
    DIV_SCENARIO.appendChild(pContexte);

    // --- SECTION INTERLOCUTEUR ---

    // Div qui contient l'avatar + le nom + la réplique
    const divInterlo = document.createElement('div');
    // création div contenant avatar + question 
    divInterlo.classList.add('interlocuteur-container');

    // Génère l'URL de l'avatar
    const urlAvatar = getAvatarUrl(scenario.interlocuteur.avatar);

    // Crée l'élément image
    const imgAvatar = document.createElement('img');
    imgAvatar.src = urlAvatar;
    imgAvatar.alt = "Avatar de " + scenario.interlocuteur.nom;
    imgAvatar.classList.add('imgAvatar');
    // imgAvatar.style.verticalAlign = 'middle';
    divInterlo.appendChild(imgAvatar);

    // Crée un élément <strong> pour le nom en gras
    const spanNom = document.createElement('strong'); //nom de l'interlocteur
    spanNom.textContent = " " + scenario.interlocuteur.nom;
    divInterlo.appendChild(spanNom);

    // Crée un nœud de texte pour la réplique
    // createTextNode() crée du texte simple (pas un élément HTML)
    const spanReplique = document.createTextNode(': "' + scenario.interlocuteur.replique + '"');
    divInterlo.appendChild(spanReplique);

    DIV_SCENARIO.appendChild(divInterlo);

    // --- SECTION OPTIONS ---

    // Titre de la section options
    const titreOptions = document.createElement('h2'); // ou 'div' avec une classe
    titreOptions.textContent = "Choisissez une réponse :";
    titreOptions.classList.add('section-title'); 
    DIV_SCENARIO.appendChild(titreOptions);

    // Crée un container pour les boutons options
    const containerBoutonsOption = document.createElement('div');
    containerBoutonsOption.classList.add('container-btn-option');

    
         // Crée les boutons options
    scenario.options.forEach(option => {
        const btnOption = document.createElement('button');
        btnOption.textContent = option.texte;
        btnOption.classList.add('btn', 'option-btn');
        btnOption.addEventListener('click', () => showResult(option, divResultat, urlAvatar, scenario,btnOption));
        containerBoutonsOption.appendChild(btnOption);
    });


    DIV_SCENARIO.appendChild(containerBoutonsOption);

    // Div résultat unique
    const divResultat = document.createElement('div');
    divResultat.id = 'resultDiv';
    divResultat.classList.add('result-container');
    DIV_SCENARIO.appendChild(divResultat);

      // Container navigation
    const containerBoutonsNav = document.createElement('div');
    containerBoutonsNav.classList.add('container-btn-nav');

    const btnRetourNiveau = document.createElement('button');
    btnRetourNiveau.textContent = "Retour aux niveaux";
    btnRetourNiveau.classList.add('btn', 'btn-return');
    btnRetourNiveau.addEventListener('click', () => showLevelButtons());
    containerBoutonsNav.appendChild(btnRetourNiveau);

     DIV_SCENARIO.appendChild(containerBoutonsNav);

}

    // // Crée un bouton pour chaque option de réponse
    // for (let i = 0; i < scenario.options.length; i++) {
    //     // Récupère l'option actuelle
    //     const option = scenario.options[i];
    //     // Crée le bouton
    //     const btnOption = document.createElement('button');
    //     btnOption.textContent = option.texte;
    //     btnOption.classList.add('btn', 'option-btn');
    //     // Quand on clique sur l'option
    //     btnOption.addEventListener('click', function () {
    //         // Affiche le résultat de ce choix
    //         // On passe plusieurs paramètres à showResult()
    //         showResult(option, divResultat, urlAvatar, scenario);
    //     });
    //     // Ajoute les btns dans le container Options
    //     containerBoutonsOption.appendChild(btnOption);
    // }

    // // Ajoute le container dans DIV SCENARIO
    // DIV_SCENARIO.appendChild(containerBoutonsOption);

    // --- SECTION RÉSULTAT ---

    // Div vide qui contiendra le résultat après avoir cliqué sur une option
//     const divResultat = document.createElement('div');
//     divResultat.id = 'resultDiv';
//     divResultat.classList.add('result-container');
//     DIV_SCENARIO.appendChild(divResultat);

//     // --- BOUTONS DE NAVIGATION ---
//    // Crée un container pour les boutons nav
//     const containerBoutonsNav = document.createElement('div');
//     containerBoutonsNav.classList.add('container-btn-nav');


    // // Bouton pour rejouer le même scénario (caché au départ)
    // const btnRestart = document.createElement('button');
    // btnRestart.textContent = "Rejouer le scénario";
    // btnRestart.classList.add('btn', 'restart-btn');
    // // btnRestart.style.marginTop = '20px';
    // btnRestart.style.display = 'none';  // Le bouton est invisible
 
    // btnRestart.addEventListener('click', function () {
    //     // Recharge le même scénario (remet à zéro)
    //     renderScenario(scenario);
    // });

//     // Bouton pour revenir à la sélection des niveaux
//     const btnRetourNiveau = document.createElement('button');
//     btnRetourNiveau.textContent = "Retour aux niveaux";
//     btnRetourNiveau.classList.add('btn', 'btn-return');
//     // btnRetourNiveau.style.marginTop = '10px';
//     btnRetourNiveau.addEventListener('click', function () {
//         showLevelButtons();
//     });
//     // DIV_SCENARIO.appendChild(btnRetourNiveau,);

//     // Ajoute le btn Restart + Retour dans le container Nav
//     containerBoutonsNav.append(btnRetourNiveau);

//     // Ajoute le container dans DIV SCENARIO
//     DIV_SCENARIO.appendChild(containerBoutonsNav);

//      // Div résultat
//     const divResultat = document.createElement('div');
//     divResultat.id = 'resultDiv';
//     divResultat.classList.add('result-container');
//     DIV_SCENARIO.appendChild(divResultat);
// }

// ========================================
// AFFICHAGE DU RÉSULTAT 
// ========================================

function showResult(option, divResultat, urlAvatar, scenario,btnOption) {
    divResultat.innerHTML = `
        <div class="feedback-container">
            <h3>Résultat de votre choix</h3>
            <div class="feedback-reaction">
                <strong>Réaction de l'interlocuteur·ice :</strong>
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

    // Désactive tous les boutons d'options 
    const tousLesBoutons = DIV_SCENARIO.querySelectorAll('.option-btn');
    tousLesBoutons.forEach(btn => btn.disabled = true);

     // Ajoute une classe spéciale au bouton choisi
    btnOption.classList.add('option-choisie');

    // Ajoute dynamiquement le bouton Rejouer
    const btnRestart = document.createElement('button');
    btnRestart.textContent = "Rejouer le scénario";
    btnRestart.classList.add('btn', 'restart-btn');
    btnRestart.addEventListener('click', () => renderScenario(scenario));

    const containerNav = DIV_SCENARIO.querySelector('.container-btn-nav');
    containerNav.appendChild(btnRestart);
}

// function showResult(option, divResultat, urlAvatar, scenario) {
//     // remplace le contenu de la divResultat
//     divResultat.innerHTML = `
//         <div class="feedback-container">
//             <h3>Résultat de votre choix</h3>
//             <div class="feedback-reaction">
//                 <strong>Réaction de l'interlocteur·ice :</strong>
//                 <img src="${urlAvatar}" class="imgAvatar" alt="Avatar de l'interlocuteur·ice"></img>
//                 <p>${option.reaction}</p>
//             </div>
//             <div class="feedback-analyse">
//                 <strong>Analyse :</strong>
//                 <p>${option.analyse}</p>
//             </div>
//             <p class="feedback-type">Type : <span>${option.type}</span></p>
//         </div>
//     `;
//     // Rend la div visible 
//     divResultat.style.display = 'block';

//     //  // Masquer toutes les autres options non choisies //! ils sont dans divSCENARIO
//     // const tousLesBoutons = document.querySelectorAll('.option-btn');
//     // tousLesBoutons.forEach(btn => {
//     //      console.log('Texte du bouton :', btn.textContent, '| Option choisie :', option.eaction
//     //     if (btn.textContent !== option.texte) {
//     //         btn.style.display = 'none'; // cache les autres options
//     //     } else {
//     //         btn.classList.add('selected-option'); // option choisie
//     //     }
//     // });

//    // Crée le bouton Rejouer
//     const btnRestart = document.createElement('button');
//     btnRestart.textContent = "Rejouer le scénario";
//     btnRestart.classList.add('btn', 'restart-btn');
//     btnRestart.addEventListener('click', function () {
//         renderScenario(scenario);
//     });

//     // Ajoute le bouton Rejouer dans le container nav déjà existant
//     const containerNav = DIV_SCENARIO.querySelector('.container-btn-nav');
//     containerNav.appendChild(btnRestart);
// }
