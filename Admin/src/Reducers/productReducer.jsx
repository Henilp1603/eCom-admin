const productReducer = (state, action) => {
    switch (action.type) {

      case "SET_API_DATA":
        
        return {
          ...state,
          products: action.payload,
          addedProduct:action.payload
        };
  
      case "SET_SINGLE_PRODUCT":
        return {
          ...state,
          sigleProduct: action.payload,
        };

      case "REMOVE_ITEM": 
          return {
            products:state.products.filter((pro)=>{
              return pro.id !== action.payload
            })
          };
  
      default:
        return state;
    }
  };
  
  export default productReducer;
  