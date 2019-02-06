import React, { Component } from 'react';
import './EditPlan.css';
import queryString from 'query-string';
import axios from 'axios';
import DaysView from '../DaysView/DaysView';

//Component to edit existing trip_plan component
class EditPlan extends Component{
    constructor(props){
        super(props);
        //get trip_plan id from query string, update state
        var queryParams = queryString.parse(this.props.location.search);
        this.state = {
            title:'',
            summary: '',
            id: queryParams.id
        }
        this.changeSearchValue = this.changeSearchValue.bind(this);
        this.editTrip = this.editTrip.bind(this);
    }

    //change search values based on input
    changeSearchValue(){
        this.setState({
            title: this.editTitle.value,
            summary: this.editSummary.value
        });
    }

    //onClick function to update trip details, when user clicks button
    //update trip_plan record in database based on id
    editTrip(){
        axios.patch('http://localhost:4000/api/editPlan', {
            params:{    
                id: this.state.id,
                title: this.state.title,
                summary: this.state.summary
            }
        })
        .then(res => {
            alert(res.data);
        })
        .catch(err => {
            alert(err);
        })
    }

    render(){
        return(
            <div className = "container">
                <div className = "halign-wrapper">
                    <a href = "/trip-plans"> <button className = "waves-effect waves-light btn center-align"> Back </button> </a>
                </div>

                <h1>  Edit Trip Plan  </h1>

                <div id = "forms">
                    <div className = "col s12">
                        <form className = "col s12">
                            <textarea ref = {input => this.editTitle = input} className = "materialize-textarea" onChange = {this.changeSearchValue}> </textarea>
                            <label htmlFor = "Title"> Title </label>
                        </form> 

                        <form className = "col s12">
                            <textarea ref = {input => this.editSummary = input} className = "materialize-textarea" onChange = {this.changeSearchValue}> </textarea>
                            <label htmlFor = "Summary"> Summary (Provide quick summary) </label>
                        </form>

                        <div className = "halign-wrapper">
                            <button className = "waves-effect waves-light btn center-align" onClick = {this.editTrip}> Submit </button>
                        </div>
                    </div>
                </div>
                <DaysView id = {this.state.id}/>
            </div>
        );
    }
}

export default EditPlan;
