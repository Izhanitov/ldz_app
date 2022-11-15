const initialState = {
    products: [],
    contact: {}
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_PRODUCT':
            const existingProduct = state.products.find(item => item.id === action.payload.id && item.sizeid === action.payload.sizeid);

            if(existingProduct) {
                return {
                            ...state,
                            products: [...state.products.filter(item => item.id !== existingProduct.id || item.sizeid !== existingProduct.sizeid), action.payload]
                }
            } else {
                return {
                    ...state,
                    products: [...state.products, action.payload]
                }
            }
    
        case 'DEL_PRODUCT':
            const delProduct = state.products.find(item => item.id === action.payload.id && item.sizeid === action.payload.sizeid);
            if(delProduct) {
                return {
                            ...state,
                            products: [...state.products.filter(item => item.id !== delProduct.id || item.sizeid !== delProduct.sizeid)]
                }
            }
            else return state

        case 'CLEAN_PRODUCTS':
            return {
                        ...state,
                        products: []
            }

        default: return state;
    }
}

export default reducer;