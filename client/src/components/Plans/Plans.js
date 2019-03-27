import React, { Component } from 'react';
import './Plans.css';
import axios from 'axios';
import querystring from 'querystring';

//Component to display trip_plan. Contains plan info
class Plans extends Component{
    constructor(props){
        super(props);
        //trip_plan record id
        this.state = {
            id: -1
        }
        this.removePlan = this.removePlan.bind(this);
    }

    //set trip_plan id from database
    componentDidMount(){
        this.setState({
            id: this.props.id
        })
    }

    //remove plan from collection
    removePlan(){
        axios.delete("/api/removePlan", {
            params: {
                id: this.state.id
            }
        }).then(res => {
                console.log("deleting plan");
                //update plan view by getting new result of plans after removal
                this.props.getPlans();
            })
            .catch(err => {
                alert(err);
            })
    }

    render(){
        //construct query string, store id in url to access later
        const queryID = {
            id: this.state.id
        }
        var query = querystring.stringify(queryID);
        const editURL = "/edit?" + query;

        return(
            <div className = "col s12 m4">
                <div className = "card">
                    <p className = "card-title center-align">  <strong> {this.props.title} </strong> </p>
                    <div className = "center-align" id = "summary">
                        <p> <strong> {this.props.summary} </strong> </p>
                    </div>
                    <p className = "center-align"> <strong> Created: </strong> {this.props.created} </p>
                    <p className = "center-align"> <strong> Last Updated: </strong> {this.props.updated} </p>
                    <div className = "card-action center-align">
                        <a href = {editURL}> <p> Edit </p> </a>
                        <a> <p className = "hoverItem" onClick = {this.removePlan}> Remove </p> </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Plans;
