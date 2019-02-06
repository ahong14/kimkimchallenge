import React, { Component } from 'react';
import './Home.css';

class Home extends Component{
    render(){
        return(
            <div id = "homeContent">
                <h1> My Trip Plan Builder </h1>
                <a id = "proceed" href = "/trip-plans"> <button  className = "waves-effect waves-light btn-large center-align"> Proceed </button> </a>
            </div>
        );
    }
}

export default Home;
