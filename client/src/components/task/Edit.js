import React from 'react'
import axios from '../../config/axios'
import Form from './Form'



class Edit extends React.Component{
    constructor(props){
        super(props)
        this.state={
            task : props ? props.task : ""
        }
    }

    submitHandle=(formData)=>{
        axios.put(`/tasks/${this.state.task._id}`, formData, {
            headers:{
                "x-auth": localStorage.getItem("authToken")
            }
        })
            .then(response=>{
                this.props.submitHandle(response.data)
            })
            .catch(err=>{
                alert(err)
            })
    }

    render(){
        console.log(this.state.task)
        return(
            <div>
                {/* <h2 className="text-center">Edit Task</h2> */}
                {this.state.task && <Form submitHandle={this.submitHandle} cancelHandle={this.props.cancelHandle} task={this.state.task}/>}
            </div>
        )
    }
}

export default Edit