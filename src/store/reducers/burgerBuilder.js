import * as actionTypes from '../actions/actionTypes';

const initialState = {
  ingredients: null,
  totalPrice: 4,
  purchaseable: false,
  error: false,
};

const reducer = (state = initialState, action) => {
  const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
  };

  // eslint-disable-next-line default-case
  switch (action.type) {
    case actionTypes.SET_INGREDIENTS: {
      return {
        ...state,
        ingredients: action.ingredients,
        error: false,
      };
    }
    case actionTypes.FETCH_INGREDIENTS_FAILED: {
      return {
        ...state,
        error: true,
      };
    }
    case actionTypes.ADD_INGREDIENT: {
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientType]: state.ingredients[action.ingredientType] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientType],
        // ingredients: updatedIngredients,
        purchaseable: true,
      };
    }

    case actionTypes.REMOVE_INGREDIENT: {
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientType]: state.ingredients[action.ingredientType] - 1,
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientType],
        // ingredients: updatedIngredients,
        purchaseable: true,
      };
    }
  }

  return state;
};

export default reducer;
