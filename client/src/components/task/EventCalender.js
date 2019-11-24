import React from 'react'
import FullCalendar from 'fullcalendar-reactwrapper';
import axios from '../../config/axios'
import "./calender.css"

class EventCalender extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
            events: []
        }
    }
   

    componentDidMount(){
        axios.get("/tasks",{
            headers:{
                "x-auth": localStorage.getItem("authToken")
            }
        })
            .then(response=>{
                const events = response.data.map(task=>{
                    //title,start,end,id,url
                    return {
                        title: task.title,
                        start: task.createdAt,
                        end: task.dueDate 
                    }
                })
                this.setState({events})
            })
            .catch(err=>{
                alert(err)
            })
    }


    render() {
        return (
            <div className="mt-4" style={{height:'75vh'}}>
                <h3 className="page-header">
                    <i className="fa fa-calendar"></i> Calendar
                </h3>
                <hr/>
                <FullCalendar
                    height = 'parent'
                    id = "your-custom-ID"
                    header = {{
                        left: 'prev,next today myCustomButton',
                        center: 'title',
                        right: 'month,basicWeek,basicDay'
                    }}
                    defaultDate={Date.now()}
                    navLinks= {true} // can click day/week names to navigate views
                    editable= {true}
                    eventLimit= {true} // allow "more" link when too many events
                    events = {this.state.events}	
                />
            </div>
        )
    }
}

export default EventCalender