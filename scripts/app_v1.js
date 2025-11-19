/**
 * ========================================
 * SOCIALSCRIPT - SIMULATEUR D'ENTRAÎNEMENT AUX SITUATIONS SOCIALES
 * ========================================
 * 
 * Ce script gère l'affichage et l'interaction avec les scénarios sociaux.
 * Il permet aux utilisateurs de pratiquer leurs compétences relationnelles
 * dans un environnement sécurisé.
 * 
 * FONCTIONNALITÉS PRINCIPALES :
 * - Génération d'avatars aléatoires via API DiceBear
 * - Chargement des scénarios depuis un serveur JSON
 * - Sélection du niveau de difficulté (Facile / Moyen / Difficile)
 * - Affichage des options de réponse
 * - Feedback pédagogique après chaque choix
 * 
 * @author Louise
 * @date Workshop HTML/CSS/JS - Novembre 2025
 * @formation Full Stack JavaScript Developer
 */


// ========================================
// 1. CONFIGURATION DES AVATARS (API DICEBEAR)
// ========================================

/**
 * Style d'avatar utilisé pour DiceBear
 * Défini une seule fois pour maintenir la cohérence visuelle
 * 
 * @constant {string}
 * @see https://www.dicebear.com/styles/adventurer/
 */
const AVATAR_STYLE = 'adventurer';

/**
 * OPTIONS VISUELLES DISPONIBLES POUR LES AVATARS
 * 
 * Chaque tableau contient les variantes autorisées pour personnaliser
 * l'apparence des avatars générés aléatoirement (pas d'expression de colère/tristesse/...)
 */

/**
 * Styles de sourcils disponibles 
 * todo: retirer sourcil froncé
 * @constant {string[]}
 */
const eyebrowsOptions = [
    'variant03', 'variant04', 'variant05', 'variant06', 'variant07',
    'variant10', 'variant12', 'variant13', 'variant14', 'variant15'
];

/**
 * Styles d'yeux disponibles
 * @constant {string[]}
 */
const eyesOptions = [
    'variant01', 'variant02', 'variant05', 'variant11', 'variant12',
    'variant19', 'variant21', 'variant22', 'variant23', 'variant24', 'variant26'
];

/**
 * Caractéristiques faciales = toute okay
 * @constant {string[]}
 */
const featuresOptions = ['birthmark', 'blush', 'freckles', 'mustache'];

/**
 * Styles de lunettes disponibles = toute okay
 * @constant {string[]}
 */
const glassesOptions = ['variant01', 'variant02', 'variant03', 'variant04', 'variant05'];

/**
 * Styles de cheveux (longs et courts) = toute okay
 * @constant {string[]}
 */
const hairOptions = [
    'long01', 'long02', 'long03', 'long04', 'long05', 'long06', 'long07', 'long08', 'long09', 'long10',
    'long11', 'long12', 'long13', 'long14', 'long15', 'long16', 'long17', 'long18', 'long19', 'long20',
    'long21', 'long22', 'long23', 'long24', 'long25', 'long26',
    'short01', 'short02', 'short03', 'short04', 'short05', 'short06', 'short07', 'short08', 'short09', 'short10',
    'short11', 'short12', 'short13', 'short14', 'short15', 'short16', 'short17', 'short18', 'short19'
];

/**
 * Couleurs de cheveux disponibles 
 * @constant {string[]}
 */
const hairColorOptions = [
    '0e0e0e', '3eac2c', '6a4e35', '85c2c6', '796a45', '562306',
    '592454', 'ab2a18', 'ac6511', 'afafaf', 'b9a05f', 'cb6820',
    'dba3be', 'e5d7a3'
];

/**
 * Styles de bouche disponibles
 * @constant {string[]}
 */
const mouthOptions = [
    'variant01', 'variant02', 'variant05', 'variant06', 'variant19', 'variant21',
    'variant22', 'variant23', 'variant25', 'variant26', 'variant27', 'variant28',
    'variant29', 'variant30'
];

/**
 * Couleurs de peau disponibles 
 * @constant {string[]}
 */
const skinColorOptions = ['9e5622', '763900', 'ecad80', 'f2d3b1'];


// ========================================
// 2. FONCTIONS UTILITAIRES POUR LES AVATARS
// ========================================

/**
 * Fonction utilitaire pour sélectionner un élément aléatoire dans un tableau
 * Utilisée pour randomiser les options des avatars avec Math.random() génère un nombre entre 0 et 1
 * - Math.random() génère un nombre entre 0 et 1
 * - On le multiplie par la longueur du tableau
 * - Math.floor() arrondit à l'entier inférieur
 * - On obtient un index valide du tableau
 * 
 * @param {Array} arr - Le tableau dans lequel piocher
 * @returns {*} Un élément aléatoire du tableau
 */
const pick = arr => arr[Math.floor(Math.random() * arr.length)];

/**
 * Génère l'URL complète d'un avatar aléatoire via l'API DiceBear
 * 
 * FONCTIONNEMENT :
 * 1. Sélectionne aléatoirement une option pour chaque paramètre visuel
 * 2. Construit une chaîne de paramètres URL (?param1=value1&param2=value2...)
 * 3. Combine tout dans l'URL finale de l'API
 * 
 * Le paramètre 'seed' permet de générer le même avatar si on utilise la même graine,
 * utile pour la cohérence (même interlocuteur = même avatar)
 * 
 * @param {string} seed - Graine pour générer l'avatar (nom de l'interlocuteur généralement)
 * @returns {string} URL complète de l'avatar au format SVG
 * 
 * @example
 * getAvatarUrl('marie') 

 */
function getAvatarUrl(seed) {
    // Création d'un tableau contenant tous les paramètres de personnalisation
    const params = [
        `eyebrows=${pick(eyebrowsOptions)}`,      // Sourcils aléatoires
        `eyes=${pick(eyesOptions)}`,              // Yeux aléatoires
        `features=${pick(featuresOptions)}`,      // Caractéristiques faciales aléatoires
        `glasses=${pick(glassesOptions)}`,        // Lunettes aléatoires
        `hair=${pick(hairOptions)}`,              // Coiffure aléatoire
        `hairColor=${pick(hairColorOptions)}`,    // Couleur cheveux aléatoire
        `mouth=${pick(mouthOptions)}`,            // Bouche aléatoire
        `skinColor=${pick(skinColorOptions)}`     // Couleur peau aléatoire
    ].join('&'); // Joindre tous les paramètres avec '&'

    // Construction de l'URL finale
    // encodeURIComponent() sécurise la seed en cas de caractères spéciaux
    return `https://api.dicebear.com/9.x/${AVATAR_STYLE}/svg?seed=${encodeURIComponent(seed)}&${params}`;
}


// ========================================
// 3. GESTION DES DONNÉES (SCÉNARIOS)
// ========================================

/**
 * Tableau qui stockera tous les scénarios récupérés depuis le serveur
 * Initialement vide, rempli par la fonction getAllScenarios()
 * 
 * @type {Array<Object>}
 */
const scenarios = [];


// ========================================
// 4. SÉLECTION DES ÉLÉMENTS DOM
// ========================================

/**
 * Container principal où s'affichent tous les éléments dynamiques :
 * - Boutons de sélection du niveau
 * - Scénario complet (contexte, avatar, options)
 * - Résultats et feedbacks
 */

const DIV_SCENARIO = document.getElementById('scenario');


// ========================================
// 5. INITIALISATION DE L'APPLICATION
// ========================================

initialization();

/**
 * Fonction d'initialisation asynchrone
 * 
 * DÉROULEMENT :
 * 1. Récupère tous les scénarios depuis le serveur JSON (requête HTTP)
 * 2. Si succès : affiche les boutons de sélection du niveau
 * 3. Si échec : affiche un message d'erreur à l'utilisateur
 * 
 * L'utilisation de async/await permet d'attendre que les scénarios soient
 * chargés avant d'afficher l'interface (évite les bugs d'affichage)
 * 
//  * @async
//  * @returns {Promise<void>}
 */
async function initialization() {
    try {
        // Attendre que tous les scénarios soient récupérés
        await getAllScenarios();
        
        // Si tout s'est bien passé, afficher les boutons de niveau
        showLevelButtons();
        
    } catch(error) {
        // En cas d'erreur (serveur down, problème réseau...)
        DIV_SCENARIO.innerHTML = "Une erreur est survenue lors du chargement des scénarios"; 
        // todo : ajouter un image  :(

        // Log détaillé pour le développeur (visible dans la console)
        console.error('Erreur lors de l\'initialisation:', error);
    }
}

/**
 * Récupère tous les scénarios depuis le serveur JSON local via Axios
 * 
 * AXIOS vs FETCH :
 * - Axios transforme automatiquement la réponse en JSON
 * - Axios gère mieux les erreurs HTTP
 * - Pas besoin de vérifier response.ok comme avec fetch()
 * 
 * GESTION DES ERREURS :
 * - try/catch pour capturer les erreurs réseau
 * - throw err pour propager l'erreur à la fonction appelante (initialization)
 * - Permet à initialization() de gérer l'affichage de l'erreur
 * 

 */
async function getAllScenarios() {
    try {
        // Requête GET vers le serveur JSON local (port 3000)
        const response = await axios.get("http://localhost:3000/scenarios");
        
        // Ajouter tous les scénarios reçus dans notre tableau
        // L'opérateur spread (...) décompose le tableau pour l'ajouter élément par élément
        scenarios.push(...response.data);
        
        // Log pour vérifier que les scénarios sont bien chargés
        console.log(`${scenarios.length} scénarios chargés avec succès`);
        
    } catch(err) {
        // Log de l'erreur pour le debug
        console.error('Erreur lors de la récupération des scénarios:', err);
        
        // // Propager l'erreur pour que initialization() puisse la gérer
        // throw err;
    }
}


// ========================================
// 6. SÉLECTION DU NIVEAU DE DIFFICULTÉ
// ========================================

/**
 * Affiche les 3 boutons de sélection du niveau dans le container
 * 
 * FONCTIONNEMENT :
 * 1. Remplace le contenu du container par 3 boutons
 * 2. Ajoute un écouteur d'événement "click" sur chaque bouton
 * 3. Chaque clic filtre les scénarios par niveau et affiche le premier trouvé
 * 
 * @returns {void}
 */
function showLevelButtons() {
    // Création des 3 boutons dans le DOM
    DIV_SCENARIO.innerHTML = `
        <h2>Choisissez votre niveau de difficulté</h2>
        <button id="btn_easy" class="btn-level">Facile</button>
        <button id="btn_mild" class="btn-level">Moyen</button>
        <button id="btn-hard" class="btn-level">Difficile</button>
    `;

    /**
     * BOUTON NIVEAU FACILE
     * Filtre les scénarios où niveau === 'facile'
     * Affiche le premier scénario facile trouvé
     */
    document.getElementById('btn_easy').addEventListener('click', () => {
        // filter() crée un nouveau tableau avec seulement les scénarios faciles
        const filtered = scenarios.filter(s => s.niveau === 'facile');
        
        // Afficher le premier scénario facile (index [0])
        renderScenario(filtered[0]);
    });

    /**
     * BOUTON NIVEAU MOYEN
     * Filtre les scénarios où niveau === 'moyen'
     */
    document.getElementById('btn_mild').addEventListener('click', () => {
        const filtered = scenarios.filter(s => s.niveau === 'moyen');
        renderScenario(filtered[0]);
    });

    /**
     * BOUTON NIVEAU DIFFICILE
     * Filtre les scénarios où niveau === 'difficile'
     */
    document.getElementById('btn-hard').addEventListener('click', () => {
        const filtered = scenarios.filter(s => s.niveau === 'difficile');
        renderScenario(filtered[0]);
    });
}


// ========================================
// 7. AFFICHAGE DU SCÉNARIO COMPLET
// ========================================

/**
 * Affiche un scénario complet avec tous ses éléments interactifs
 * 
 * ÉLÉMENTS AFFICHÉS :
 * 1. Contexte de la situation
 * 2. Avatar et réplique de l'interlocuteur
 * 3. Zone pour afficher le résultat (vide au départ)
 * 4. Boutons pour chaque option de réponse
 * 5. Bouton "Recommencer" pour revenir à la sélection du niveau
 * 
 * MANIPULATION DU DOM :
 * - innerHTML pour insérer du HTML structuré
 * - createElement() pour créer des éléments un par un
 * - appendChild() pour ajouter les éléments au container
 * 
 * @param {Object} scenario - L'objet scénario à afficher
 * @param {string} scenario.contexte - Description de la situation
 * @param {Object} scenario.interlocuteur - Informations sur l'interlocuteur
 * @param {string} scenario.interlocuteur.nom - Nom de l'interlocuteur
 * @param {string} scenario.interlocuteur.avatar - Seed pour générer l'avatar
 * @param {string} scenario.interlocuteur.replique - Ce que dit l'interlocuteur
 * @param {Array<Object>} scenario.options - Les options de réponse possibles
 * @returns {void}
 */
function renderScenario(scenario) {
    // Vider le container pour afficher le nouveau scénario
    DIV_SCENARIO.innerHTML = '';

    // ========================================
    // 1. AFFICHAGE DU CONTEXTE
    // ========================================
    /**
     * Création d'un paragraphe pour le contexte
     * Le contexte explique la situation avant la réplique
     */
    const contexteEl = document.createElement('p');
    contexteEl.textContent = scenario.contexte;
    contexteEl.classList.add('scenario-contexte'); // Classe CSS pour le style
    DIV_SCENARIO.appendChild(contexteEl);

    // ========================================
    // 2. AFFICHAGE INTERLOCUTEUR + AVATAR
    // ========================================
    /**
     * Création d'une div pour l'interlocuteur (avatar + nom + réplique)
     * L'avatar est généré dynamiquement via getAvatarUrl()
     */
    const interloEl = document.createElement('div');
    interloEl.classList.add('interlocuteur-container');
    
    // Génération de l'URL de l'avatar basée sur la seed
    const avatarUrl = getAvatarUrl(scenario.interlocuteur.avatar);
    
    // Injection du HTML : image (avatar) + nom + réplique
    interloEl.innerHTML = `
        <img src="${avatarUrl}" 
             alt="Avatar de ${scenario.interlocuteur.nom}" 
             class="avatar-img"
             style="width:50px; vertical-align:middle;">
        <strong>${scenario.interlocuteur.nom}</strong>: 
        "${scenario.interlocuteur.replique}"
    `;
    DIV_SCENARIO.appendChild(interloEl);

    // ========================================
    // 3. CONTAINER POUR LE RÉSULTAT
    // ========================================
    /**
     * Div vide qui servira à afficher la réaction et l'analyse
     * après que l'utilisateur ait cliqué sur une option
     */
    const RESULT_DIV = document.createElement('div');
    RESULT_DIV.id = 'resultDiv';
    RESULT_DIV.classList.add('result-container');
    DIV_SCENARIO.appendChild(RESULT_DIV);

    // ========================================
    // 4. CRÉATION DES BOUTONS D'OPTIONS
    // ========================================
    /**
     * Pour chaque option de réponse, on crée un bouton
     * forEach() parcourt le tableau des options
     * 
     * Chaque bouton :
     * - Affiche le texte de l'option
     * - Au clic : appelle handleOptionChoice() avec l'option sélectionnée
     */
    scenario.options.forEach(option => {
        const btn = document.createElement('button');
        btn.textContent = option.texte;
        btn.classList.add('option-btn');
        
        // Ajout d'une classe CSS selon le type de communication
        // (pour styliser différemment selon assertif/passif/agressif)
        btn.dataset.type = option.type;
        
        // Événement click : gère le choix de l'utilisateur
        btn.addEventListener('click', () => {
            handleOptionChoice(option, RESULT_DIV, scenario.options);
        });
        
        DIV_SCENARIO.appendChild(btn);
    });

    // ========================================
    // 5. BOUTON RECOMMENCER
    // ========================================
    /**
     * Bouton pour revenir à la sélection du niveau
     * Permet de rejouer le même niveau ou d'en choisir un autre
     */
    const restartBtn = document.createElement('button');
    restartBtn.textContent = "Recommencer";
    restartBtn.classList.add('restart-btn');
    restartBtn.style.marginTop = '20px';
    
    // Au clic : retour à l'affichage des 3 boutons de niveau
    restartBtn.addEventListener('click', showLevelButtons);
    
    DIV_SCENARIO.appendChild(restartBtn);
}


// ========================================
// 8. GESTION DU CHOIX DE L'UTILISATEUR
// ========================================

/**
 * Affiche la réaction de l'interlocuteur et l'analyse pédagogique
 * après que l'utilisateur ait choisi une option
 * 
 * FONCTIONNEMENT :
 * 1. Affiche la réaction et l'analyse dans la div de résultat
 * 2. Désactive tous les boutons d'options pour empêcher de recliquer
 * 3. L'utilisateur peut alors lire le feedback et décider de recommencer
 * 
 * FEEDBACK PÉDAGOGIQUE :
 * - Réaction : Ce que l'interlocuteur répond/fait
 * - Analyse : Explication des codes sociaux, pourquoi c'est assertif/passif/agressif
 * 
 * @param {Object} option - L'option choisie par l'utilisateur
 * @param {string} option.texte - Le texte de la réponse
 * @param {string} option.type - Le type de communication (assertive, passive, agressive)
 * @param {string} option.reaction - La réaction de l'interlocuteur
 * @param {string} option.analyse - L'explication pédagogique
 * @param {HTMLDivElement} resultDiv - La div où afficher le résultat
 * @param {Array<Object>} allOptions - Toutes les options du scénario (pour les désactiver)
 * @returns {void}
 */
function handleOptionChoice(option, resultDiv, allOptions) {
    // ========================================
    // AFFICHAGE DU FEEDBACK
    // ========================================
    /**
     * Injection du HTML avec la réaction et l'analyse
     * Classes CSS pour styliser différemment selon le type de communication
     */
    resultDiv.innerHTML = `
        <div class="feedback-container" data-type="${option.type}">
            <h3>Résultat de votre choix</h3>
            <div class="feedback-reaction">
                <strong>Réaction de l'interlocuteur :</strong>
                <p>${option.reaction}</p>
            </div>
            <div class="feedback-analyse">
                <strong>Analyse (codes sociaux) :</strong>
                <p>${option.analyse}</p>
            </div>
            <p class="feedback-type">Type de communication : <span>${option.type}</span></p>
        </div>
    `;

    // Faire apparaître la div de résultat avec une petite animation
    resultDiv.style.display = 'block';

    // ========================================
    // DÉSACTIVATION DES BOUTONS
    // ========================================
    /**
     * Une fois qu'un choix est fait, on désactive tous les boutons d'options

     * 
     * FONCTIONNEMENT :
     * 1. querySelectorAll() récupère tous les boutons dans le container
     * 2. Array.from() convertit la NodeList en tableau
     * 3. forEach() parcourt tous les boutons
     * 4. On désactive chaque bouton et on ajoute une classe CSS
     */
    const allButtons = Array.from(DIV_SCENARIO.querySelectorAll('button'));
    
    allButtons.forEach(btn => {
        // Désactiver le bouton (plus cliquable)
        btn.disabled = true;
        
        // Ajouter une classe CSS pour le style visuel (opacité réduite, etc.)
        btn.classList.add('disabled');
    });

    // Réactiver uniquement le bouton "Recommencer"
    const restartBtn = DIV_SCENARIO.querySelector('.restart-btn');
    if (restartBtn) {
        restartBtn.disabled = false;
        restartBtn.classList.remove('disabled');
    }
}


// ========================================
// AMELIORATIONS POSSIBLES
// ========================================

/**
 * - Supprimer la question posés au moment de la réponse, ou faire apparaitre une progression logique plus claire (Questions posée, réponse choisies, affichage du même avatar + réaction, analyse en dessous)
 * - Randomiser le scénario choisi (pas toujours le premier du niveau)
 * - Ajouter un loader pendant le chargement des scénarios
 * - Permettre de voir toutes les options après avoir choisi

 */