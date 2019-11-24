import React from 'react'
import {Formik} from 'formik'
import * as Yup from 'yup'
import Error from './Error'
import axios from '../../config/Axios'
import CreatableSelect from 'react-select/creatable';

const validationSchema = Yup.object().shape({
    title: Yup.string().min(2,"Must have atleast 2 characters").max(255,"Must be shorter than 255").required('Must enter a title'),
    labels: Yup.array().min(1, "Pick at least 1 tag").of(Yup.object().shape({label: Yup.string().required(),value: Yup.string().required()}))
})

function Form(props){
    let options = props.labels
    return(
        <Formik 
            initialValues={{
                title:'',
                labels:'',
                isLoading:false
            }} 
            validationSchema={validationSchema}
            onSubmit = {(values,{setSubmitting,resetForm})=>{
                setSubmitting(true)
                window.alert(JSON.stringify(values,null,2))
                setSubmitting(false)
                resetForm(true)
            }}
        >
            {({values,errors,touched,handleChange,setFieldValue,handleBlur,handleSubmit,isSubmitting,resetForm})=>{
                return(
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor='title'>Title</label>
                            <input type='text' name='title' id='title' value={values.title} onChange={handleChange} onBlur={handleBlur}/>
                            <Error touched={touched.title} message={errors.title}/>
                        </div>
                        
                        <div>
                            <label htmlFor='labels'>Labels</label>
                            <CreatableSelect
                                placeholder='Grab your labels here'
                                name = 'labels'
                                id = 'labels'
                                isClearable
                                onBlur = {handleBlur}
                                isMulti
                                isDisabled={values.isLoading}
                                isLoading={values.isLoading}
                                onChange={(selectedOptions)=>{
                                    const newItem = selectedOptions && selectedOptions.find(option => option._isNew_)
                                    if (newItem){
                                        setFieldValue('isLoading',true)
                                        const postData = {"name":newItem.value,"user":props.user}
                                        axios.post('/labels',postData,{headers:{'x-auth':localStorage.getItem('authToken')}})
                                            .then(response=>{
                                                options.push({'label':response.data.name,'value':response.data._id})
                                                setFieldValue('labels',selectedOptions)
                                                setFieldValue('isLoading',false)
                                            })
                                            .catch(err=>{
                                                window.alert(err)
                                                setFieldValue('isLoading',false)
                                            })
                                    }else{
                                        setFieldValue('labels',selectedOptions)
                                    }
                                }}
                                options={options}
                                value={values.labels}
                            />
                            <Error touched={touched.labels} message={errors.labels}/>
                        </div>
                        <div>
                            <label htmlFor='dueDate'>Due Date</label>
                            <Error touched={touched.dueDate} message={errors.dueDate}/>
                        </div>
                        <div>
                            <input type='submit' value='Create Task' disabled={isSubmitting}/>
                        </div>
                        <div>
                            <input type='button' value='Reset' onClick={()=>{resetForm(true)}}/>
                        </div>
                    </form>
                )
            }}
        </Formik>
    )
}

export default Form