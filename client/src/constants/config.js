export const API_NOTIFICATION={
    lodading:{
        title:"loading....",
        message:"please wait few seconds.data is being loaded"
    }, 
    success:{
        title:"success",
        message:"Data successfully loaded"
    },
    responseFailure:{
        title:"Error",
        message:"There was error fetching response from the server"
    },
    requestFailure:{
        title:"Error",
        message:"There was an error making the request"
    },
    networkError: {
        title: "Error!",
        message: "Unable to connect to the server. Please check internet connectivity and try again."
    }

}
//  SERVICE_URL

export const SERVICE_URL={
    userSignup: { url: '/signup', method: 'POST' },
    userLogin:{url:'/login',method:'POST'},
    uploadFile:{url:'/file/uplaod',method:'POST'},
}