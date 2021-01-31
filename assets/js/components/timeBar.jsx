import React, { useState } from 'react';
import '../../styles/timeBarre.css'

class TimeBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            progress: 0,
            time: 0,
         }
    }

    componentDidMount() {
       this.timerId = setInterval(() => this.updateTimer(), 1000);
    }
    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    updateTimer() {
        // Mise à jour de la progression en pourcentage
        const progressPerCent = Math.ceil(((this.state.time + 1) /this.props.totalTime) *100);
        this.setState({progress: progressPerCent});
        
        // Ajout d'une seconde au timer
        this.setState({time: this.state.time + 1}, () => {
            this.props.getTime(this.state.time);
            if(this.props.stop) {
                clearInterval(this.timerId);
                this.props.getTime(this.state.time);
            }
            
            if((this.state.time >= this.props.totalTime)) {
                clearInterval(this.timerId);
                this.props.timeOver();
            }
        });
    }

    render() { 
        return ( 
            <div>
                <div className="text-center timer">{this.state.time + '/' + this.props.totalTime}</div>
                <div className="barre">
                    <div style={{width: this.state.progress+'%'}}></div>
                </div>
            </div>
        );
    }
}
 
export default TimeBar;
