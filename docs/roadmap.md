# Feuille de route de VOLRIA

Cette feuille de route est indicative. Elle décrit des étapes d'étude et d'essai, et non des fonctions déjà disponibles en production.

## Phase 1 – Prototype éducatif

- [x] Définir les objectifs et les limites du projet ([spécification v0.1](specification.md)).
- [x] Écrire un contrat de test simple (`VolriaToken`, VOLRIA) avec des tests automatisés.
- [x] Effectuer un premier transfert de tokens de test sur Sepolia.
- [ ] Étudier les bases d'une blockchain compatible avec l'EVM.
- [ ] Lancer un ou plusieurs nœuds en local ou sur un réseau privé de test.
- [x] Utiliser des données fictives, sans argent réel.

## Phase 2 – Études techniques

- [ ] Tester les mécanismes de consensus (PoW et DAG) séparément, sans les combiner.
- [ ] Étudier le stockage des blocs et l'interface RPC.
- [ ] Comparer des solutions EVM existantes (par exemple Geth, Besu, Reth).
- [ ] Étendre les tests automatisés au réseau privé de test.
- [ ] Faire relire le contrat par une personne ou une équipe indépendante.

## Phase 3 – Fonctions avancées à étudier

- [ ] Étudier les frais de transaction et leur éventuel brûlage.
- [ ] Étudier la confidentialité des transactions.
- [ ] Évaluer les risques techniques et les exigences légales.

## Plus tard

- [ ] Étudier le staking.
- [ ] Étudier le KYC et ses implications légales et de protection des données.

## Limites

Cette feuille de route est indicative. Aucune de ces fonctions n'est considérée comme déjà développée. Le prototype reste éducatif, sans valeur monétaire garantie, et le contrat n'a pas encore été audité.