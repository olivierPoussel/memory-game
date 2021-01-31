import React, { Fragment } from 'react';
import card from '../class/card';
import CardBalise from '../components/cardBalise';
import Images from '../service/Images';
import Utils from '../service/Utils';
import Config from '../service/Config';
import TimeBar from '../components/timeBar';
import ApiService from '../service/ApiService';
import Modal from '../components/modal';

/**
 * Composant principal
 * 
 * Jeu de mémoire
 */
class Memory extends React.Component {
    constructor (props) {
        super(props)
    
        // Définition des variables d'état du jeu avec leur valeur par défaut.
        this.state = {
            nbPairFound: 0,
            nbPair: 0,
            gameGrid: [],
            selectedCard: null,
            stopTimer: false,
            currentTime: 0,
            bestTime: 'Chargement ...',
            gameOver: false,
            win: false,
            modal: {
                text: 'text'
            }
        }

        // Lier les fonctions à ce composant
        this.timeIsOver = this.timeIsOver.bind(this);
        this.setCurrentTime = this.setCurrentTime.bind(this);

        const listeFruit = [];

        // Récupération de la liste des fruits disponibles pour le jeu
        let fruitArray = Images.getFruitList();
        while (listeFruit.length !== Config.nbFruit) {            
            // Récupération d'un fruit de manière aléatoire dans la liste des fruits pour créer la liste pour le jeu, 14/18 seront utilisés
            const fruit = fruitArray.splice(Utils.random(0,fruitArray.length -1), 1);
            listeFruit.push(fruit[0]);
        }

        // Sauvegarde du nombre de paires de fruits à trouver
        this.state.nbPair = listeFruit.length;

        // Initialisation de la liste des cartes de fruits
        const carteFruit = [];
        listeFruit.forEach(fruit => {
            carteFruit.push(new card(fruit));
            carteFruit.push(new card(fruit));
        });
        
        // Création de la grille de jeu à partir de la liste créée précédemment
        let grille = [];
        for (let ligne = 0; ligne < Config.nbLigne; ligne++) {
            grille[ligne] = [];
            for (let colonne = 0; colonne < Config.nbColonne; colonne++) {
                
                // Récupération d'une carte de fruit dans la liste de manière aléatoire
                const randomNumberCard = Utils.random(0, carteFruit.length - 1)
                const randomCard = carteFruit.splice(randomNumberCard,1)[0];
                
                // Enregistrement de l'emplacement de la carte (ligne et colonne) sur la grille de jeu pour pouvoir la retrouver plus facilement
                randomCard.ligne = ligne;
                randomCard.colonne = colonne;
                grille[ligne][colonne] = randomCard;
            }
        }

        // Sauvegarde de la grille de jeu
        this.state.gameGrid = grille;
    }

    componentDidMount() {        
        // Récupération du meilleur temps depuis le serveur 
        ApiService.getBestRecord().then(data => {
            // Sauvegarde du meilleur temps en mémoire pour l'afficher 
            this.setState({bestTime: data.time})
        });
    }

    handleClick (card) {
        // Récupération de la grille de jeu 
        let grilleModif = this.state.gameGrid;
        
        // Vérfication si la carte a déja été cliquée ou si le temps de jeu est fini
        if(card.isVisible === true || card.pairIsFound === true || this.state.gameOver) {
            // Si une des conditions précédentes est vériifiée, alors rien ne se passe
            return;
        }
        
        // Vérfication si une carte a déja été séléctionée
        if(this.state.selectedCard === null) {
            // Rendre la carte visible
            card.isVisible = true
            
            // Sauvegarde de la carte sélétionnée en mémoire
            this.setState({selectedCard: card});
            
            // Mise à jour de la grille de jeu pour rendre visible la carte dans l'affichage
            grilleModif[card.ligne][card.colonne] = card;
            this.setState({gameGrid: grilleModif});
        } else {
            let firstCard = this.state.selectedCard;            
            
            // Vérfication si la carte cliquée est identique à celle déja sélectionnée auparavent
            if(firstCard.name === card.name) {                
                // Ajout de la paire trouvée au compteur de paire 
                const actualPairFound = this.state.nbPairFound +1;
                
                // Sauvegarde du compteur de paire en mémoire 
                this.setState({nbPairFound: actualPairFound});

                // Modification des cartes pour qu'elles restent affichées
                firstCard.pairIsFound = true;
                card.pairIsFound = true;

                // Modification de la grille pour l'affichage
                grilleModif[firstCard.ligne][firstCard.colonne] = firstCard;
                grilleModif[card.ligne][card.colonne] = card;

                // Sauvegarde de la grille pour l'affichage
                this.setState({gameGrid: grilleModif});

                // Suppression de la carte selectionnée en mémoire
                this.setState({selectedCard: null});

                // Vérification de la condition de victoire (est-ce que toutes les paires ont été trouvées ?)
                if(this.state.nbPair == actualPairFound) {
                    // Ajout du texte de victoire pour l'affichage de la popup
                    this.setState({modal: {text: 'Bravo, vous avez gagné !'}});

                    // Arrêt du timer
                    this.setState({stopTimer: true}, () => {
                        // Appel à l'API pour sauvegarder le meilleur temps sur le serveur
                        ApiService.saveRecord(this.state.currentTime);
                    });

                    // Notifier l'application que le joueur a gagné et faire apparaitre la popup de victoire
                    this.setState({win: true});
                }
            } else {                
                // Rendre la carte visible
                card.isVisible = true;
                grilleModif[card.ligne][card.colonne] = card;

                //Mise à jour de la grille de jeu
                this.setState({gameGrid: grilleModif});

                // Suppression de la carte selectionnée pour pouvoir sélectionner une nouvelle paire
                this.setState({selectedCard: null});
                
                // Timer pour retourner les cartes face cachée
                setTimeout(() => {
                    firstCard.isVisible = false;
                    card.isVisible = false;
                    grilleModif[firstCard.ligne][firstCard.colonne] = firstCard;
                    grilleModif[card.ligne][card.colonne] = card;
                    this.setState({gameGrid: grilleModif});
                }, 1500);
            }
        }
    }
    /**
     * Gestion de la fin du temps imparti
     */
    timeIsOver() {
        // gameOver
        this.setState({modal: {text: 'Vous avez perdu !'}})
        this.setState({gameOver: true});
    }

    setCurrentTime(time) {
        this.setState(()=> {
            return {currentTime: time}
        })
    }

    render() {

        return (
            <Fragment>
               <h1>Jeu de mémoire</h1>
               <p>Meilleur temps : {this.state.bestTime}</p>
               <table>
                   <tbody>
                   {
                       this.state.gameGrid.map((ligneArray, numLigne)=>{
                        return <tr key={numLigne}>
                            {ligneArray.map((card, numColonne)=>{
                                return (
                                <td 
                                    key={numLigne+numColonne}
                                    onClick={() => this.handleClick(card)}
                                    className={`card ${(card.isVisible || card.pairIsFound) ? 'visible' : ''}`}
                                >
                                    <CardBalise card={card} />
                                </td>)
                            })}
                        </tr>
                       })
                   }
                   </tbody>
               </table>
               <TimeBar 
                    totalTime={Config.tempsDeJeu} 
                    stop={this.state.stopTimer} 
                    timeOver={this.timeIsOver}
                    getTime={this.setCurrentTime}
                />
                {
                    (this.state.win || this.state.gameOver) ? 
                    <Modal text={this.state.modal.text} /> 
                    : 
                    (null)
                } 
            </Fragment>
        );
    }
}

/** Page du jeu de mémoire */
export default Memory;
