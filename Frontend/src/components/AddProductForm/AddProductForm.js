import React from 'react';

function AddProductForm(props) {

    function handleChange(event) {
        const {name, value} = event.target
        props.handleChange(name, value)
    }

    return (
        <form id='product_form' className='add--form'>
            <div className='form--entries'>
                <p>SKU:</p>
                <p>Name:</p>
                <p>Price:</p>
                <p>Product Type:</p>
            </div>
            <div className='form--inputs'>
                <input 
                    id='sku'
                    type='text'
                    placeholder='SKU'
                    name='sku'
                    onChange={handleChange}
                    value={props.formData.sku}
                />
                <input 
                    id='name'
                    type='text'
                    placeholder='Name'
                    name='name'
                    onChange={handleChange}
                    value={props.formData.name}
                />
                <input 
                    id='price'
                    type='text'
                    placeholder='Price ($)'
                    name='price'
                    onChange={handleChange}
                    value={props.formData.price}
                />
                <select
                    id='productType'
                    name='productType'
                    onChange={handleChange}
                    value={props.formData.productType}
                >
                    <option disabled defaultValue value="">Choose Type</option>
                    <option id='DVD' value="DVD">DVD</option>
                    <option id='Book' value="Book">Book</option>
                    <option id='Furniture' value="Furniture">Furniture</option>
                </select>
                {props.formData.productType === 'DVD' &&
                    <>
                        <div className='spec'>
                            <p className='spec--type'>Size:</p>
                            <input
                            id='size' 
                            name='size'
                            className='spec--value'
                            placeholder='Size (MB)'
                            onChange={handleChange}
                            value={props.formData.size}
                            >
                            </input>
                        </div>
                        <div className='desc'>
                            <p>Please provide DVD size in MB</p>
                        </div>
                    </>
                }
                {props.formData.productType === 'Book' &&
                    <>
                        <div className='spec'>
                            <p className='spec--type'>Weight:</p>
                            <input
                            id='weight' 
                            name='weight'
                            className='spec--value'
                            placeholder='Weight (KG)'
                            onChange={handleChange}
                            value={props.formData.weight}
                            >
                            </input>
                        </div>
                        <div className='desc'>
                            <p>Please provide Book weight in KG</p>
                        </div>
                    </>
                }
                {props.formData.productType === 'Furniture' &&
                    <>
                        <div className='spec'>
                            <p className='spec--type'>Height:</p>
                            <input
                            id='height' 
                            name='height'
                            className='spec--value'
                            placeholder='Height (cm)'
                            onChange={handleChange}
                            value={props.formData.height}
                            >
                            </input>
                        </div>
                    </>
                }
                {props.formData.productType === 'Furniture' &&
                    <>
                        <div className='spec'>
                            <p className='spec--type'>Width:</p>
                            <input
                            id='width' 
                            name='width'
                            className='spec--value'
                            placeholder='Width (cm)'
                            onChange={handleChange}
                            value={props.formData.width}
                            >
                            </input>
                        </div>
                    </>
                }
                {props.formData.productType === 'Furniture' &&
                    <>
                        <div className='spec'>
                            <p className='spec--type'>Length:</p>
                            <input
                            id='length' 
                            name='length'
                            className='spec--value'
                            placeholder='Length (KG)'
                            onChange={handleChange}
                            value={props.formData.length}
                            >
                            </input>
                        </div>
                        <div className='desc'>
                            <p>Please provide Furniture dimensions in cm in HxWxL format</p>
                        </div>
                    </>
                }
                <p className='error--message'>{props.message}</p>
            </div>    
        </form>
    )
}

export default AddProductForm;