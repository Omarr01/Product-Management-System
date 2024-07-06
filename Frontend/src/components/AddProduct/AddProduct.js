import React from 'react';
import Header from "../Header/Header"
import AddProductForm from "../AddProductForm/AddProductForm"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Footer from "../Footer/Footer"
import { Helmet } from 'react-helmet';

function AddProduct() {
    const [formData, setFormData] = React.useState(
        {
            sku: "",
            name: "",
            price: "",
            productType: "",
            size: "",
            weight: "",
            height: "",
            width: "",
            length: ""
        }
    )

    const navigate = useNavigate()
    function navigateToList() {
        document.documentElement.style.setProperty('--SKU-border-color', 'black')
        document.documentElement.style.setProperty('--name-border-color', 'black')
        document.documentElement.style.setProperty('--price-border-color', 'black')
        document.documentElement.style.setProperty('--prodType-border-color', 'black')
        document.documentElement.style.setProperty('--size-border-color', 'black')
        document.documentElement.style.setProperty('--weight-border-color', 'black')
        document.documentElement.style.setProperty('--height-border-color', 'black')
        document.documentElement.style.setProperty('--width-border-color', 'black')
        document.documentElement.style.setProperty('--length-border-color', 'black')
        navigate('/')
    }

    const [message, setMessage] = React.useState("")

    function handleChange(name, value) {
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })

        if (name === 'sku') {
            document.documentElement.style.setProperty('--SKU-border-color', 'black')
        }
        if (name === 'name') {
            document.documentElement.style.setProperty('--name-border-color', 'black')
        }
        if (name === 'price') {
            document.documentElement.style.setProperty('--price-border-color', 'black')
        }
        if (name === 'productType') {
            if(message === "Please, select Product Type") {
                setMessage("");
            }
            document.documentElement.style.setProperty('--prodType-border-color', 'black')
        }
        if (name === 'size') {
            document.documentElement.style.setProperty('--size-border-color', 'black')
        }
        if (name === 'weight') {
            document.documentElement.style.setProperty('--weight-border-color', 'black')
        }
        if (name === 'height') {
            document.documentElement.style.setProperty('--height-border-color', 'black')
        }
        if (name === 'width') {
            document.documentElement.style.setProperty('--width-border-color', 'black')
        }
        if (name === 'length') {
            document.documentElement.style.setProperty('--length-border-color', 'black')
        }
    }

    function handleSaveProduct() {
        const errorColor = '#BD3039'

        if(formData.productType !== "") {
            axios.post("http://localhost/php_scandi/public/index.php?/productadd", formData)
            .then(response => {
                const responseData = response.data;
                if(responseData.length === 0) {
                    navigateToList();
                }
                else {
                    setMessage(responseData[0]);
                    for (let index = 1; index < responseData.length; index++) {
                        const field = responseData[index];
                        const propertyName = '--' + field + '-border-color';
                        document.documentElement.style.setProperty(propertyName, errorColor);
                    }
                }
            })
            .catch(err => {
                console.error(err);
            });
    
            // fetch("https://scandiweb-junior-test-omarr01.000webhostapp.com/public/index.php?/productadd", {
            //     method: 'post',
            //     body: JSON.stringify(formData)
            // })
            // .then(res => res.json())
            // .then(data => {
            //     if(data.length === 0) {
            //         navigateToList();
            //     }
            //     else {
            //         setMessage(data[0]);
            //         for (let index = 1; index < data.length; index++) {
            //             const field = data[index];
            //             const propertyName = '--' + field + '-border-color';
            //             document.documentElement.style.setProperty(propertyName, errorColor);
            //         }
            //     }
            // })
            // .catch(err => {
            //     console.error(err);
            // });
        }
        else {
            document.documentElement.style.setProperty('--prodType-border-color', errorColor)
            setMessage("Please, select Product Type")
        }
    }

    return (
        <>
            <Helmet>
                <title>Add Product</title>
            </Helmet>
            <Header />
            <div className='options'>
                <div className='options--title'>
                    <h1>Product Add</h1>
                </div>
                <div className='options--buttons'>
                    <button 
                        className='buttons--saveButton'
                        onClick={handleSaveProduct}
                        ><i className="fa-solid fa-floppy-disk"></i>&nbsp;&nbsp;Save
                    </button>
                    <button 
                        className='buttons--cancelButton'
                        onClick={navigateToList}
                        ><i className="fa-solid fa-xmark"></i>&nbsp;&nbsp;Cancel
                    </button>
                </div>
            </div>
            <hr />
            <AddProductForm formData={formData} handleChange={handleChange} message={message} />
            <Footer />
        </>
    )
}

export default AddProduct;