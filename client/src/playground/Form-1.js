import React from 'react'
import {Formik} from "formik"
import * as Yup from 'yup'         //validations on different input
import Error from "./Error"
import CreatableSelect from 'react-select/creatable';
import axios from '../../config/axios';

const validationSchema = Yup.object().shape({
    title: Yup.string().min(2, "Must have minimum 2 characters").max(255,"Must be shorter than 255").required("must enter title")
})

function Form(props){
    return(
    <Formik initialValues={{
        title: "", 
        labels:"",
        selectedOption: null,
        labelOptions: props ? props.labels : "",
        isLoading: false
    }} 
    validationSchema={validationSchema} 
    onSubmit={(values, {setSubmitting, resetForm})=>{
        setSubmitting(true);
        alert(JSON.stringify(values, null, 2));
        resetForm();
        setSubmitting(false);
    }} >  
        {({
            values,
            errors,
            touched,
            setFieldValue,
            handleChange,
            handleBlur,     
            handleSubmit,
            isSubmitting,
            formatCreate = inputValue => {
                return <p> Add: {inputValue}</p>;
            }
        })=> 
            (<form onSubmit={handleSubmit}>
                {console.log("labelsF",values.labelOptions, values.user)}
                <div>
                    <label htmlFor="title">Task:</label>
                    <input type="text" name="title" id="title" placeholder="Enter task" onChange={handleChange} onBlur={handleBlur} value={values.title}/>
                    <Error touched={touched.title} message={errors.title} />
                </div>
                
                <div>
                    <label htmlFor="label">Label:</label>
                    <CreatableSelect
                        isMulti
                        onChange={(selectedOptions)=>{
                            const newItem = selectedOptions && selectedOptions.find(labelOptions => labelOptions._isNew_)
                            console.log("selectedOptions",selectedOptions)
                            if (newItem){
                                setFieldValue('isLoading',true)
                                axios.post("/labels", {"name" : newItem.label},{
                                    headers:{
                                        "x-auth": localStorage.getItem("authToken")
                                    }
                                })
                                    .then(response=>{
                                        console.log("e",response.data)
                                        setFieldValue("labelOptions", values.labelOptions.concat({"label":response.data.name, "value": response.data.name}))
                                    })
                                    .catch(err=>{
                                        alert(err)
                                    })
                                setFieldValue('labels',selectedOptions)
                                setFieldValue('isLoading',false)
                            }else{
                                console.log("r")
                                setFieldValue('labels',selectedOptions)
                            }
                        }}
                        options={values.labelOptions}
                        value={values.labels}
                        formatCreateLabel={formatCreate}
                        createOptionPosition={"first"}
                        closeMenuOnSelect={true}
                        hideSelectedOptions={false}
                    />
                    <Error touched={touched.label} message={errors.label} />

                </div>
                <div>
                    <input type="submit" value='Create Task' disabled={isSubmitting}/>
                </div>
            </form>) 
        }
    </Formik>)
}
export default Form