import React, { Component } from 'react';
import './EditDay.css';
import axios from 'axios';
import queryString from 'query-string';


class EditDay extends Component{
    constructor(props){
        super(props);
        var queryParams = queryString.parse(this.props.location.search);
        this.state = {
            title:'',
            description: '',
            id: queryParams.id,
            prevURL : document.referrer
        }
        this.changeSearchValue = this.changeSearchValue.bind(this);
        this.editDay = this.editDay.bind(this);
    }

    //change search values
    changeSearchValue(){
        this.setState({
            title: this.editTitle.value,
            description: this.editDescription.value
        });
    }

    //edit day
    editDay(){
        axios.patch("http://localhost:4000/api/editPlan/day", {
            params:{
                id: this.state.id,
                title: this.state.title,
                description: this.state.description
            }
        })
        .then(res => {
            alert(res.data);
        })
        .catch(err =>{
            alert(err);
        })
    }

    render(){
        return(
            <div className = "container">
                <div className = "halign-wrapper">
                    <a href = {this.state.prevURL}> <button className = "waves-effect waves-light btn center-align"> Back </button> </a>
                </div>

                <h1>  Edit Day  </h1>

                <div id = "forms">
                    <div className = "col s12">
                        <form className = "col s12">
                            <textarea ref = {input => this.editTitle = input} className = "materialize-textarea" onChange = {this.changeSearchValue}> </textarea>
                            <label htmlFor = "Title"> Title </label>
                        </form> 

                        <form className = "col s12">
                            <textarea ref = {input => this.editDescription = input} className = "materialize-textarea" onChange = {this.changeSearchValue}> </textarea>
                            <label htmlFor = "Summary"> Description</label>
                        </form>

                        <div className = "halign-wrapper">
                            <button className = "waves-effect waves-light btn center-align" onClick = {this.editDay}> Submit </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditDay;
