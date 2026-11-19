# Volria

> Projet **éducatif et expérimental** pour étudier la création d’une blockchain compatible avec l’EVM.
> Aucune valeur réelle, aucun réseau public, aucune promesse de fonctionnalité.

![Statut](https://img.shields.io/badge/statut-prototype%20v0.1-orange)
![Réseau](https://img.shields.io/badge/r%C3%A9seau-local%20%2F%20test-blue)
![Licence](https://img.shields.io/badge/licence-MIT-green)

## Sommaire

- [Objectif](#objectif)
- [État actuel](#état-actuel)
- [Structure du dépôt](#structure-du-dépôt)
- [Démarrage rapide](#démarrage-rapide)
- [Le jeton de test VolriaToken (VLR)](#le-jeton-de-test-volriatoken-vlr)
- [Idées à étudier](#idées-à-étudier)
- [Documentation](#documentation)
- [Sécurité et avertissement](#sécurité-et-avertissement)

## Objectif

Commencer par un prototype **local** ou un **réseau privé de test**, sans argent réel, puis étudier pas à pas les composants d’une blockchain compatible EVM (nœud, consensus, exécution, stockage, RPC).

## État actuel

| Élément | État |
| --- | --- |
| Spécification v0.1 | ✅ Rédigée |
| Contrat de test `VolriaToken` (VLR) | ✅ Écrit |
| Tests automatisés du contrat | ✅ Écrits |
| Script de déploiement (local / Sepolia) | ✅ Écrit |
| Premier transfert VLR sur Sepolia | ✅ Réussi |
| Nœuds de test multiples | ⏳ À faire |
| Études PoW / DAG | ⏳ À faire |

## Structure du dépôt

```text
volria/
├── contracts/
│   └── VolriaToken.sol      # Jeton de test ERC-20 (offre max 21 M, mint, burn)
├── scripts/
│   └── deploy.js            # Déploiement local ou Sepolia
├── test/
│   └── VolriaToken.test.js  # Tests automatisés
├── docs/
│   ├── specification.md     # Spécification du prototype v0.1
│   ├── architecture.md      # Composants à étudier
│   └── roadmap.md           # Feuille de route
├── hardhat.config.js
├── package.json
└── .env.example             # Modèle de configuration (à copier en .env)
```

## Démarrage rapide

### Prérequis

- [Node.js](https://nodejs.org/) 18 ou plus récent
- Git

### Installation

```bash
git clone https://github.com/Maxchomakh/volria.git
cd volria
npm install
```

### Compiler et tester

```bash
npm run compile   # compile le contrat
npm test          # lance tous les tests automatisés
```

### Déployer sur un réseau local

Dans un premier terminal, lancez un nœud local (comptes de test fournis automatiquement) :

```bash
npm run node
```

Dans un second terminal :

```bash
npm run deploy:local
```

### Déployer sur Sepolia (optionnel)

1. Copiez `.env.example` en `.env`.
2. Remplissez `SEPOLIA_RPC_URL` et `PRIVATE_KEY` (**portefeuille de test uniquement**).
3. Lancez :

```bash
npm run deploy:sepolia
```

## Le jeton de test VolriaToken (VLR)

| Propriété | Valeur |
| --- | --- |
| Nom / symbole | Volria / VLR |
| Décimales | 18 |
| Offre maximale (paramètre de test) | 21 000 000 VLR |
| Création (mint) | Réservée au propriétaire, bloquée au-delà de l’offre max |
| Destruction (burn) | Chaque détenteur peut détruire ses propres jetons |
| Base | [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/5.x/) v5 |

Les tests vérifient : nom et symbole, offre initiale, transferts, refus sans solde, mint réservé au propriétaire, respect de l’offre maximale et burn.

## Idées à étudier

- Compatibilité EVM et exécution de contrats.
- Preuve de travail (PoW) et structure DAG, testées séparément au départ.
- Offre maximale envisagée de 21 millions.
- Éventuelle destruction des frais de transaction.
- Confidentialité des transactions, comme piste de recherche.
- Staking et KYC : à étudier plus tard.

Ces éléments sont des **pistes de recherche**, pas des fonctions développées.

## Documentation

- [Spécification v0.1](docs/specification.md)
- [Architecture](docs/architecture.md)
- [Feuille de route](docs/roadmap.md)

## Sécurité et avertissement

- Volria est un projet éducatif et expérimental, **non audité**.
- N’utilisez **jamais** d’argent réel, de clés privées réelles ni de données personnelles pour les essais.
- Le fichier `.env` contient des secrets : il est ignoré par Git et ne doit jamais être publié.
- Toute mise en ligne publique nécessiterait des tests approfondis, une revue de sécurité et une analyse juridique.

## Licence

MIT
