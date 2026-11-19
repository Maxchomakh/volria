// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC20Capped} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import {ERC20Burnable} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

/// @title VolriaToken (VLR) — jeton de TEST éducatif
/// @notice Contrat simple pour étudier un jeton compatible EVM sur un réseau local
///         ou un réseau de test. Aucune valeur réelle.
/// @dev L'offre maximale (21 millions) est une idée à l'étude, utilisée ici
///      uniquement comme paramètre de test. Elle peut changer.
contract VolriaToken is ERC20, ERC20Capped, ERC20Burnable, Ownable {
    /// @notice Offre maximale de test : 21 millions de VLR (18 décimales).
    uint256 public constant MAX_SUPPLY = 21_000_000 * 10 ** 18;

    /// @param initialOwner Adresse qui pourra créer (mint) de nouveaux jetons.
    /// @param initialSupply Quantité créée au déploiement (en unités de base, 18 décimales).
    constructor(address initialOwner, uint256 initialSupply)
        ERC20("Volria", "VLR")
        ERC20Capped(MAX_SUPPLY)
        Ownable(initialOwner)
    {
        if (initialSupply > 0) {
            _mint(initialOwner, initialSupply);
        }
    }

    /// @notice Crée de nouveaux jetons. Réservé au propriétaire.
    /// @dev Refusé automatiquement si l'offre maximale est dépassée.
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    /// @dev Résolution de l'héritage multiple (ERC20 + ERC20Capped).
    function _update(address from, address to, uint256 value)
        internal
        override(ERC20, ERC20Capped)
    {
        super._update(from, to, value);
    }
}
