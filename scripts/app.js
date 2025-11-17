//** AVATARS 
// Style défini une seule fois pour DiceBear
const AVATAR_STYLE = 'adventurer';

// Options autorisées pour chaque paramètre
const eyebrowsOptions = ['variant03','variant04','variant05','variant06','variant07','variant10','variant12','variant13','variant14','variant15'];
const eyesOptions = ['variant01','variant02','variant05','variant11','variant12','variant19','variant21','variant22','variant23','variant24','variant26'];
const featuresOptions = ['birthmark','blush','freckles','mustache'];
const glassesOptions = ['variant01','variant02','variant03','variant04','variant05'];
const hairOptions = [
    'long01','long02','long03','long04','long05','long06','long07','long08','long09','long10',
    'long11','long12','long13','long14','long15','long16','long17','long18','long19','long20',
    'long21','long22','long23','long24','long25','long26',
    'short01','short02','short03','short04','short05','short06','short07','short08','short09','short10',
    'short11','short12','short13','short14','short15','short16','short17','short18','short19'
];
const hairColorOptions = ['0e0e0e','3eac2c','6a4e35','85c2c6','796a45','562306','592454','ab2a18','ac6511','afafaf','b9a05f','cb6820','dba3be','e5d7a3'];
const mouthOptions = ['variant01','variant02','variant05','variant06','variant19','variant21','variant22','variant23','variant25','variant26','variant27','variant28','variant29','variant30'];
const skinColorOptions = ['9e5622','763900','ecad80','f2d3b1'];

// Fonction utilitaire pour choisir un élément aléatoire d'un tableau
const pick = arr => arr[Math.floor(Math.random() * arr.length)];

// Fonction pour générer l'URL d'un avatar aléatoire selon les contraintes
function getAvatarUrl(seed) {
    const params = [
        `eyebrows=${pick(eyebrowsOptions)}`,
        `eyes=${pick(eyesOptions)}`,
        `features=${pick(featuresOptions)}`,
        `glasses=${pick(glassesOptions)}`,
        `hair=${pick(hairOptions)}`,
        `hairColor=${pick(hairColorOptions)}`,
        `mouth=${pick(mouthOptions)}`,
        `skinColor=${pick(skinColorOptions)}`
    ].join('&');

    return `https://api.dicebear.com/9.x/${AVATAR_STYLE}/svg?seed=${encodeURIComponent(seed)}&${params}`;
}

//** TABLEAU DES SCENARIOS
const scenarios = [];

// Container principal
const DIV_SCENARIO = document.getElementById('scenario');

//* -------------   INITIALISATION
initialization();

async function initialization() {
    try {
        await getAllScenarios();  // récupère les scénarios via axios
        showLevelButtons();        // affiche les boutons pour choisir le niveau
    } catch(error) {
        DIV_SCENARIO.innerHTML = "Une erreur est survenue"; 
        console.error(error);
    }
}

// Fonction pour récupérer les scénarios depuis json-server
async function getAllScenarios() {
    try {
        const response = await axios.get("http://localhost:3000/scenarios");
        scenarios.push(...response.data);
    } catch(err) {
        console.log(err);
        throw err;
    }
}

//* ------------- GESTION DES NIVEAUX
function showLevelButtons() {
    DIV_SCENARIO.innerHTML = `
        <button id="btn_easy">Facile</button>
        <button id="btn_mild">Moyen</button>
        <button id="btn-hard">Difficile</button>
    `;

    document.getElementById('btn_easy').addEventListener('click', () => {
        const filtered = scenarios.filter(s => s.niveau === 'facile');
        renderScenario(filtered[0]);
    });
    document.getElementById('btn_mild').addEventListener('click', () => {
        const filtered = scenarios.filter(s => s.niveau === 'moyen');
        renderScenario(filtered[0]);
    });
    document.getElementById('btn-hard').addEventListener('click', () => {
        const filtered = scenarios.filter(s => s.niveau === 'difficile');
        renderScenario(filtered[0]);
    });
}

//** Affichage du scénario, avatar, options et zone de résultat
function renderScenario(scenario) {
    DIV_SCENARIO.innerHTML = '';

    // 1. Contexte
    const contexteEl = document.createElement('p');
    contexteEl.textContent = scenario.contexte;
    DIV_SCENARIO.appendChild(contexteEl);

    // 2. Interlocuteur + avatar
    const interloEl = document.createElement('div');
    const avatarUrl = getAvatarUrl(scenario.interlocuteur.avatar);
    interloEl.innerHTML = `
        <img src="${avatarUrl}" alt="avatar" style="width:50px; vertical-align:middle;">
        <strong>${scenario.interlocuteur.nom}</strong>: ${scenario.interlocuteur.replique}
    `;
    DIV_SCENARIO.appendChild(interloEl);

    // 3. Container pour résultat
    const RESULT_DIV = document.createElement('div');
    RESULT_DIV.id = 'resultDiv';
    DIV_SCENARIO.appendChild(RESULT_DIV);

    // 4. Options comme boutons
    scenario.options.forEach(option => {
        const btn = document.createElement('button');
        btn.textContent = option.texte;
        btn.addEventListener('click', () => handleOptionChoice(option, RESULT_DIV, scenario.options));
        DIV_SCENARIO.appendChild(btn);
    });

    // 5. Bouton "Recommencer"
    const restartBtn = document.createElement('button');
    restartBtn.textContent = "Recommencer";
    restartBtn.style.marginTop = '10px';
    restartBtn.addEventListener('click', showLevelButtons);
    DIV_SCENARIO.appendChild(restartBtn);
}

// Affichage de la réaction + analyse
function handleOptionChoice(option, resultDiv, allOptions) {
    resultDiv.innerHTML = `
        <p><strong>Réaction:</strong> ${option.reaction}</p>
        <p><strong>Analyse:</strong> ${option.analyse}</p>
    `;

    // Désactiver tous les boutons pour éviter plusieurs clics
    allOptions.forEach(opt => {
        const btns = Array.from(DIV_SCENARIO.querySelectorAll('button'));
        btns.forEach(btn => btn.disabled = true);
    });
}
