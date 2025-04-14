import {createContext, useReducer} from "react"

const tableData = {
    page: 0,
    rowsPerPage: 10,
    selectedProduct: null,
    isPopUpOpen: false,

    products : [],

    popUpInputsValues: {
        name: "",
        type: "",
        price: "",
        stock: "",
    },

    searchInputValue: "",
    filteredProducts: [],


    confirmDeletePopUp: {
        isOpen: false,
        message: "",
        onConfirm: null,
      }
}



const productReducer = (state, action) => {

    switch (action.type) {

        case "getProducts": 
            return {
                ...state,
                products: Array.isArray(action.payload) ? action.payload : []
            }

        case "handleChangePage":
            return {
                ...state,
                page: action.payload
            };
        
        case "getSelectedProduct":
            return {
                ...state,
                selectedProduct: action.payload,
                popUpInputsValues: action.payload
                ? { ...action.payload } // Se estiver editando, preenche com os dados do produto
                : { name: "", type: "", price: "", stock: "" } // Se for novo, reseta os valores
            };

        case "updatePopUpInputsValues":
            return {
                ...state,
                popUpInputsValues: { ...state.popUpInputsValues, [action.payload.name]: action.payload.value }
            };

        case "updateProduct":
            return {
                ...state,
                products: state.products.map((product) =>
                product.id === action.payload.id ? { ...product, ...action.payload } : product
                ),
                selectedProduct: null, // Reseta o produto selecionado após a edição
                popUpInputsValues: {
                    name: "",
                    type: "",
                    price: "",
                    stock: "",
                },
            };
            

        case "onPopUpOpen":
            return {
                ...state,
                isPopUpOpen: true,
            };
            
        case "onPopUpClose":
            return {
                ...state,
                isPopUpOpen: false,
            };

        case "removeProduct":
            return {
                ...state,
                products: state.products.filter((p) => p.id !== action.payload),
                selectedProduct: null,
                popUpInputsValues: {
                    name: "",
                    type: "",
                    price: "",
                    stock: "",
                },
            }
        
        case "searchProductInput":
            return {
                ...state,
                searchInputValue: action.payload,
                filteredProducts: state.products.filter((product) =>
                    product.name.toLowerCase().startsWith(action.payload.toLowerCase())
                ),
            }

        case "openConfirmDeletePopUp":
            return {
                ...state,
                confirmDeletePopUp: {
                isOpen: true,
                message: action.payload.message,
                onConfirm: action.payload.onConfirm,
                },
            };
              
        case "closeConfirmDeletePopUp":
            return {
                ...state,
                confirmDeletePopUp: {
                isOpen: false,
                message: "",
                onConfirm: null,
                },
                selectedProduct: null,
                popUpInputsValues: {
                    name: "",
                    type: "",
                    price: "",
                    stock: "",
                },
            };
              
        case "confirmDelete":
            if (state.confirmDeletePopUp.onConfirm) {
                state.confirmDeletePopUp.onConfirm();
            }
            return {
                ...state,
                confirmDeletePopUp: {
                isOpen: false,
                message: "",
                onConfirm: null,
                },
            };
              

        
        default:
            return state;
    }
    

};

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [state, dispatch] = useReducer(productReducer, tableData);

    return (
        <ProductContext.Provider value={{ state, dispatch }}>
            {children}
        </ProductContext.Provider>
    );
};



