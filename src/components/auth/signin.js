import React , {Component} from 'react';
import { reduxForm , Field } from 'redux-form';
import {connect} from 'react-redux';
import * as actions from '../../actions';

class Signin extends Component {
  handleFormSubmit(values){
    console.log(values)
    this.props.signinUser(values);
  }

  renderAlert(){
    if(this.props.errorMessage){
      return(
        <div className="alert alert-danger">
          <strong>Oops! {this.props.errorMessage}</strong>
        </div>
      )
    }
  }

  render(){
    const { handleSubmit } = this.props;

    return(
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Email</label>
          <Field component="input" name="email" className="form-control" />
        </fieldset>
        <fieldset className="form-group">
          <label>Password</label>
          <Field component="input" type="password" name="password" className="form-control" />
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className= "btn btn-primary">Sign in </button>
      </form>
    );
  }
}
function mapStateToProps(state){
  return {errorMessage:state.auth.error};
}


export default reduxForm({
  form:'signin'
})(connect(mapStateToProps,actions)(Signin));
