import * as actions from './actions';

const initialState = {
  ingredients: {},
  totalPrice: 4,
  purchaseable: false
};

const reducer = (state = initialState, action) => {
  const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
  };

  // eslint-disable-next-line default-case
  switch (action.type) {
    case actions.LOAD_INGREDIENTS: {
      return {
        ...state,
        ingredients: action.ingredients
      };
  }
    case actions.ADD_INGREDIENT: {
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientType]: state.ingredients[action.ingredientType] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientType],
        // ingredients: updatedIngredients,
        purchaseable: true
      };
    }

    case actions.REMOVE_INGREDIENT: {
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientType]: state.ingredients[action.ingredientType] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientType],
        // ingredients: updatedIngredients,
        purchaseable: true
      };
    }
  }

  return state;
};

export default reducer;
