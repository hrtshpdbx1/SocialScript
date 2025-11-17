# SocialScript

## 1. Contexte

SocialScript est un simulateur interactif d'entraînement aux situations sociales, développé dans le cadre d'un workshop HTML/CSS/JavaScript.
Le projet répond à un besoin d'apprentissage des codes sociaux dans un environnement sécurisé, particulièrement utile pour les personnes neurodivergentes.

## 2. Objectifs du site

* Permettre aux utilisateur·ices de pratiquer leurs compétences relationnelles sans conséquences réelles.
* Expliquer les codes sociaux implicites de manière pédagogique.
* Offrir un espace d'expérimentation avec plusieurs approches possibles pour chaque situation.
* Sensibiliser à l'assertivité et aux différents styles de communication.

## 3. Cible

* **Principale :** Personnes neurodivergentes (autisme, TDAH, etc.) souhaitant développer leurs habiletés sociales.
* **Secondaire :** Toute personne souhaitant améliorer sa communication assertive (personnes timides, en reconversion professionnelle, etc.).

## 4. Fonctionnalités

* Simulation de scénarios sociaux avec choix multiples de réponses.
* Affichage dynamique d’avatars personnalisés grâce à l’API [DiceBear](https://dicebear.com/).
* Réactions et analyses pédagogiques pour chaque réponse sélectionnée.
* Option de **recommencer** pour revenir à la sélection du niveau de difficulté.
* Trois niveaux de difficulté : Facile, Moyen, Difficile.

## 5. Installation et lancement

### Prérequis

* Node.js installé pour utiliser `json-server`.
* VS Code avec l’extension Live Server (ou un serveur HTTP local).

### Étapes

1. Cloner ou télécharger le projet :

   ```bash
   git clone <url-du-projet>
   cd SocialScript
   ```
2. Installer JSON Server (si nécessaire) :

   ```bash
   npm install -g json-server
   ```
3. Lancer le serveur JSON pour les scénarios :

   ```bash
   json-server --watch data/db.json --port 3000
   ```
4. Vérifier que le serveur fonctionne en ouvrant dans le navigateur :

   ```
   http://localhost:3000/scenarios
   ```
5. Ouvrir `index.html` via **Live Server** (ou un autre serveur HTTP) pour que les requêtes Axios fonctionnent correctement.

## 6. Technologies utilisées

* HTML5 / CSS3
* JavaScript (ES6+)
* [Axios](https://axios-http.com/) pour les requêtes HTTP
* [JSON Server](https://github.com/typicode/json-server) pour simuler une API REST
* [DiceBear API](https://dicebear.com/) pour les avatars aléatoires

## 7. Structure du projet

```
SocialScript/
│
├─ data/
│  └─ db.json           # Base de données des scénarios
│
├─ scripts/
│  └─ app.js            # Logique JS pour les scénarios et avatars
│
├─ index.html           # Page principale
└─ README.md            # Ce fichier
```

## 8. JSON : mode d’emploi

* Tous les scénarios sont dans `data/db.json`.
* Chaque scénario contient : contexte, interlocuteur, options de réponses et analyses pédagogiques.
* Les requêtes vers `json-server` permettent de récupérer dynamiquement les scénarios dans l’application.

**Rappel pour lancer JSON et le projet :**

```bash
# Dans le dossier racine
json-server --watch data/db.json --port 3000

# Vérifier
http://localhost:3000/scenarios

# Ouvrir index.html avec Live Server
```

## 9. Contribution

Les contributions et améliorations sont les bienvenues :

* Ajouter de nouveaux scénarios et niveaux.
* Améliorer le style et l’expérience utilisateur.
* Ajouter des statistiques ou un suivi des réponses pour un feedback plus personnalisé.

## 10. Licence

* Projet pédagogique, libre à usage personnel et éducatif.
* Les avatars utilisent l’API DiceBear (licence MIT et CC BY 4.0 pour le design).
