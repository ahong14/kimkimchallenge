import React, { Component } from 'react';
import './EditPlan.css';
import queryString from 'query-string';
import axios from 'axios';
import DaysView from '../DaysView/DaysView';


class EditPlan extends Component{

    constructor(props){
        super(props);
        var queryParams = queryString.parse(this.props.location.search);
        this.state = {
            title:'',
            summary: '',
            id: queryParams.id
        }

        this.changeSearchValue = this.changeSearchValue.bind(this);
        this.editTrip = this.editTrip.bind(this);
    }

    //change search values
    changeSearchValue(){
        this.setState({
            title: this.editTitle.value,
            summary: this.editSummary.value
        });
    }

    //onclick function to update trip details
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

    //extract id from query param of url
    // componentDidMount(){
     
    // }

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
