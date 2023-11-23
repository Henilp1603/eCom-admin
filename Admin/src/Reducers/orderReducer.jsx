const productReducer = (state, action) => {
    switch (action.type) {

      case "SET_API_DATA":
        
        return {
          ...state,
          orders: action.payload,
        };
  
      case "SET_SINGLE_ORDER":
        return {
          ...state,
          sigleorder: action.payload,
        };

      case "SET_USER_ORDER":
      return{
        ...state,
        userOrder:action.payload
      }  

      case "REMOVE_ITEM": 
          return {
            orders:state.orders.filter((pro)=>{
              return pro.id !== action.payload
            })
          };
  
      default:
        return state;
    }
  };
  
  export default productReducer;
  