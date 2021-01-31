import axios from 'axios';
/**
 * URL du serveur pour récupérer les meilleurs temps
 */
const url = "http://localhost:8000/records";

/**
 * Permet de sauvegarder le meilleur temps sur le serveur
 * 
 * @param {int} time - temps en secondes
 */
 const saveRecord = async (time) => {
    // Préparation des données à envoyer au serveur
    const data = {
        time,
        pseudo: "axios"
    };

    // Appel à l'URL de sauvegarde des meilleurs temps sur le serveur
    return axios.post(url+'/create', data)
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
}

/**
 * Récupérer le meilleur temps stocké sur le serveur.
 * 
 * @returns {{time: int, pseudo: string, createAt: Date}}
 */
const getBestRecord = async () => {
    // Appel sur l'URL de récupération du meilleur temps sur le serveur
    return axios.get(url+'/best')
        .then((response) => response.data)
        .catch((error)=> console.log(error))
}

/** Service d'appel à l'API pour les meilleurs temps */
export default {
    saveRecord,
    getBestRecord,
}