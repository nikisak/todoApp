import { composeURL } from './environment.const';

export const updateTODO = (payload,endpoint) => {
    let postBody = {
        method : "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }
    return fetch(composeURL(endpoint),postBody).then(
        response => {
            if(!response.ok) throw new Error();
            return response.json()
        } 
    ).catch( err => ({success : false, message : "Some thing went wrong."}) );
}

