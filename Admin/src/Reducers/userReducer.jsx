const userReducer = (state, action) => {
    switch (action.type) {

      case "SET_API_DATA":
        
        return {
          ...state,
          users: action.payload,
        
        };
  
      case "SET_SINGLE_USER":
        return {
          ...state,
          sigleUser: action.payload,
        };

      case "REMOVE_ITEM": 
          return {
            users:state.users.filter((pro)=>{
              return pro.id !== action.payload
            })
          };
  
      default:
        return state;
    }
  };
  
  export default userReducer;
  