console.clear();

const {createStore, combineReducers} = Redux;

// Action Creators

const createClaim = (name, amount) => {
  return {
    type: 'CREATE_CLAIM',
    payload: {
      name: name,
      amount: amount
    }
  }
}

const createPolicy = (name) => {
  return {
    type: 'CREATE_POLICY',
    payload: {
      name: name,
      amount: 20
    }
  }
}

const deletePolicy = (name) => {
  return {
    type: 'DELETE_POLICY',
    payload: {
      name: name,
    }
  }
}

// Reducers 
const claimsHistory = (oldListOfClaims = [], action) => {
  if (action.type === 'CREATE_CLAIM'){
    return [...oldListOfClaims, action.payload]
  }
  
  return oldListOfClaims;
  
}

const accounting = (bagOfMoney = 100, action) => {
  if(action.type === 'CREATE_CLAIM'){
    return bagOfMoney - action.payload.amount;
  } else if (action.type === 'CREATE_POLICY') {
    return bagOfMoney + action.payload.amount
  }
  
  return bagOfMoney;
}

const policies = (listOfPolicies = [], action) => {
  if(action.type === 'CREATE_POLICY'){
    return [...listOfPolicies, action.payload.name];
  } else if (action.type === 'DELETE_POLICY') {
    return listOfPolicies.filter(policy => policy != action.payload.name )
  }
  return listOfPolicies;
}

//  CombineReducers -> Take different reducers and turn them into one unity

const ourDepartments = combineReducers({
  claimsHistory,
  policies,
  accounting
})

const store = createStore(ourDepartments);

store.dispatch(createPolicy('Alex'));
store.dispatch(createPolicy('Kaianm'));
store.dispatch(createClaim('Alex', 100));


console.log(store.getState()); 
