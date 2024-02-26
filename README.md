# 724 Events


## Description
Déboggage de l'application est le site d'une agence evenementielle.

`Objectifs:`
- Lister et réparer les bugs en s'appuyant sur React DevTools et JEST
- Rédiger un cahier de recette

## Les bugs à fixer:

Le carrousel affiche les évènements par ordre aléatoire alors qu'il devrait les afficher par date en ordre décroissant.
Le filtre pour la section "Nos réalisations" ne fonctionne pas. Il faut que les réalisations soient filtrables et affichent les bons mois.
Le formulaire s’envoie, mais le message de confirmation ne s’affiche pas.
Pour fixer ces bugs, implémenter des petites portions de codes manquantes.

`Rechercher les autres et les fixer (Certains sont détectables via les tests. Possibilité de trouver les bugs grâce aux tests invalides.)`
`Utiliser React Developer Tools pour comprendre l’architecture du projet et la propagation du state/context.`

## La partie tests
L’application est testée en grande partie :

les composants sont testés (test unitaire)
le code est entièrement testé.
Attention à ce que tous les voyants de tests passent au vert une fois les bugs résolus.
`Réaliser un cahier de recette pour confirmer que le site est fiable et qu’il corresponde aux besoins de 724events.`

Plus tard, il pourra aussi servir de base pour valider les futurs développements.

## Pre-requis
- NodeJS  >= v16.14.1

## Installation 
- `yarn install`
- `npm install`

## Lancement de l'application
- `yarn start`
- `npm start`

## Tests
- `yarn test`
- `npm test`

