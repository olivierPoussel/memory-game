/**
 * Récupération des emplacements des images
 */
import abricot from '../../img/fruits/abricot.png';
import banane from '../../img/fruits/banane.png';
import cerise from '../../img/fruits/cerise.png';
import citron_jaune from '../../img/fruits/citron_jaune.png';
import citron_vert from '../../img/fruits/citron_vert.png';
import fraise from '../../img/fruits/fraise.png';
import framboise from '../../img/fruits/framboise.png';
import grenade from '../../img/fruits/grenade.png';
import mirabelle from '../../img/fruits/mirabelle.png';
import orange from '../../img/fruits/orange.png';
import pasteque from '../../img/fruits/pasteque.png';
import peche from '../../img/fruits/peche.png';
import poire from '../../img/fruits/poire.png';
import pomme_rouge from '../../img/fruits/pomme_rouge.png';
import pomme_verte from '../../img/fruits/pomme_verte.png';
import prune from '../../img/fruits/prune.png';
import raisin from '../../img/fruits/raisin.png';

/**
 * Récupération de la liste des noms des images
 * 
 * @returns {[string]} - liste des noms d'images
 */
const getFruitList = () => {
    return [
        "abricot",
        "banane",
        "cerise",
        "citron_jaune",
        "citron_vert",
        "fraise",
        "framboise",
        "grenade",
        "mirabelle",
        "orange",
        "pasteque",
        "peche",
        "poire", 
        "pomme_rouge",
        "pomme_verte",
        "prune",
        "raisin"
    ];
}

/** Service de mapping entre les noms d'images et leur emplacement */
export default {
     abricot,
     banane,
     cerise,
     citron_jaune,
     citron_vert,
     fraise,
     framboise,
     grenade,
     mirabelle,
     orange,
     pasteque,
     peche,
     poire, 
     pomme_rouge,
     pomme_verte,
     prune,
     raisin,
     getFruitList,
}
