# L'Écho de Blackwood

## Présentation

**L'Écho de Blackwood** est un jeu d'aventure textuel interactif réalisé en HTML, CSS et JavaScript.

Le joueur arrive dans le village abandonné de Blackwood après avoir reçu un message anonyme. En explorant le village, la forêt, une maison abandonnée et un ancien laboratoire, il découvre progressivement l'existence du programme **MNEMOSYNE** et le lien qui l'unit au mystérieux **Sujet 07**.

## Objectif

Le but est d'explorer les différentes scènes, faire des choix et rassembler les indices permettant de comprendre ce qui s'est réellement passé à Blackwood.

Le projet contient **21 scènes HTML interconnectées**, en plus de la page d'accueil.

## Fonctionnalités

- Navigation entre plusieurs scènes grâce à des choix interactifs
- 21 scènes différentes
- Deux fins : une fin principale et une fin alternative
- Images d'arrière-plan adaptées aux lieux de l'histoire
- Boutons personnalisés avec icônes SVG
- Musique d'ambiance
- Animations CSS
- Mise en page responsive
- Système d'indices en JavaScript
- Dossier permettant de suivre les indices découverts
- Sauvegarde des indices avec `localStorage`

## Les quatre indices

Le joueur peut débloquer quatre éléments importants dans son dossier :

1. Le journal du Dr Elias Hawkins
2. Le laboratoire secret
3. Le dossier SUBJECT 07
4. MEMORY 06

## Structure du projet

```text
la-foret-mysterieuse/
├── index.html
├── style.css
├── script.js
├── pages/
│   ├── scene01.html
│   ├── scene02.html
│   ├── ...
│   └── scene21.html
├── assets/
│   ├── backgrounds/
│   ├── icons/
│   └── sounds/
│       └── ambience.mp3
├── arbre-navigation.pdf
└── README.md
```

## Navigation principale

```text
index -> 01
01 -> 02 / 03
02 -> 04 / 05
03 -> 06 / 07
04 -> 08 / 05
05 -> 09 / 04
06 -> 19 / 07
07 -> 20 / 08
09 -> 14
19 -> 14
20 -> 14
14 -> 08
08 -> 10 / 11
11 -> 13 (fin alternative) / 08
10 -> 12
12 -> 15 / 10
15 -> 16
16 -> 21
21 -> 17
17 -> 18 (fin principale)
```

## Technologies utilisées

- HTML5
- CSS3
- JavaScript
- SVG pour les icônes
- `localStorage` pour conserver les indices pendant la navigation

## Histoire

Blackwood est un village abandonné lié à un ancien centre de recherche. Le programme MNEMOSYNE devait initialement permettre de traiter les souvenirs traumatiques, mais les expériences ont progressivement dérivé vers la modification et l'enfouissement de la mémoire.

Au fil de l'aventure, le joueur découvre qu'il était autrefois le **Sujet 07**. Le Dr Elias Hawkins, impliqué dans le programme, a tenté d'arrêter les expériences et l'a aidé à s'échapper lorsqu'il était enfant. Des années plus tard, un message préparé par Hawkins conduit le joueur à revenir à Blackwood afin de retrouver la vérité.

## Fins

### Fin alternative - Partir sans savoir

Le joueur décide de quitter Blackwood avant d'ouvrir le dossier du Sujet 07. Il survit, mais repart sans connaître toute la vérité.

### Fin principale - La vérité de Blackwood

Le joueur retrouve ses souvenirs, découvre le rôle de Hawkins, récupère les preuves du programme MNEMOSYNE et quitte Blackwood en connaissant enfin son passé.

