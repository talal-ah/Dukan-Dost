import React from 'react'

function StoreToken(token) {

    if (token) {
        localStorage.setItem('access_token',token.access );
        localStorage.setItem('Refresh_token',token.refresh);
        
    }
    


}
function GetToken() {

   
       let access_token= localStorage.getItem('access_token' );
       let Refresh_token= localStorage.getItem('Refresh_token');
        
    return {access_token,Refresh_token}


}
function RemoveToken() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('Refresh_token')
    
}

export {StoreToken,GetToken,RemoveToken};
