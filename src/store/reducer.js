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

  const updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(key => {
        return ingredients[key];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    return {
      ...state,
      purchaseable: sum > 0
    };
  };

  // eslint-disable-next-line default-case
  switch (action.type) {
    case actions.LOAD_INGREDIENTS: {
        console.log(action);
      return {
        ...state,
        ingredients: action.ingredients
      };
    }
    case actions.ADD_INGREDIENT: {
      let type = action.ingredientType;
      const count = state.ingredients[type];
      const updatedCount = count + 1;

      const updatedIngredients = {
        ...state.ingredients
      };

      updatedIngredients[type] = updatedCount;
      const priceAddition = INGREDIENT_PRICES[type];
      const oldPrice = state.totalPrice;
      const newPrice = oldPrice + priceAddition;

      updatePurchaseState(updatedIngredients);
      return {
        ...state,
        totalPrice: newPrice,
        ingredients: updatedIngredients,
        purchaseable: true
      };
    }

    case actions.REMOVE_INGREDIENT: {
      let type = action.ingredientType;
      const count = state.ingredients[type];

      const updatedIngredients = {
        ...state.ingredients
      };

      const priceToSubtract = INGREDIENT_PRICES[type];
      const oldPrice = state.totalPrice;
      const newPrice = oldPrice - priceToSubtract;

      if (count > 0) {
        updatedIngredients[type] = count - 1;
      }

      updatePurchaseState(updatedIngredients);
      return {
        ...state,
        totalPrice: newPrice,
        ingredients: updatedIngredients
      };
    }
  }

  return state;
};

export default reducer;
