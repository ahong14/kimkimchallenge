import React, { Component } from 'react';
import './DaysView.css';
import Days from '../Days/Days';
import axios from 'axios';

//Component to display Days component
class DaysView extends Component{
    constructor(props){
        super(props);
        this.state = {
            days:[],
            title:'',
            description:'',
            id: this.props.id
        }
        this.changeSearchValue = this.changeSearchValue.bind(this);
        this.createDay = this.createDay.bind(this);
        this.getDays = this.getDays.bind(this);
    }

     //change search values based on input
     changeSearchValue(){
        this.setState({
            title: this.dayTitle.value,
            description: this.dayDescription.value
        });
    }

    //get days from database for current trip
    getDays(){
        axios.get('http://localhost:4000/api/getPlans/days', {
            params:{
                tripID: this.state.id
            }
        })
        .then(res => {
            //update collection of days
            this.setState({
                days: res.data
            })
        })
        .catch(err => {
            alert(err);
        })
    }

    //create day
    createDay(){
        //check for valid inputs
        if(this.state.title.trim() === '' && this.state.description.trim() === ''){
            alert("Please enter input for edits");
        }

        else if (this.state.title.trim() === '' && this.state.description.trim() != ''){
            alert("Please enter title!");
        }

        else if (this.state.title.trim() != '' && this.state.description.trim() === ''){
            alert("Please enter description!");
        }

        //create new day record and insert into database
        else{
            var date = new Date();
            axios.post("http://localhost:4000/api/newPlan/day", {
                params:{
                    title: this.state.title,
                    description: this.state.description,
                    created: date,
                    updated: date,
                    tripID: this.state.id
                }
            })
            .then(res => {
                //update results of days, render to screen
                alert(res.data);
                this.getDays();
            })
            .catch(err => {
                alert(err);
            })
        }
    }

    //get days from database for current trip
    componentDidMount(){
        this.getDays();
    }

    render(){
        //dynamic rendering of Days based on current results
        var dayCount = 0;
        const results = this.state.days.map(result => {
            return <Days key = {result.id} day = {dayCount+=1}id = {result.id} title = {result.title} description = {result.description} created = {result.created_at} updated = {result.updated_at} getDays = {this.getDays}/>
        })

        return(
            <div id = "days">
                <h1> Days </h1>

                <form className = "col s12">
                    <textarea ref = {input => this.dayTitle = input} className = "materialize-textarea" onChange = {this.changeSearchValue}> </textarea>
                    <label htmlFor = "Title"> Title </label>
                </form> 

                <form className = "col s12">
                    <textarea ref = {input => this.dayDescription = input} className = "materialize-textarea" onChange = {this.changeSearchValue}> </textarea>
                    <label htmlFor = "Description"> Description </label>
                </form>

                <div className = "halign-wrapper">
                    <button className = "waves-effect waves-light btn center-align" onClick = {this.createDay}> Add Day </button>
                </div>

                <div id = "daysResults">
                    {results}
                </div>
            </div>
        );
    }
}

export default DaysView;
