# Sécurité et vérification de VOLRIA

Ce document explique comment fonctionne le contrat VOLRIA et comment vérifier son activité. Le contrat n'a pas été audité.

## Base technique

- Contrat : `VolriaToken`, adresse `0xE22A0D6e66CEe90F3A5c7C2e043781f4B1f1e6da` sur Ethereum mainnet.
- Bibliothèque : OpenZeppelin Contracts, version 5.x (`^5.0.2`).
- Modules utilisés : `ERC20`, `ERC20Capped` (plafond d'un milliard), `ERC20Burnable` (brûlage) et `Ownable` (propriétaire).
- Solidity `^0.8.24` : les dépassements de calcul sont bloqués par le langage lui-même.

La version 5 d'OpenZeppelin diffère des anciens tutoriels : elle regroupe la logique des transferts dans une seule fonction interne (`_update`) et ne propose plus `increaseAllowance` ni `decreaseAllowance`. Les guides écrits pour les versions 3 ou 4 ne s'appliquent donc pas tels quels.

## Pouvoirs du propriétaire

- Le propriétaire peut créer (mint) de nouveaux jetons, jusqu'au plafond d'un milliard.
- Le plafond est fixé dans le code et ne peut pas être augmenté.
- Le propriétaire ne peut pas bloquer les transferts, ni geler un compte, ni retirer des jetons d'un autre portefeuille.
- La propriété n'a pas été abandonnée.

## Autorisations (approve) : précaution

La fonction `approve` permet d'autoriser une autre adresse, par exemple une application, à dépenser une partie de vos jetons.

Si vous modifiez une autorisation déjà existante, l'adresse autorisée peut, dans certains cas, dépenser l'ancienne et la nouvelle somme, selon l'ordre dans lequel les transactions sont traitées. Pour l'éviter :

1. Remettez d'abord l'autorisation à zéro.
2. Fixez ensuite le nouveau montant.
3. N'autorisez que le montant nécessaire, jamais un montant illimité sans raison.

Vous pouvez consulter et révoquer vos autorisations avec l'outil « Token Approvals » d'Etherscan.

## Brûlage (burn)

- `burn` détruit vos propres jetons et réduit l'offre totale.
- `burnFrom` détruit des jetons d'une autre adresse, seulement dans la limite de l'autorisation qu'elle vous a donnée.
- Envoyer des jetons à une adresse « dead » ne réduit pas l'offre totale : les jetons restent comptés.

## Vérifier l'activité sur Etherscan

Chaque opération émet un événement public, visible dans l'onglet « Events » ou « Token Transfers » du contrat :

| Événement | Signification |
|---|---|
| `Transfer` depuis `0x000…000` | Création de jetons (mint) |
| `Transfer` vers `0x000…000` | Brûlage de jetons (burn) |
| `Transfer` entre deux adresses | Transfert ordinaire |
| `Approval` | Nouvelle autorisation de dépense |

Ainsi, tout mint ou burn est vérifiable publiquement.

## Règles de sécurité pour les utilisateurs

- L'équipe ne demande jamais de phrase de récupération (seed phrase) ni de clé privée.
- Vérifiez toujours l'adresse du contrat ci-dessus avant toute opération.
- Les seuls canaux officiels sont listés sur le site et dans le dépôt GitHub. Contact : contact@volria.online.

## Limites

Le contrat n'a pas été audité. Le créateur détient la majorité de l'offre et peut encore créer des jetons. Aucune valeur ni rendement n'est garanti.
