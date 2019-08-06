const Auth = (state = {
    payload : {
        Logged : false,
        Jwt : null,
        Name : null,
        Id : null,
        Email : null,
        Category : null, 
        Feed: "Feed",
        Profilepic : null,
        Speech : null,
    }
},
action ) => {
    switch(action.type){
        case 'SIGN_IN':{
            state.payload.Logged = true
            state.payload.Jwt = action.payload.Jwt
            state.payload.Name = action.payload.Name
            state.payload.Id = action.payload.Id
            state.payload.Email = action.payload.Email
            state.payload.Category = action.payload.Category
            state.payload.Profilepic = action.payload.Profilepic
            return state
        }
        case 'SIGN_OUT':{
            state.payload.Logged = false
            state.payload.Jwt = null
            state.payload.Name = null
            state.payload.Id = null
            state.payload.Feed = "Feed"
            state.payload.Email = null
            state.payload.Category = null
            state.payload.Profilepic = null
            return state
        }
        case 'SET_FEED':{
            state.payload.Feed = action.payload.Feed
            return state
        }
        case 'SET_SPEECH':{
            state.payload.Speech = action.payload.Speech
            return state
        }
        default:
            return state
    }
}

export default Auth