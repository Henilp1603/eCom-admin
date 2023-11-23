import {createContext, useCallback, useContext, useEffect, useMemo, useReducer} from "react";
import axios from "axios";
import orderReducer from "../Reducers/orderReducer";

const initialState = {
  orders: [],
  sigleorder: {},
  userOrder:[]
};

const API = `${import.meta.env.VITE_SERVER_API}/api/order/all-order`;

const OrderContext = createContext(initialState);

const OrderProvider = ({children}) => {
  const [state, dispatch] = useReducer(orderReducer, initialState);

  const getOrders = useCallback(async (url) => {
    const res = await axios.get(url);
    const orders = await res.data;
    dispatch({type: "SET_API_DATA", payload: orders});
  },[state.orders])

  const getSingleOrder = async (url) => {
    const res = await axios.get(url);
    const singleOrder = await res.data;
    dispatch({type: "SET_SINGLE_ORDER", payload: singleOrder});
  };

  const removeOrder=useCallback(async(id)=>{
    const url=`${import.meta.env.VITE_SERVER_API}/api/order/order-delete/${id}`
    const res=await axios.delete(url)
    getUsers(API)
    // dispatch({type:"REMOVE_ITEM",payload:id})
  },[state.orders])

  const findOrderByUser=useCallback(async(id)=>{
    const url=`${import.meta.env.VITE_SERVER_API}/api/order/get-user-orders/${id}`

    const res=await axios.get(url)
    const UserOrder=await res.data
    dispatch({type:"SET_USER_ORDER",payload:UserOrder})
  })

  useEffect(() => {
    getOrders(API);
  },[]);

  return (
    <OrderContext.Provider value={{...state, getSingleOrder,getOrders,removeOrder,findOrderByUser}}>
      {children}
    </OrderContext.Provider>
  );
};

const useOrderContext = () => {
  return useContext(OrderContext);
};

export {OrderProvider, OrderContext, useOrderContext};
