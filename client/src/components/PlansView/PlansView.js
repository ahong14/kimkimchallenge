import React, { Component } from 'react';
import {Route, Link, BrowserRouter as Router} from 'react-router-dom';
import './PlansView.css';
import axios from 'axios';
import Plans from '../Plans/Plans';

class PlansView extends Component{

    constructor(props){
        super(props);
        this.state= {
            plans: []
        };

        this.getPlans = this.getPlans.bind(this);
    }

    //get plans function, executed in child component when a plan is removed or added
    getPlans(){
        axios.get("http://localhost:4000/api/getPlans")
            .then(res => {
                this.setState({
                    plans: res.data
                })
            })
            .catch(err => {
                alert(err);
            })
    }

    //get plans when component mounts
    componentDidMount(){
      this.getPlans();
    }

    render(){
        const results = this.state.plans.map(result => {
            return <Plans key = {result.id} id = {result.id} title = {result.title} summary = {result.summary} created = {result.created_at} updated = {result.updated_at} getPlans = {this.getPlans}/>
        })

        const link = "new";

        return(
            <div className = "container">
                <div className = "align-center" id = "header">
                    <h1> My Trip Plans </h1>
                    <a href = "/new"> <button className = "waves-effect waves-light btn-large"> Create a trip plan </button> </a>
                </div>

                <div className = "row" id = "planResults">
                    {results}
                </div>
            </div>
        );
    }
}

export default PlansView;

