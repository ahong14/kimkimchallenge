import React, { Component } from 'react';
import './Plans.css';
import axios from 'axios';
import querystring from 'querystring';

class Plans extends Component{

    constructor(props){
        super(props);
        this.state = {
            id: -1
        }
        this.removePlan = this.removePlan.bind(this);
    }

    componentDidMount(){
        this.setState({
            id: this.props.id
        })
    }

    removePlan(){
        axios.delete("http://localhost:4000/api/removePlan", {
            params: {
                id: this.state.id
            }
        }).then(res => {
                console.log("deleting plan");
                //update plan view by getting new result of plans
                this.props.getPlans();
            })
            .catch(err => {
                alert(err);
            })
    }

    render(){
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