import React, { Component } from 'react';
import axios from 'axios';
import './JokeList.css';
import Joke from './Joke';
import uuid from 'uuid/v4';

class JokeList extends Component {
    constructor(props){
        super(props);
        this.state ={
            jokes:JSON.parse(window.localStorage.getItem("jokes") || "[]")
          
        }
        this.handleClick =   this.handleClick.bind(this)
    }
   
    static defaultProps = {
        numJokes : 10
    }
     componentDidMount(){
       if(this.state.jokes.length === 0) this.getJokes();
    }
   async getJokes(){
        let jokes =[];
        while(jokes.length <this.props.numJokes ){
            let res = await axios.get("https://icanhazdadjoke.com/",{headers:{Accept:"application/json"}});
            jokes.push({id:uuid(),text:res.data.joke,votes:0})
        }
       
        this.setState(st => ({
            jokes:[...st.jokes,...jokes]
        }),()=>
        window.localStorage.setItem("jokes",JSON.stringify(this.state.jokes))
    
    );
        
    }
    handleVote(id,delta){
        this.setState(st =>({
            jokes:st.jokes.map(j =>
                j.id === id ?{...j,votes:j.votes + delta } : j
            )
        }),()=>
            window.localStorage.setItem("jokes",JSON.stringify(this.state.jokes))
        )
    }
    handleClick (){
        this.getJokes()
    }
    render() {
        return (
           <div className="JokeList">
                <div className="JokeList-sidebar">
                <h1 className="JokeList-title">
                    <span>Dad </span>Jokes
                </h1>
                <img src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg" alt="" />
                <button className="JokeList-getmore" onClick={this.handleClick}>New Jokes</button>
                </div>
                
                <div className="JokeList-jokes">
                    {this.state.jokes.map((j) => (
                        <Joke text={j.text} votes={j.votes} key={j.id}
                         upvote={()=> this.handleVote(j.id,1)}
                         downvote={()=> this.handleVote(j.id,-1)}
                         />
                    ))}
                </div>
           </div>

        );
    }
}

export default JokeList;