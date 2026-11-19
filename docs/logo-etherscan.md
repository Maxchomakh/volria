# Logo Volria et page Etherscan

## Fichiers du logo

| Fichier | Usage |
| --- | --- |
| `assets/volria-logo.svg` | Version originale, nette à toutes les tailles |
| `assets/volria-logo-32.svg` | Etherscan (format SVG 32×32) |
| `assets/volria-logo-64.png` | Etherscan (format PNG 64×64) |
| `assets/volria-logo-256.png` | README, réseaux, présentations |
| `assets/volria-logo-512.png` | Grande taille |

Le logo représente le DAG (le V formé de nœuds reliés), le PoW (le bloc hexagonal) et le cryptage (le cadenas).

## Étapes pour afficher le logo sur Etherscan

1. **Déployer la version actuelle du contrat** : `npm run deploy:sepolia`, puis noter la nouvelle adresse.
2. **Vérifier le code du contrat** : lancer la commande `npm run verify:sepolia -- ...` affichée à la fin du déploiement (clé `ETHERSCAN_API_KEY` dans `.env`).
3. **Créer un compte Etherscan** et s'y connecter.
4. **Prouver la propriété du contrat** : sur la page du jeton, `More` > `Update Token Info`, puis signer un message avec le wallet qui a déployé le contrat.
5. **Remplir le formulaire** : nom, symbole, description, lien du logo (un lien public, par exemple le fichier PNG 64×64 sur un dépôt ou un site public), site web.
6. **Attendre la validation** par l'équipe d'Etherscan.

## Limites

- Le service de mise à jour des informations de jetons d'Etherscan est surtout prévu pour les réseaux principaux ; sa disponibilité sur Sepolia n'est pas garantie.
- Etherscan demande en général un site web qui présente le projet. Un dépôt privé n'est pas visible par Etherscan : le lien du logo doit être public.
- Dans MetaMask, un jeton de test sur Sepolia s'affiche sans logo personnalisé.
