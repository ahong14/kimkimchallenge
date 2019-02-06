import React, { Component } from 'react';
import './Days.css';
import axios from 'axios';
import querystring from 'querystring';

//Day component, displays info about day associated with a trip plan
class Days extends Component{
    constructor(props){
        super(props);
        this.state = {
            day: this.props.day,
            title: this.props.title,
            dayID: this.props.id,
            description: this.props.description
        }
        this.removeDay = this.removeDay.bind(this);
    }

    //remove day record from database
    removeDay(){
        axios.delete("http://localhost:4000/api/removePlan/day", {
            params:{
                id: this.state.dayID
            }
        })
        .then(res => {
            //update results, render
            this.props.getDays();
        })
        .catch(err => {
            alert(err);
        })
    }

    render(){
        //get day id from query string parameter
        //route to /day/edit/?id to edit specific day record
        const queryID = {
            id: this.state.dayID
        }
        var query = querystring.stringify(queryID);
        const editURL = "/day/edit?" + query;

        return(
            <div class="col s12 m6">
                <div class="card">
                    <div class="card-content">
                        <p className="card-title center-align"> <strong> Day {this.props.day}: {this.props.title} </strong> </p>
                        <div id = "description">
                            <p className = "center-align"> <strong> Description: </strong> {this.props.description} </p>
                        </div>
                    </div>

                    <div className = "card-action center-align">
                        <a href = {editURL}> <p> Edit </p> </a> 
                        <a> <p className = "hoverItem" onClick = {this.removeDay}> Remove </p> </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Days;
