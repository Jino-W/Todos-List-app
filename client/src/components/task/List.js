import React from 'react'
import axios from '../../config/axios'
import Edit from './Edit'
import Create from './Create'
import "../../bootstrap.css"
import Modal from 'react-modal';
import moment from 'moment'
import LabelInfo from './labelShow'
import MetisMenu from 'react-metismenu'
import '../../metisMenu.css'
import '../../App.css'
import {content, CustomLink} from "./customLink"
import swal from 'sweetalert'


class List extends React.Component{
    constructor(){
        super()
        this.state={
            tasks:[],
            visibleTasks: [],
            editTask: "",
            isEdit : false,
            modalIsOpen: false,
            labelModal_id: false
        }
    }

    //updating edited task in UI
    submitHandle = (editedTask) =>{
        this.setState(prevState=>{
            const task = prevState.tasks.find(item => item._id===editedTask._id)
            const currentTask = prevState.visibleTasks.find(item => item._id === editedTask._id)
            if(task){
                Object.assign(task, editedTask)
                Object.assign(currentTask,editedTask)
            }else{
                prevState.tasks.push(editedTask)
                if(!this.state.visibleTasks.every(task => task.isArchived)){
                    prevState.visibleTasks.push(editedTask)
                }
            }
            return {tasks:prevState.tasks,editTask:'',isEdit:false, modalIsOpen: false}
        })
    }


    //remove label badge
    removeLabel = (id,editedTask)=>{
        const postData = {'labels':editedTask.labels.filter(item=> item._id !== id)}
        axios.put(`/tasks/${editedTask._id}`,postData,{headers:{'x-auth':localStorage.getItem('authToken')}})
        .then(response=>{
            this.setState(prevState=>{
                const task = prevState.tasks.find(item=> item._id===editedTask._id)
                Object.assign(task,response.data)
                return {tasks:prevState.tasks}
            })
        })
        .catch(err=>{
            alert(err)
        })
    }


    //Enable edit form
    handleEdit=(task)=>{
        this.setState({isEdit: true, editTask: task})
    }

    //cancelling edit form
    cancelHandle=()=>{
        this.setState({isEdit: false})
    }

    //delete task
    handleDelete=(id)=>{
        swal({
            title: "Are you sure?",
            text: "Are you sure that you want delete this TASK?",
            icon: "warning",
            dangerMode: true,
            showCancelButton: true
        })
            .then(willDelete => {
                if (willDelete) {
                    axios.delete(`/tasks/${id}`, {
                        headers:{
                            "x-auth": localStorage.getItem("authToken")
                        }
                    })
                        .then(response=>{
                            console.log("taskDel:",response.data)
                            swal("Deleted!", "Task is deleted successfully!!", "success");
                            this.setState(prevState=>{
                                return {visibleTasks: prevState.tasks.filter(t=>t._id !== id), tasks: prevState.tasks.filter(t=>t._id !== id)}
                            })
                        })
                        .catch(err=>{
                            alert(err)
                        })
                }
            });
    }

    //Archive task
    handleArchive = (id) =>{
        let visibleTasks
        if(this.state.visibleTasks.every(task => !task.isArchived)){
            visibleTasks = this.state.visibleTasks.filter(task => task._id !==id)
        }
        const postData={"isArchived":true}
        axios.put(`/tasks/${id}`,postData,{headers:{
            'x-auth':localStorage.getItem('authToken')
        }})
        .then(()=>{
            this.setState(prevState=>{
                const task = prevState.tasks.find(task=> task._id === id)
                task.isArchived = true
                return {tasks:prevState.tasks, visibleTasks}
            })
        })
        .catch(err=>{
            swal(err, {icon: "error"});
        })
    }

    //MenuSelect
    handleMenuSelect = (label) =>{
        switch(label.onSelected){
            case 'Archived':
                this.setState({visibleTasks:this.state.tasks.filter(task=>task.isArchived)})
                break
            case 'Non Archived':
                this.setState({visibleTasks:this.state.tasks.filter(task=>!task.isArchived)})
                break
            case 'Completed':
                this.setState({visibleTasks:this.state.tasks.filter(task=>task.isCompleted)})
                break
            case 'In Progress':
                this.setState({visibleTasks:this.state.tasks.filter(task=>!task.isCompleted && moment(task.dueDate,'YYYY-MM-DD')> moment(new Date(),'DD/MM/YYYY'))})
                break
            case 'Pending':
                this.setState({visibleTasks:this.state.tasks.filter(task=>!task.isCompleted && moment(task.dueDate,'YYYY-MM-DD')< moment(new Date(),'DD/MM/YYYY'))})
                break
            default:
                this.setState({visibleTasks:this.state.tasks})
                break
        }
    }


    //Modal open
    openModal = () => {
        this.setState({modalIsOpen: true});
    }

    //create-Task,Label Modal close
    closeModal = () => {
        this.setState({modalIsOpen: false, labelModal_id: false});
    }

    //getting TASKS
    componentDidMount(){
        axios.get("/tasks",{
            headers:{
                "x-auth": localStorage.getItem("authToken")
            }
        })
            .then(response=>{
                this.setState({tasks: response.data,visibleTasks:[...response.data]})
            })
            .catch(err=>{
                swal(err, {icon: "error"});
            })
    }

    render(){
        // modal style
        const customStyles = {
            content : {
              top                   : '50%',
              left                  : '50%',
              right                 : 'auto',
              bottom                : 'auto',
              marginRight           : '-50%',
              transform             : 'translate(-50%, -50%)',
              overflow              : 'visible'
            }
          };
        return(
            <div className="row mt-3">
                {/* <div className="col-md-3">
                    <SideBar />
                </div> */}
                <div className='side-bar col-md-3'>
                    <MetisMenu content={content} onSelected={this.handleMenuSelect} LinkComponent={CustomLink}/>
                </div>
                <div className="col-md-8">
                    <div className="row mt-3">
                        <div className="col-md-12">
                            <h2 className="float-left" >Listing Tasks</h2>
                            <div className="float-right">

                                {/* creating new task */}
                                <a className="btn btn-primary" onClick={this.openModal} href="# ">New Task</a>

                                {/* Task Modal */}
                                <Modal isOpen={this.state.modalIsOpen} style={customStyles} onRequestClose={this.closeModal} contentLabel="Create Task">
                                    <Create submitHandle={this.submitHandle} cancelHandle={this.closeModal}/>
                                </Modal>

                                {/* Label Modal */}
                                <Modal isOpen={this.state.labelModal_id !== false} style={customStyles} onRequestClose={this.closeModal} contentLabel="view related tasks">
                                    <LabelInfo id={this.state.labelModal_id} cancelHandle={this.closeModal}/>
                                </Modal>
                            </div>
                        </div>
                    </div>


                    {/* Listing Task */}
                    {this.state.visibleTasks && <ul className ="list-group mt-4">{this.state.visibleTasks.map(task=>{
                        const {_id, createdAt , title, dueDate, isArchived, labels} = task

                        return (
                            <div key={_id} className="card list-group-item mt-3">{this.state.editTask._id === _id && this.state.isEdit ? 
                                
                                // Edit Form
                                (<Edit submitHandle={this.submitHandle} cancelHandle={this.cancelHandle} task={task}/>
                                ):(   
                                    
                                // map function to list tasks
                                <div>
                                    <div className="row">

                                        <div className="col-md-10 align-middle">
                                            <h5 className="d-inline">{title}</h5>
                                            <p className='d-inline-block small'>

                                                {/* Label badges */}
                                                {labels.map(label=>
                                                <span key={label._id} className= 'badge badge-pill badge-secondary ml-1'>
                                                <a href="# " className="green" data-toggle="tooltip" title="view related tickets"  onClick={()=>{this.setState({labelModal_id: label._id})}} style={{color:'white', textDecoration: "none"}}>{label.name}</a>

                                                {/* Inline label remove */}
                                                <a href='# '><i className="fas fa-minus-circle fa-sm ml-1" style={{color:'white'}} onClick={()=>{this.removeLabel(label._id,task)}}></i></a>
                                                </span>)}
                                            </p>
                                        </div>

                                    
                                        <div className="col-md-2 mt-2">
                                            {/* Archive button */}
                                            <a href={task.isArchived ? null:'# '} className={isArchived && "disable-links"}><i className="fas fa-archive mr-3"  onClick={()=>!task.isArchived?this.handleArchive(task._id): null}></i></a>
                                            
                                            {/* Delete button */}
                                            <a href='# '><i className="fas fa-trash-alt mr-3" onClick={()=>this.handleDelete(_id)}></i></a>
                                            
                                            {/* Edit button */}
                                            <a href='# '><i className="fas fa-edit" onClick={()=>this.handleEdit(task)}></i></a>
                                        </div>
                                        
                                    </div>
                                    
                                    <div className="mt-3 ml-1 row clearfix">
                                        <p className="float-left"><strong>Created At: </strong>{moment(createdAt).format('L LT')}</p>
                                        <p className="float-right ml-5"><strong>Due Date: </strong>{moment(dueDate).format('L LT')}</p>
                                    </div>

                                </div>)
                            }</div>
                        )
                    })}</ul>}
                </div>
            </div>
        )
    }
}

Modal.setAppElement('#root')


export default List