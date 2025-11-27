/**
 * ========================================
 * SOCIALSCRIPT 
 * ========================================
 * 
 * Application interactive pour apprendre les interactions sociales
 * à travers différents scénarios avec choix multiples.
 * Utilise l'API DiceBear pour les avatars (comme l'API Agify vu en cours)
 * @author Louise
 * @date Novembre 2025
 */

// ========================================
// 1. CONFIGURATION DES AVATARS (API DICEBEAR)
// ========================================

/**
 * Fonction pour générer l'URL d'un avatar via l'API DiceBear
 * DiceBear est un service qui génère des avatars aléatoires
 * 
 * @param {string} nom - Le nom utilisé comme "seed" (graine)
 * @returns {string} - L'URL complète de l'avatar
 * 
 * Le "seed" garantit que le même nom donnera toujours le même avatar
 * Par exemple : "Marie" donnera toujours le même avatar Marie
 */
function getAvatarUrl(nom) {
    // Construction de l'URL avec template literals (backticks `)
    // ${nom} insère la valeur de la variable "nom" dans l'URL
    const urlAvatar = `https://api.dicebear.com/9.x/adventurer/svg?seed=${nom}`;
    return urlAvatar;
}

// ========================================
// 2. STOCKAGE DES DONNÉES
// ========================================

// Tableau vide qui contiendra tous les scénarios récupérés du serveur
const scenarios = [];

// Récupère l'élément HTML avec l'id "scenario" où tout sera affiché
// C'est la zone principale de l'application
const DIV_SCENARIO = document.getElementById('scenario');

// ========================================
// 3. INITIALISATION AU CHARGEMENT
// ========================================

// Lance la fonction d'initialisation dès que le script est chargé
initialization();

/**
 * Fonction principale d'initialisation
 * Elle est appelée automatiquement au démarrage
 */
function initialization() {
    getAllScenarios(); // Charge tous les scénarios depuis le serveur
}

/**
 * Récupère tous les scénarios depuis le serveur via une requête HTTP
 * Utilise la bibliothèque Axios pour faire des requêtes AJAX
 */
function getAllScenarios() {
    // axios.get() fait une requête GET vers le serveur local
    // Le serveur doit tourner sur http://localhost:3000
    axios.get("http://localhost:3000/scenarios")
        .then(function (response) {
            // then() s'exécute si la requête réussit
            // response.data contient les données reçues du serveur
            
            console.log("Scénarios récupérés :", response.data);
            
            // forEach() parcourt chaque élément du tableau response.data
            response.data.forEach(function (scenario) {
                // Ajoute chaque scénario dans le tableau "scenarios"
                scenarios.push(scenario);
            });
            
            console.log(`${scenarios.length} scénarios chargés`);
            
            // Une fois les scénarios chargés, affiche les boutons de niveau
            showLevelButtons();
        })
        .catch(function (error) {
            // catch() s'exécute si la requête échoue
            console.error("Erreur :", error);
            
            // Affiche un message d'erreur à l'utilisateur
            DIV_SCENARIO.innerHTML = "Erreur lors du chargement des scénarios :(";
        });
}

// ========================================
// 4. AFFICHAGE DES BOUTONS DE NIVEAU
// ========================================

/**
 * Affiche les 3 boutons de choix de niveau : facile, moyen, difficile
 * C'est le premier écran que l'utilisateur voit
 */
function showLevelButtons() {
    // Vide complètement le contenu de DIV_SCENARIO
    DIV_SCENARIO.innerHTML = '';

    // Crée un titre h2
    const titre = document.createElement('h2');
    titre.textContent = "Choisissez votre niveau de difficulté";
    // Ajoute le titre dans DIV_SCENARIO
    DIV_SCENARIO.appendChild(titre);

    // Tableau contenant les 3 niveaux disponibles
    const niveaux = ['facile', 'moyen', 'difficile'];
    
    // Pour chaque niveau, crée un bouton
    niveaux.forEach(function (niveau) {
        // Crée un élément <button>
        const btn = document.createElement('button');
        
        // Met la première lettre en majuscule (ex: "facile" → "Facile")
        // charAt(0) = première lettre, toUpperCase() = en majuscule
        // slice(1) = le reste du mot à partir de la position 1
        btn.textContent = niveau.charAt(0).toUpperCase() + niveau.slice(1);
        
        // Ajoute des classes CSS pour le style
        btn.classList.add('btn');
        btn.classList.add('btn-secondary');
        
        // Ajoute un événement "click" sur le bouton
        // Quand on clique, la fonction anonyme s'exécute
        btn.addEventListener('click', function () {
            // Affiche les scénarios du niveau choisi
            showScenarioByLevel(niveau);
        });
        
        // Ajoute le bouton dans DIV_SCENARIO
        DIV_SCENARIO.appendChild(btn);
    });
}

// ========================================
// 5. FILTRAGE PAR NIVEAU
// ========================================

/**
 * Filtre les scénarios selon le niveau choisi
 * @param {string} niveau - Le niveau choisi ('facile', 'moyen' ou 'difficile')
 */
function showScenarioByLevel(niveau) {
    // Tableau vide pour stocker les scénarios filtrés
    const scenariosFiltres = [];
    
    // Boucle classique for pour parcourir tous les scénarios
    // i commence à 0, continue tant que i < nombre de scénarios, i augmente de 1
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
// 6. CHOIX DU THEME 
// ========================================

/**
 * Affiche les boutons de choix de thème
 * @param {Array} scenariosFiltres - Les scénarios déjà filtrés par niveau
 */
function showThemeButtons(scenariosFiltres) {
    // Vide l'écran
    DIV_SCENARIO.innerHTML = '';

    // Crée le titre
    const titre = document.createElement('h2');
    titre.textContent = 'Choisissez un thème';
    DIV_SCENARIO.appendChild(titre);

    // Tableau vide pour stocker les thèmes uniques (sans doublons)
    const themes = [];
    
    // Parcourt tous les scénarios filtrés
    for (let i = 0; i < scenariosFiltres.length; i++) {
        // Récupère le thème du scénario actuel
        const t = scenariosFiltres[i].theme;
        
        // includes() vérifie si le thème est déjà dans le tableau
        // Si le thème n'est pas encore dans le tableau, on l'ajoute
        if (!themes.includes(t)) themes.push(t);
    }

    // Pour chaque thème unique, crée un bouton
    for (let i = 0; i < themes.length; i++) {
        const btn = document.createElement('button');
        btn.textContent = themes[i];
        btn.classList.add('btn');
        btn.classList.add('btn-primary');
        
        // Quand on clique, choisit un scénario de ce thème
        btn.addEventListener('click', function () {
            chooseScenarioByTheme(scenariosFiltres, themes[i]);
        });
        
        DIV_SCENARIO.appendChild(btn);
    }

    // Bouton pour revenir aux niveaux
    const btnRetour = document.createElement('button');
    btnRetour.textContent = "Retour aux niveaux";
    btnRetour.classList.add('btn-return');
    btnRetour.style.marginTop = '20px'; // Ajoute un espace en haut
    
    btnRetour.addEventListener('click', function () {
        // Retourne à l'écran de choix de niveau
        showLevelButtons();
    });
    
    DIV_SCENARIO.appendChild(btnRetour);
}

/**
 * Trouve et affiche le premier scénario correspondant au thème choisi
 * @param {Array} scenariosFiltres - Les scénarios déjà filtrés
 * @param {string} themeChoisi - Le thème sélectionné par l'utilisateur
 */
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

/**
 * Affiche un scénario complet avec contexte, interlocuteur et options
 * C'est la fonction la plus importante : elle construit toute l'interface du jeu
 * @param {Object} scenario - L'objet scénario à afficher
 */
function renderScenario(scenario) {
    // Vide l'écran pour afficher le nouveau scénario
    DIV_SCENARIO.innerHTML = '';

    // --- SECTION CONTEXTE ---
    
    // Titre de la section contexte
    const titreContexte = document.createElement('h3');
    titreContexte.textContent = "Contexte :";
    titreContexte.classList.add('section-title');
    DIV_SCENARIO.appendChild(titreContexte);

    // Paragraphe contenant le texte du contexte
    const pContexte = document.createElement('p');
    pContexte.textContent = scenario.contexte;
    pContexte.classList.add('scenario-contexte');
    DIV_SCENARIO.appendChild(pContexte);

    // --- SECTION INTERLOCUTEUR ---
    
    // Div qui contient l'avatar + le nom + la réplique
    const divInterlo = document.createElement('div');
    divInterlo.classList.add('interlocuteur-container');
    
    // Génère l'URL de l'avatar
    const urlAvatar = getAvatarUrl(scenario.interlocuteur.avatar);
    
    // Crée l'élément image
    const imgAvatar = document.createElement('img');
    imgAvatar.src = urlAvatar; // Définit la source de l'image
    imgAvatar.alt = "Avatar de " + scenario.interlocuteur.nom; // Texte alternatif pour l'accessibilité
    imgAvatar.classList.add('imgAvatar');
    imgAvatar.style.verticalAlign = 'middle'; // Aligne l'image verticalement
    divInterlo.appendChild(imgAvatar);

    // Crée un élément <strong> pour le nom en gras
    const spanNom = document.createElement('strong');
    spanNom.textContent = " " + scenario.interlocuteur.nom;
    divInterlo.appendChild(spanNom);

    // Crée un nœud de texte pour la réplique
    // createTextNode() crée du texte simple (pas un élément HTML)
    const spanReplique = document.createTextNode(': "' + scenario.interlocuteur.replique + '"');
    divInterlo.appendChild(spanReplique);

    DIV_SCENARIO.appendChild(divInterlo);

    // --- SECTION OPTIONS ---
    
    // Titre de la section options
    const titreOptions = document.createElement('h2');
    titreOptions.textContent = "Choisissez une réponse :";
    titreOptions.classList.add('section-title');
    DIV_SCENARIO.appendChild(titreOptions);

    // Crée un bouton pour chaque option de réponse
    for (let i = 0; i < scenario.options.length; i++) {
        // Récupère l'option actuelle
        const option = scenario.options[i];
        
        // Crée le bouton
        const btnOption = document.createElement('button');
        btnOption.textContent = option.texte;
        btnOption.classList.add('btn', 'option-btn');

        // Quand on clique sur l'option
        btnOption.addEventListener('click', function () {
            // Affiche le résultat de ce choix
            // On passe plusieurs paramètres à showResult()
            showResult(option, divResultat, urlAvatar, scenario);
        });

        DIV_SCENARIO.appendChild(btnOption);
    }

    // --- SECTION RÉSULTAT ---
    
    // Div vide qui contiendra le résultat après avoir cliqué sur une option
    const divResultat = document.createElement('div');
    divResultat.id = 'resultDiv';
    divResultat.classList.add('result-container');
    DIV_SCENARIO.appendChild(divResultat);

    // --- BOUTONS DE NAVIGATION ---

    // Bouton pour rejouer le même scénario (caché au départ)
    const btnRestart = document.createElement('button');
    btnRestart.textContent = "Rejouer le scénario";
    btnRestart.classList.add('restart-btn');
    btnRestart.style.marginTop = '20px';
    btnRestart.style.display = 'none'; // Le bouton est invisible au début
    
    btnRestart.addEventListener('click', function () {
        // Recharge le même scénario (remet à zéro)
        renderScenario(scenario);
    });
    
    DIV_SCENARIO.appendChild(btnRestart);

    // Bouton pour revenir à la sélection des niveaux
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

/**
 * Affiche le résultat après qu'un utilisateur a choisi une option
 * Montre la réaction de l'interlocuteur et une analyse du choix
 * 
 * @param {Object} option - L'option choisie par l'utilisateur
 * @param {HTMLElement} divResultat - La div où afficher le résultat
 * @param {string} urlAvatar - L'URL de l'avatar de l'interlocuteur
 * @param {Object} scenario - L'objet scénario complet (pour le bouton rejouer)
 */
function showResult(option, divResultat, urlAvatar, scenario) {
    // innerHTML permet d'insérer du HTML directement
    // On utilise des backticks (`) pour créer un template literal multiligne
    // ${variable} insère la valeur de la variable dans le HTML
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
    
    // Rend la div visible (elle existe déjà mais était vide)
    divResultat.style.display = 'block';

    // SECTION COMMENTÉE : Code pour masquer les autres options
    // Tu pourrais décommenter ce code si tu veux cacher les options non choisies
    /*
    const tousLesBoutons = document.querySelectorAll('.option-btn');
    tousLesBoutons.forEach(btn => {
        console.log('Texte du bouton :', btn.textContent, '| Option choisie :', option.reaction);
        if (btn.textContent !== option.texte) {
            btn.style.display = 'none'; // Cache les autres options
        } else {
            btn.classList.add('selected-option'); // Marque l'option choisie
        }
    });
    */

    // Affiche le bouton "Rejouer"
    // querySelector() cherche le premier élément avec la classe 'restart-btn'
    const btnRestart = DIV_SCENARIO.querySelector('.restart-btn');
    
    // Si le bouton existe (vérification de sécurité)
    if (btnRestart) {
        // Le rend visible
        btnRestart.style.display = 'inline-block';
    }
}

/**
 * ========================================
 * RÉSUMÉ DU FLUX DE L'APPLICATION
 * ========================================
 * 
 * 1. Au chargement : initialization() → getAllScenarios()
 * 2. Récupération des scénarios du serveur avec Axios
 * 3. Affichage des 3 niveaux : showLevelButtons()
 * 4. Utilisateur choisit un niveau → showScenarioByLevel()
 * 5. Filtrage des scénarios par niveau
 * 6. Affichage des thèmes : showThemeButtons()
 * 7. Utilisateur choisit un thème → chooseScenarioByTheme()
 * 8. Affichage du scénario complet : renderScenario()
 * 9. Utilisateur choisit une option → showResult()
 * 10. Affichage du feedback et possibilité de rejouer
 * 
 * ========================================
 * CONCEPTS JAVASCRIPT UTILISÉS
 * ========================================
 * 
 * - Variables : const, let
 * - Fonctions : function maFonction() {}
 * - Tableaux : [], push(), forEach(), length
 * - Objets : {propriété: valeur}
 * - DOM : document.createElement(), appendChild(), innerHTML
 * - Événements : addEventListener('click', function)
 * - Requêtes HTTP : axios.get().then().catch()
 * - Template literals : `texte ${variable}`
 * - Boucles : for, forEach
 * - Conditions : if, ===
 * - Méthodes de string : charAt(), toUpperCase(), slice()
 */