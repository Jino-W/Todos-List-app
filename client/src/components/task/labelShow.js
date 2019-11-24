import React from 'react'
import axios from '../../config/axios'

class LabelInfo extends React.Component{
    constructor(props){
        super(props)
        this.state={
            label_id: props ? props.id: "",
            label_name:"",
            label_tasks:[]
        }
    }
    

    componentDidMount(){
        axios.get(`/labels/${this.state.label_id}`,{
            headers:{
                "x-auth": localStorage.getItem("authToken")
            }
        })
            .then(response=>{
                console.log("R",response.data)
                this.setState({label_name: response.data.label.name , label_tasks: response.data.tasks})
            })
            .catch(err=>{
                alert(err)
            })
    }

    render(){
        return(
            <div className="row">
                <div className="col-md-12 d-flex justify-content-end">
                    <a href='# ' onClick={()=>this.props.cancelHandle()} ><i className="fas fa-times-circle" ></i></a>
                </div>
                <div className="col-md-12 d-flex justify-content-start">
                    <h5>Related Tasks to "{this.state.label_name}"</h5>
                </div>
                <div className="col-md-12 d-flex justify-content-start">
                    {this.state.label_tasks.length > 0 && 
                    <div>
                        <ul>{this.state.label_tasks.map(task=>{
                            return <li key={task._id}>{task.title}</li>
                        })}</ul>
                    </div>}
                </div>
            </div>
        )
    }
}

export default LabelInfo