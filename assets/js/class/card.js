/**
 * Classe de définition d'une carte
 */
class card 
{
    /**
     * @constructor
     * 
     * @param {string} name - nom de la carte
     * @param {int} ligne - numéro de la ligne dans le tableau des cartes
     * @param {int} colonne - numéro de la colonne dans le tableau des cartes
     * @param {boolean} isVisible - est-ce que la carte est face visible
     * @param {boolean} pairIsFound - est-ce que cette paire a été trouvée
     */
    constructor(name, ligne = 0, colonne = 0, isVisible = false, pairIsFound = false) {
        this.name = name;
        this.ligne = ligne;
        this.colonne = colonne;
        this.isVisible = isVisible;
        this.pairIsFound = pairIsFound;
    }
}

export default card;
