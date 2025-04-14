import { useEffect, useContext } from "react"
import { ProductContext } from "../../context/ProductsContext.jsx";
import './Data.css'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, TableFooter } from "@mui/material";

import { getProducts } from "../../api/products.js"
import { AuthContext } from "../../context/AuthContext.jsx";


const Data = () => {

  const {state, dispatch} = useContext(ProductContext)
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProducts(user?.id);
      dispatch({ type: "getProducts", payload: data})
    };
    fetchData();
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
            {displayedProducts.slice(state.page * state.rowsPerPage, (state.page + 1) * state.rowsPerPage).map((product) => (
              <TableRow key={product.id}
                onClick={() => selectedProduct(product)}
                sx={{ cursor: "pointer", backgroundColor: state.selectedProduct === product ? "#b2b2b2" : "inherit" }}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.type}</TableCell>
                <TableCell>{`R$ ${product.price}`}</TableCell>
                <TableCell>{product.stock}</TableCell>
              </TableRow>
            ))}
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
