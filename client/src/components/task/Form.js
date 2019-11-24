import React from 'react'
import {Formik} from 'formik'
import * as Yup from 'yup'
import Error from './Error'
import axios from '../../config/axios'
import CreatableSelect from 'react-select/creatable';
import '../../bootstrap.css'
import DateTime from 'react-datetime'
import './picker.css'
import moment from 'moment'

const validationSchema = Yup.object().shape({
    title: Yup.string().min(2,"Must have atleast 2 characters").max(255,"Must be shorter than 255").required('Must enter a title'),
    label: Yup.array().ensure().required("Must have atleast one label"),
    dueDate: Yup.date().required('Must enter a Date').min(new Date(),'Due date should be a future date')
})

class Form extends React.Component{

    constructor(props){
        super(props)
        this.state={
            options:[]
        }
    }

    componentDidMount(){
        axios.get('/labels',{headers:{'x-auth':localStorage.getItem('authToken')}})
            .then(response=>{
                const options=[]
                const user = response.data[0] && response.data[0].user
                response.data.map(item=>{
                    return options.push({'label':item.name,'value':item._id})
                })
                this.setState({options,user})
            })
            .catch(err=>{
                window.alert(err)
            })
    }

    labelsPostHandle = (newLabels)=>{
        if(newLabels && newLabels !== ""){
            return axios.post('/labels', newLabels, {headers:{
                'x-auth':localStorage.getItem('authToken')
            }})
        }else{
            return Promise.resolve({'data':[]})
        }
    }

    render(){
        return(
            <Formik 
                initialValues={{
                    title: this.props.task ? this.props.task.title : '',
                    label: this.props.task ? this.props.task.labels.map(label=>{return{'label':label.name,'value':label._id}}):'',
                    newLabels:"",
                    isLoading:false,
                    dueDate: this.props.task ? moment(this.props.task.dueDate).utc() : new Date()
                }} 
                validationSchema={validationSchema}
                onSubmit = {(values,{setSubmitting,resetForm})=>{
                    this.labelsPostHandle(values.newLabels)
                        .then(response=>{
                            const label = []
                            response.data.map(item=>label.push(item._id))  //new items
                            values.label.map(item => !item.__isNew__ ? label.push(item.value) : item)  //old items
                            const formData = {"title":values.title,"dueDate":values.dueDate, "labels": label}
                            this.props.submitHandle(formData)
                        })
                        .catch(err=>{
                            window.alert(err)
                        })
                }}
            >
                {({values,errors,setFieldTouched,touched,handleChange,setFieldValue,handleBlur,handleSubmit,isSubmitting,resetForm})=>{
                    return(
                        <form onSubmit={handleSubmit} >
                            <div className="row">
                                <div className="col-md-12 d-flex justify-content-end">
                                    <a href='# '><i className="fas fa-redo mr-3" onClick={()=>{resetForm(true)}}></i></a>
                                    <a href='# '><i className="fas fa-times-circle" onClick={()=>this.props.cancelHandle()}></i></a>
                                </div>
                                <div className="col-md-12">
                                    <label htmlFor='title'><h6>Task</h6></label>
                                    <input type='text' className="form-control" name='title' id='title' value={values.title} onChange={handleChange} onBlur={handleBlur}/>
                                    <Error touched={touched.title} message={errors.title}/>
                                </div>
                                
                                
                                <div className="mt-3 col-md-6">
                                    <label htmlFor='label'><h6>Labels</h6></label>
                                    <CreatableSelect
                                        placeholder='Grab your labels here'
                                        name = 'label'
                                        id = 'label'
                                        isClearable
                                        onBlur={()=>setFieldTouched("label")}
                                        isMulti
                                        isDisabled={values.isLoading}
                                        isLoading={values.isLoading}
                                        onChange={(selectedOptions)=>{
                                            const newLabels = []
                                            selectedOptions && selectedOptions.map(label=> {
                                                if(label.__isNew__) newLabels.push({'name':label.value})
                                                return label
                                            })
                                            setFieldValue('label',selectedOptions)
                                            setFieldValue('newLabels',newLabels)}}
                                        options={this.state.options}
                                        value={values.label}
                                    />
                                    <Error touched={touched.label} message={errors.label}/>
                                </div>
                                
                                <div className="mt-3 col-md-6">
                                    <label htmlFor='dueDate'><h6>Due Date</h6></label>
                                    <DateTime 
                                        name='dueDate' 
                                        id='dueDate'
                                        onBlur={()=>setFieldTouched("dueDate")}
                                        onChange={(moment)=>{
                                            setFieldValue('dueDate',moment.utc())}}
                                        value={values.dueDate}
                                    />
                                    <Error touched={touched.dueDate} message={errors.dueDate}/>
                                </div>
                                
                                <div className="col-md-12 mt-4">
                                    <input className="btn btn-primary btn-lg btn-block" type='submit' value='Create Task' disabled={isSubmitting}/>
                                </div>

                            </div>
                        </form>
                    )
                }}
            </Formik>
        )
    }
}

export default Form