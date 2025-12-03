// ==========================================
// TABLEAU DE RESSOURCES
// ==========================================

const resources = [
    // Associations
    {
        title: "Collectif Autiste de Belgique",
        labels: ["association", "communauté-autiste", "belgique"],
        description: "Collectif créé par et pour les personnes autistes adultes ou en questionnement en Belgique francophone. Le but est de répondre à diverses carences du système belge concernant la prise en charge de l'autisme chez l'adulte et de créer un espace d'entraide et de partage.",
        image: "/img/ressources/collectifautismebelgique.png",
        links: [
            { text: "Site internet", url: "https://collectifautiste.be/" }
        ]
    },
    {
        title: "CLE autistes",
        labels: ["association", "communauté-autiste", "france"],
        description: "Le Collectif pour la Liberté d'Expression des Autistes défend les droits et la parole des personnes autistes en France. L'association milite pour une société plus inclusive et lutte contre les discriminations tout en promouvant l'auto-représentation des personnes autistes.",
        image: "/img/ressources/cle.jpg",
        links: [
            { text: "Site internet", url: "https://cle-autistes.fr/" }
        ]
    },
    {
        title: "Autistes Associé·es",
        labels: ["association", "groupe-de-parole", "communauté-autiste", "belgique"],
        description: "Association par et pour des personnes autistes, basée à Liège. Iels proposent diverses activités comme des permanences hebdomadaires, des ateliers thématiques ou des après-midis en espace libre pour se rencontrer et échanger dans un cadre bienveillant et accessible.",
        image: "/img/ressources/autisteassocies.png",
        links: [
            { text: "Site internet", url: "https://blogs.bawet.org/autistesassociees/" }
        ]
    },
    {
        title: "ESAES",
        labels: ["association", "étudiants", "communauté-autiste", "belgique"],
        description: "Association de fait qui a pour but de soutenir les étudiant·es autistes de l'enseignement supérieur francophone de Belgique. L'association rassemble aussi bien des personnes autistes que des personnes alliées et organise des rencontres, événements et actions de sensibilisation.",
        image: "/img/ressources/logo-esaes.png",
        links: [
            { text: "Serveur Discord", url: "https://discord.com/invite/w7pAnDcc3c" }
        ]
    },
    {
        title: "Discord du Collectif Autisme Belgique",
        labels: ["groupe-de-parole", "communauté-autiste", "en-ligne"],
        description: "Un espace numérique convivial pour échanger, poser des questions, partager des ressources et rencontrer d'autres personnes autistes ou en questionnement. Différents salons thématiques disponibles.",
        image: "/img/ressources/discord.jpg",
        links: [
            { text: "Serveur Discord", url: "http://discord.gg/4amTYxxwHs" }
        ]
    },
    {
        title: "LAVA",
        labels: ["association", "recherche", "sensibilisation", "belgique"],
        description: "Réseau belge de personnes autistes qui promeuvent leur propre production de savoirs sur l'autisme et le dialogue avec la recherche scientifique. LAVA organise des conférences, ateliers et événements de sensibilisation.",
        image: "/img/ressources/laval_logo.avif",
        links: [
            { text: "Site internet", url: "https://www.lavavzw.be/" }
        ]
    },
    {
        title: "Handikapables",
        labels: ["association", "handicap", "belgique"],
        description: "ASBL bruxelloise dont le but est d'offrir un lieu convivial et accessible pour les personnes en situation de handicap et de sensibiliser la société aux difficultés auxquelles elles peuvent faire face. L'association organise des événements culturels, des ateliers et des actions de terrain inclusives.",
        image: "/img/ressources/handikapables.jpg",
        links: [
            { text: "Page Facebook", url: "https://www.facebook.com/Handikapables/" }
        ]
    },
    {
        title: "F.R.i.D.A",
        labels: ["association", "féminisme", "intersectionnalité", "validisme"],
        description: "Collective Féministe Radicalement Inclusive et Définitivement Anti-validiste. Collective de femmes handicapées racisées qui milite pour l'intersectionnalité des luttes et la visibilité des personnes handicapées racisées. Propose des contenus militants, des ressources et du soutien communautaire.",
        image: "/img/ressources/frida.jpg",
        links: [
            { text: "Page Instagram", url: "https://www.instagram.com/collectivefrida/?hl=fr" }
        ]
    },
    {
        title: "Les Dévalideuses",
        labels: ["association", "féminisme", "handicap", "france"],
        description: "Association française handi-féministe créée par et pour les femmes et personnes non-binaires handicapées. Beaucoup de ressources informatives, pratiques et militantes à trouver sur leur site internet et leurs réseaux sociaux. Elles organisent également des événements et des actions de sensibilisation.",
        image: "/img/ressources/devalideuses.jpg",
        links: [
            { text: "Site internet", url: "https://lesdevalideuses.org" }
        ]
    },

    // Livres / lectures
    {
        title: "Laziness Does Not Exist",
        labels: ["livre", "essai", "anglais", "neurodivergence"],
        description: "Essai en anglais qui déconstruit le mythe de la paresse et explore comment le capitalisme et les normes sociales imposent une productivité toxique. Particulièrement pertinent pour les personnes neurodivergentes qui subissent souvent des jugements sur leur fonctionnement différent.",
        image: "/img/ressources/laziness9.jpg",
        links: [
            { text: "Commander", url: "https://www.worldofbooks.com/en-gb/products/laziness-does-not-exist-book-devon-price-phd-9781982140113" }
        ]
    },
    {
        title: "Unmasking Autism",
        labels: ["livre", "essai", "anglais", "masking", "communauté-autiste"],
        description: "Livre en anglais écrit par un psychologue autiste qui explore le concept de 'masking' (masquage social) chez les personnes autistes. L'ouvrage offre des outils concrets pour accepter son autisme et vivre de manière plus authentique, tout en déconstruisant les stéréotypes.",
        image: "/img/ressources/unmasking.webp",
        links: [
            { text: "Commander", url: "https://www.worldofbooks.com/en-gb/products/unmasking-autism-book-devon-price-9781800960541" }
        ]
    },
    {
        title: "La différence invisible",
        labels: ["livre", "BD", "témoignage", "diagnostic", "débutant"],
        description: "Roman graphique touchant qui raconte le parcours de Marguerite, une jeune femme autiste qui découvre tardivement son diagnostic. Une BD pédagogique et émouvante qui permet de mieux comprendre l'autisme au féminin et le quotidien des personnes concernées. Idéal pour découvrir le sujet.",
        image: "/img/ressources/differenceinvisible.jpg",
        links: [
            { text: "Commander", url: "https://www.librel.be/livre/9782756072678-la-difference-invisible-julie-dachez-mademoiselle-caroline/" }
        ]
    },
    {
        title: "Comprendre l'autisme",
        labels: ["site-web", "vulgarisation", "sensibilisation", "débutant"],
        description: "Plateforme en ligne qui propose des articles de vulgarisation scientifique et des synthèses de recherches récentes sur l'autisme. Le site démystifie de nombreuses idées reçues et offre des informations fiables, accessibles et régulièrement mises à jour.",
        image: "/img/ressources/LogoComprendreAutisme.png",
        links: [
            { text: "Site internet", url: "https://comprendrelautisme.com/" }
        ]
    },

    // Vidéos et podcasts
    {
        title: "Je ne suis pas votre source d'inspiration, merci",
        labels: ["video", "validisme", "anglais", "sensibilisation"],
        description: "Mini-conférence de Stella Young dans laquelle elle explique ce qu'elle appelle 'inspiration porn' : l'objectivation des personnes handicapées.",
        image: "https://i.ytimg.com/vi/8K9Gg164Bsw/maxresdefault.jpg",
        links: [
            { text: "TED talk", url: "https://www.youtube.com/watch?v=8K9Gg164Bsw" }
        ]
    },
    {
        title: "Le validisme",
        labels: ["podcast", "validisme", "féminisme"],
        description: "Cet épisode du podcast Petite Mu, présenté par Alice Devès, est consacré au validisme avec comme invité·es Chiara Kahn, journaliste et activiste handi-féministe, et Kendrys Legendrys, cofondateur de La Fabrique des soignants et patient concerné.",
        image: "https://image.ausha.co/JH89zNvLHwj2TP6qCXQqELzchbB2dI23ayXrCdNz_400x400.jpeg",
        links: [
            { text: "Podcast", url: "https://podcast.ausha.co/invisible-by-petite-mu/01-le-validisme-avec-chiara-kahn-et-kendrys-legendrys" }
        ]
    },
    {
        title: "Le handicap est une construction sociale",
        labels: ["podcast", "validisme", "féminisme"],
        description: "Cet épisode du podcast Présages, présenté par Charlotte Puiseux, docteure en philosophie, psychologue, et militante handi-féministe au sein du collectif Les Dévalideuses et de l'association Handiparentalité.",
        image: "https://asset.vodify.fr/img/imago/content/podcast/thumbnail/presages.jpg",
        links: [
            { text: "Podcast", url: "https://www.youtube.com/watch?v=KgUtE8jMbbc" }
        ]
    },
    {
        title: "Handicap : la hiérarchie des vies",
        labels: ["podcast", "validisme", "sensibilisation"],
        description: "Série de quatre épisodes de l'émission La Série Documentaire (France Culture) qui réunit les réalités diverses derrière le terme de 'Handicap' selon un dénominateur commun : le traitement social.",
        image: "https://www.radiofrance.fr/s3/cruiser-production-eu3/2024/11/1f1e5b15-c949-496a-a318-07dfd33a0d41/400x400_sc_carre.jpg",
        links: [
            { text: "Podcast", url: "https://www.radiofrance.fr/franceculture/podcasts/serie-handicap-la-hierarchie-des-vies#concept-abouts" }
        ]
    },
    {
        title: "Féminismes et handicaps : les corps indociles",
        labels: ["podcast", "validisme", "féminisme", "intersectionnalité"],
        description: "Un épisode d'Un Podcast à Soi de Charlotte Bienaimé qui se demande comment penser ensemble lutte contre le sexisme et contre le validisme ? Que peuvent apporter les réflexions alternatives sur le handicap aux études de genre et aux études queer, et inversement ? Pourquoi le handicap est-il un enjeu féministe ?",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpSb3bqF0uXLk34zGts3SJRCRVWbwKrUL6wTot1px8mRIxGCmbbpLjzqdl48ce3ZDF364&usqp=CAU",
        links: [
            { text: "Podcast", url: "https://educ.arte.tv/program/un-podcast-a-soi-feminismes-et-handicaps-les-corps-indociles" }
        ]
    },
    {
        title: "Purple Ella",
        labels: ["video", "chaine-youtube", "TDAH", "parentalité", "témoignage"],
        description: "Chaîne YouTube francophone qui aborde l'autisme sous tous ses aspects, le TDAH, le syndrome d'Ehlers-Danlos, la fatigue chronique, ainsi que la parentalité et la vie de couple avec ces conditions. Contenus authentiques et accessibles par une personne concernée.",
        image: "https://www.bristolautismsupport.org/wp-content/uploads/2024/03/channels4_profile.jpg",
        links: [
            { text: "Chaîne YouTube", url: "https://www.youtube.com/c/PurpleElla" }
        ]
    },
    {
        title: "Alistair @HParadoxa",
        labels: ["video", "chaine-youtube", "queer", "handicap", "vulgarisation"],
        description: "Chaîne YouTube de vulgarisation sur les enjeux queer et de handicap par une personne concernée. Contenu éducatif et engagé qui croise les perspectives sur l'identité de genre et le validisme.",
        image: "https://ugc.production.linktr.ee/p5cd2ETHTtOdXC01jsvO_kMl3ayw4F3XxrSDx?io=true&size=avatar-v3_0",
        links: [
            { text: "Chaîne YouTube", url: "https://www.youtube.com/watch?v=JpRtcjVLNro&list=PLr5PmuMxokE8BdiALZsF0z0szEvhKCU48" }
        ]
    },
    {
        title: "La théorie des cuillères",
        labels: ["video", "fatigue", "handicap", "vulgarisation"],
        description: "Vidéo de Julie Dachez qui explique la théorie des cuillères de Christine Miserandino, un outil métaphorique pour comprendre la gestion de l'énergie limitée des personnes vivant avec une maladie chronique ou un handicap invisible.",
        image: "https://delautrecotedelablouse.wordpress.com/wp-content/uploads/2017/07/9d0407e2022de6b728949ae00c994241-chronic-illness-chronic-pain.jpg",
        links: [
            { text: "Vidéo YouTube", url: "https://www.youtube.com/watch?v=joucXLKXbO8" }
        ]
    }
];

// ==========================================
// FONCTION D'AFFICHAGE DES CARTES
// ==========================================
function displayResources(resourcesToShow, containerId) {
    // Récupère le container où on mettra les cartes
const container = document.getElementById(containerId);
    container.innerHTML = ""; // Vide le container avant d'ajouter les nouvelles cartes

    // Boucle sur chaque ressource du tableau
    resourcesToShow.forEach(resource => {
        // Crée l'article (la carte)
        const card = document.createElement("article");
        card.classList.add("card");

        // -----------------------------
        // IMAGE
        // -----------------------------
        if (resource.image) {
            const img = document.createElement("img");
            img.src = resource.image;
            img.alt = `Logo ${resource.title}`;
            card.appendChild(img);
        }

        // -----------------------------
        // TITRE
        // -----------------------------
        const h4 = document.createElement("h5");
        h4.textContent = resource.title;
        card.appendChild(h4);

        // -----------------------------
        // DESCRIPTION
        // -----------------------------
        const p = document.createElement("p");
        p.textContent = resource.description;
        card.appendChild(p);

        // -----------------------------
        // LIENS
        // -----------------------------
        resource.links.forEach(link => {
            const a = document.createElement("a");
            a.href = link.url;
            a.target = "_blank";
            a.textContent = link.text;
           a.classList.add("btn", "btn-secondary-light");
            card.appendChild(a);
        });

        // -----------------------------
        // ACCESSIBILITÉ : rendre la carte entière cliquable sur le 1er lien
        // -----------------------------
        if (resource.links && resource.links.length > 0) {
            card.setAttribute("role", "link");
            card.setAttribute("tabindex", "0"); // permet tabulation
            card.addEventListener("click", () => {
                window.open(resource.links[0].url, "_blank");
            });
            card.addEventListener("keypress", (e) => {
                if (e.key === "Enter") {
                    window.open(resource.links[0].url, "_blank");
                }
            });
        }

        // -----------------------------
        // AJOUT DE LA CARTE AU CONTAINER
        // -----------------------------
        container.appendChild(card);
    });
}

// ==========================================
// FILTRAGE PAR TEXTE ET LABEL
// ==========================================
function setupFilters() {
    const searchInput = document.getElementById("searchInput");
    const labelButtons = document.querySelectorAll(".label-btn");

    // Filtrage à chaque frappe dans le champ de recherche
    searchInput.addEventListener("input", () => {
        filterAndDisplay();
    });

    // Filtrage quand on clique sur un label
    labelButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Marquer le bouton actif visuellement
            labelButtons.forEach(b => b.classList.remove("active"));
            button.classList.add("active");
            filterAndDisplay();
        });
    });
}

// Fonction qui filtre et affiche les cartes
function filterAndDisplay() {
    const searchValue = document.getElementById("searchInput").value.toLowerCase();
    const activeLabelButton = document.querySelector(".label-btn.active");
    const activeLabel = activeLabelButton ? activeLabelButton.getAttribute("data-label") : "all";

    // Filtrer les ressources
    const filtered = resources.filter(resource => {
        // Vérifie le texte (titre + description)
        const matchesText = resource.title.toLowerCase().includes(searchValue) ||
            resource.description.toLowerCase().includes(searchValue);

        // Vérifie si  au moins un label correspond
        const matchesLabel = activeLabel === "all" || (resource.labels && resource.labels.includes(activeLabel));
        // const matchesLabel = activeLabel === "all" || resource.label === activeLabel;

        return matchesText && matchesLabel;
    });

    // Affiche les cartes filtrées
    displayResources(filtered, "containerCards");
}

// ==========================================
// INITIALISATION AU CHARGEMENT DE LA PAGE
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    displayResources(resources, "containerCards"); // Affiche toutes les cartes au départ
    setupFilters(); // Met en place recherche et filtres
});
