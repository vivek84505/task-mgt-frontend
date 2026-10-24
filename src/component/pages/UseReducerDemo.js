 

// usestate
// useReducer => State management
// useeffect => side effect
// usecallback
// usememo => optimization
// useRef => Reference
// useContext => Context Management
// Custom Hook => Code Reusablity


import React, { useReducer } from 'react';

function cartReducer(state, action) {

  switch (action.type) {
    case 'add':
      return [...state, action.payload];
    case 'remove':
      return state.filter(item => item.id !== action.payload.id);
    default:
      return state;
  }
}

// function addnumbers(a,b){
//     return a+b
// }

// res = addnumbers(10,20)

// action = "What action you want to perform"
// payload = "request data object"

function UseReducerDemo() {
  const [cart, dispatch] = useReducer(cartReducer, []);

//   const [mycounter, setCount] = useState(0);
  

  const addItem = (item) => {
    dispatch({ type: 'add', payload: item });
  }

  const removeItem = (item) => {
    dispatch({ type: 'remove', payload: item });
  }

  const generateRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const randomVal = generateRandom(1, 100); // Range: 1 to 100

  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {cart.map(item => (
          <li key={item.id}>
            {item.id} {item.name} - ${item.price}
            <button onClick={() => removeItem(item)}>Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={() => addItem({ id: randomVal, name: 'Item 1', price: 9.99 })}>Add Item</button>
    </div>
  );
}


export default UseReducerDemo