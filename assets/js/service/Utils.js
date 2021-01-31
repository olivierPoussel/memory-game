/**
 * Source : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Math/random
 * 
 * Fonction qui donne un nombre aléatoire entre un nombre minimum et maximum inclus
 * 
 * @param {int|float} min 
 * @param {int|float} max 
 * 
 * @returns
 */
const random  = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
}

/** Service de fonction générique utile */
export default {
    random
}