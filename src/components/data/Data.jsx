import { useState, useEffect, useContext } from "react"
import { ProductContext } from "../../context/ProductsContext.jsx";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, TableFooter } from "@mui/material";
import "./Data.css"
import { getProducts } from "../../api/products.js"
import { AuthContext } from "../../context/AuthContext.jsx";


const Data = () => {

  const {state, dispatch} = useContext(ProductContext)
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true)

 useEffect(() => {
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await api.get('/products', {
        params: {
          userId: user?.id ?? null
        }
      });
      dispatch({ type: 'getProducts', payload: response.data });
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    } finally {
      setLoading(false);
    }
  };
}, []);


  const selectedProduct = (product) => {
    dispatch({type: "getSelectedProduct", payload: state.selectedProduct === product ? null : product})
    console.log(product)
}

const handleChangePage = (currentPage) => {
  dispatch({type : "handleChangePage", payload: currentPage})
}

const displayedProducts = state.searchInputValue ? state.filteredProducts : state.products;

  return (
      <TableContainer component={Paper} elevation={4}>
        <Table>
          <TableHead>
            <TableRow sx={{backgroundColor: "#dbdbdb"}}>
              <TableCell>Nome</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Preço</TableCell>
              <TableCell>Estoque</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <div className="loading-container">
                    <div className="spinner"></div>
                    <p>Carregando produtos, por favor aguarde...</p>
                  </div>
                </TableCell>
              </TableRow>
              ) : (
              displayedProducts.slice(state.page * state.rowsPerPage, (state.page + 1) * state.rowsPerPage).map((product) => (
                <TableRow key={product.id}
                  onClick={() => selectedProduct(product)}
                  sx={{ cursor: "pointer", backgroundColor: state.selectedProduct === product ? "#b2b2b2" : "inherit" }}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.type}</TableCell>
                  <TableCell>{`R$ ${product.price}`}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[]}
                labelRowsPerPage=''
                count={state.products.length}
                page={state.page}
                rowsPerPage={state.rowsPerPage}
                onPageChange={(e, currentPage) => handleChangePage(currentPage)}
                labelDisplayedRows={({ from, to, count }) => `${from}–${to} de ${count}`}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
  )
}

export default Data
