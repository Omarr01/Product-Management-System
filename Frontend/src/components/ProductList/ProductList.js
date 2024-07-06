import React from 'react';
import Header from "../Header/Header"
import Product from "../Product/Product"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

function ProductList() {

  const [data, setData] = React.useState([]);

  React.useEffect(() => {
      fetch("http://localhost/php_scandi/public/index.php?/productlist")
      .then(res => res.json())
      .then(
          (result) => {
              setData(result);
          }
      )
    //   fetch("https://scandiweb-junior-test-omarr01.000webhostapp.com/public/index.php?/productlist")
    //   .then(res => res.json())
    //   .then(data => setData(data))
  })

  const [productsToBeDeleted, setProductsToBeDeleted] = React.useState([])
  
  function changeProductsToBeDeleted(pid, checkboxVal) {
    if(checkboxVal) {
        if(!productsToBeDeleted.includes(parseInt(pid))) {
          setProductsToBeDeleted([...productsToBeDeleted, parseInt(pid)])
        }
    }
    else {
      if(productsToBeDeleted.includes(parseInt(pid))) {
        setProductsToBeDeleted(productsToBeDeleted.filter(prodID => prodID !== parseInt(pid)))
      }
    }
}

function handleDeleteProducts() {
    let prodToBeDeleted = {data: productsToBeDeleted}
    axios.post("http://localhost/php_scandi/public/index.php?/productdelete", JSON.stringify(prodToBeDeleted))
    .then()
    .catch(err => {
        console.error(err);
    });
    // let prodToBeDeleted = {data: productsToBeDeleted}
    // fetch("https://scandiweb-junior-test-omarr01.000webhostapp.com/public/index.php?/productdelete", {
    //     method: 'post',
    //     body: JSON.stringify(prodToBeDeleted)
    // })
    // .then()
    // .catch(err => {
    //     console.error(err);
    // });

    emptyProductsToBeDeleted()
    window.location.reload();
}

const navigate = useNavigate()
function navigateToAdd() {
    navigate('/add-product')
}

  function emptyProductsToBeDeleted() {
    setProductsToBeDeleted([])
  }

  const dataElements = data.map(product => {
    return (
        <Product
            key={product.pid}
            {...product}
            changeProductsToBeDeleted={changeProductsToBeDeleted}
            data={data}
        />
    )
  })

  return (
    <>
        <Helmet>
            <title>Product List</title>
        </Helmet>
        <Header />
        <div className='options'>
            <div className='options--title'>
                <h1>Product List</h1>
            </div>
            <div className='options--buttons'>
                <button 
                    className='buttons--addButton'
                    onClick={navigateToAdd}
                    ><i className="fa-solid fa-plus"></i>&nbsp;&nbsp;ADD
                </button>
                <button 
                    id='delete-product-button'
                    className='buttons--deleteButton'
                    disabled={productsToBeDeleted.length === 0}
                    onClick={handleDeleteProducts}
                    ><i className="fa-solid fa-trash"></i>&nbsp;&nbsp;MASS DELETE
                </button>
            </div>
        </div>
        <hr />
        <section className="products-list">
            {dataElements}
            {dataElements.length === 0 && <p className='list--empty'>Product List is empty, please add some products!</p>}
        </section>
    </>
  )
}

export default ProductList;