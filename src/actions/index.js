import axios from 'axios';
import {browserHistory} from 'react-router';
import {AUTH_USER,AUTH_ERROR,UNAUTH_USER,FETCH_MESSAGE} from './types';
const ROOT_URL='http://localhost:3090';

export function signinUser(values){
  const {email,password} = values;
  return function(dispatch){
    //submit email to server
    axios.post(`${ROOT_URL}/signin`,{email,password})
      .then(response=>{
        //=if good
        //-update state to indicate user authenticare
        dispatch({type:AUTH_USER});
        //-save jwt token
        localStorage.setItem('token',response.data.token)
        //-redirect to the route /feature
        browserHistory.push('/feature');
      })
      .catch(()=>{
        //=if bad
        //show an error
        dispatch(authError('Bad login info'));
      })
  }
}

export function signupUser(values){
  const {email,password} = values;
  return function(dispatch){
    //submit email to server
    axios.post(`${ROOT_URL}/signup`,{email,password})
      .then(response=>{
        //=if good
        //-update state to indicate user authenticare
        dispatch({type:AUTH_USER});
        //-save jwt token
        localStorage.setItem('token',response.data.token)
        //-redirect to the route /feature
        browserHistory.push('/feature');
      })
      .catch(()=>{
        //=if bad
        //show an error
        dispatch(authError('Bad login info'));
      })
  }
}

export function authError(error){
  return {
    type:AUTH_ERROR,
    payload:error
  }
}

export function signoutUser(){
  localStorage.removeItem('token');
  return {type:UNAUTH_USER};
}

export function fetchMessage(){
  return function(dispatch){
    axios.get(`${ROOT_URL}`,{
      headers:{authorization:localStorage.getItem('token')}
    })
    .then(response =>{
      dispatch({
        type:FETCH_MESSAGE,
        payload:response.data.message
      })
    })
  }
}
