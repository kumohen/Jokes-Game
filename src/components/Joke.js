import React, { Component } from 'react';
import "./joke.css"
class Joke extends Component {
    getColor(){
        if(this.props.votes >= 15){
            return "#4CAF50"
        }
        else if(this.props.votes >= 6){
            return "#4CAF50"
        } else {
            return "#f44336"
        }
    }
    render() {
        return (
            <div className="Joke">
                <div className="Joke-buttons">
                    <i className="fa fa-arrow-up" onClick={this.props.upvote} />
                    <span className="Joke-votes" style={{borderColor:this.getColor()}}>{this.props.votes}</span>
                    <i className="fa fa-arrow-down"  onClick={this.props.downvote}  />
                </div>
                <div className="Joke-text">{this.props.text}</div>
                <div className="Joke-smiley">
                    <i className="em em-rolling_on_the_floor_laughing"></i>
                </div>
            </div>
        );
    }
}

export default Joke;