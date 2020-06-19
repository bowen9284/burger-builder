import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  ingredients: null,
  totalPrice: 4,
  purchaseable: false,
  error: false,
  building: false,
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const addIngredient = (state, action) => {
  const updatedIngredient = {
    [action.ingredientType]: state.ingredients[action.ingredientType] + 1,
  };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientType],
    purchaseable: true,
    building: true,
  };

  return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
  const updatedIngredient = {
    [action.ingredientType]: state.ingredients[action.ingredientType] - 1,
  };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientType],
    purchaseable: true,
    building: true,
  };

  return updateObject(state, updatedState);
};

const setIngredients = (state, action) => {
  return updateObject(state, {
    ingredients: action.ingredients,
    error: false,
    totalPrice: 4,
    building: false,
  });
};

const fetchIngredientsFailed = (state, action) => {
  return updateObject(state, { error: true });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_INGREDIENTS: {
      return setIngredients(state, action);
    }

    case actionTypes.FETCH_INGREDIENTS_FAILED: {
      return fetchIngredientsFailed(state, action);
    }

    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);

    case actionTypes.REMOVE_INGREDIENT: {
      return removeIngredient(state, action);
    }
    default:
      return state;
  }
};

export default reducer;
