import React from 'react';
import withFirebase from '../../contexts/withFirebase'
import { Formik, Form, Field, ErrorMessage } from 'formik';

class EditForm extends React.Component {  
  constructor(props) {
    super(props);

    this.state = {
      artifactData: props.artifactData,
      artifactId: props.artifactId,
      description: "",
      date: null,
      familyMembers: ["Jimmy", "Joe", "Matt"],
    }
    
  }
  /* This life cycle hook gets executed when the component mounts */

  handleFormSubmit = () => {
    // Form submission logic
  }
  handleClearForm = () => {
    // Logic for resetting the form
  }

  handleUpdate = (e) => {
    let value = e.target.value
    let name = e.target.name
    this.setState( {[name]: value} )
    console.log(this.state)
  }

  render() {
    return (
    //   <form className="editForm" onSubmit={this.handleFormSubmit}>
    //     <Input type={'text'}
    //            title= {'Description'} 
    //            name= {'description'}
    //            value={this.state.artifactData.description}
    //            handleChange = {this.handleUpdate}
    //     />
    //     <Select title={'Related to: '}
    //             name={'related'}
    //             options = {this.state.familyMembers} 
    //             value = {this.state.artifactData.relatedFamilyMembers}
    //             handleChange = {this.handleInput}
    //     />
    //   </form>

    <div>
        <Formik 
            initialValues={ {description: this.state.artifactData.description}}
            validate={values => {
                let errors = {};
                if (!values.description) {
                    errors.description = "Description cannot be empty"
                }
                return errors
            }}
            onSubmit={ (values, {setSubmitting}) => {
                setTimeout(() => {
                    // this.props.firebase.db.ref('artifacts/' + this.state.artifactId).set( {
                    //     description: values.description
                    // })
                    let artifact = this.props.firebase.db.collection('artifacts').doc(this.state.artifactId)
                    let update = artifact.update({
                        description: values.description
                    })
                    setSubmitting(false);
                }, 400);
            }}
        >
            { ({ isSubmitting }) => (
                <Form>
                    <h3> Description </h3>
                    <Field type="description" name="description" />
                    <ErrorMessage name="description" component="div" />
                    <button type="submit" disabled={isSubmitting}>
                      Submit
                    </button>
                </Form>
            )}
        </Formik>
        
    </div>
    )
  }
}

export default EditForm;
