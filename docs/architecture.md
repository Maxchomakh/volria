# Architecture de Volria

## Objectif

Volria est un projet éducatif pour étudier les composants d’une blockchain compatible avec l’EVM. Le prototype est destiné à fonctionner en local ou sur un réseau privé, sans argent réel.

## Composants à étudier

- **Nœud** : participe au réseau de test et échange des données avec les autres nœuds.
- **Consensus** : étudier PoW et DAG séparément avant de décider s’ils peuvent être combinés.
- **Exécution EVM** : étudier une solution existante compatible avec l’EVM plutôt que de la créer à partir de zéro.
- **Stockage** : conserver les blocs et les données de test.
- **Interface RPC** : permettre à des outils de développement de communiquer avec le nœud.
- **Tests** : vérifier le fonctionnement avec des données fictives et sur un réseau privé.

## Règles envisagées

Les éléments ci-dessous sont des idées à étudier, pas des fonctions déjà développées :

- Offre maximale envisagée : 1 milliard (1 000 000 000 VLR).
- Frais de transaction éventuellement brûlés.
- PoW et DAG à tester séparément.
- Confidentialité à étudier dans une phase ultérieure.

## Limites du prototype

Pas de monnaie réelle, pas de réseau public et pas de promesse de sécurité. Toute mise en ligne nécessiterait des tests approfondis et une revue de sécurité.
