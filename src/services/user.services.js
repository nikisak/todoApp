import { USER_ENDPOINTS, composeURL } from './environment.const';

export const loginUser = (payload) => {
    let postBody = {
        method : "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }
    return fetch(composeURL(USER_ENDPOINTS.LOGIN),postBody).then(
        response => {
            if(!response.ok) throw new Error();
            return response.json()
        } 
    ).catch( err => ({success : false, message : "Some thing went wrong."}) );
}

export const registerUser = (payload) => {
    let postBody = {
        method : "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }
    return fetch(composeURL(USER_ENDPOINTS.REGISTER),postBody).then(
        response => {
            if(!response.ok) throw new Error();
            return response.json()
        } 
    ).catch( err => ({success : false, message : "Some thing went wrong."}) );
}
