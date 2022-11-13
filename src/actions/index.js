export const addProduct = (product) => {
    return {
        type: 'ADD_PRODUCT',
        payload: product
    }
}

export const delProduct = (product) => {
    return {
        type: 'DEL_PRODUCT',
        payload: product
    }
}

export const cleanProducts = () => {
    return {
        type: 'CLEAN_PRODUCTS'
    }
}