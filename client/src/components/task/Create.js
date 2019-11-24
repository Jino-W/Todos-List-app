import React from 'react'
import axios from '../../config/axios'
import Form from './Form'


class Create extends React.Component{
    submitHandle = (formData) => {
        console.log("submit",formData)
        axios.post("/tasks", formData, {
            headers:{
                "x-auth": localStorage.getItem("authToken")
            }
        })
            .then(response=>{
                console.log("tasks:",response.data)
                this.props.submitHandle(response.data)
            })
            .catch(err=>{
                alert("tasks:", err)
            })
    }
    cancelHandle=()=>{
        this.props.cancelHandle()
    }

    render(){
        return(
            <div>
                <h2 className="text-center">New Task</h2>
                <Form cancelHandle={this.cancelHandle} submitHandle={this.submitHandle} />
            </div>
        )
    }
}

export default Create