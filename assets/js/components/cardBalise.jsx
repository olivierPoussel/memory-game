import React, { Fragment } from 'react';
import Images from '../service/Images';

// Template pour l'affichage des cartes
const CardBalise = ({card}) => {
    
    // Récupération du chemin de l'image pour l'afficher
    const imageSource = Images[card.name];

    return (
    <Fragment>
        {
            (card.isVisible || card.pairIsFound) ?
            (<img src={imageSource} />)
            :
            (<p>
                {/* {card.name} */}
                ?
            </p>)
        }
    </Fragment>
    );
}
 
export default CardBalise;
