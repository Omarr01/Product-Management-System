import React from 'react';

function Product(props) {
    const [toBeDeleted, setToBeDeleted] = React.useState(false)

    function handleChange(event) {
        const {checked} = event.target
        setToBeDeleted(checked)
        props.changeProductsToBeDeleted(props.pid, checked)
    }

    return (
        <div className={!toBeDeleted ? 'product' : 'product--selected'}>
            <input 
                type="checkbox" 
                className='delete-checkbox'
                name="joinedToBeDeleted"
                onChange={handleChange}
                checked={toBeDeleted}
            />
            <ul className='info--list'>
                <li>{props.SKU}</li>
                <li>{props.name}</li>
                <li>{props.price} $</li>
                {props.size && <li>Size: {props.size} MB</li>}
                {props.weight && <li>Weight: {props.weight}KG</li>}
                {props.heightWidthLength && <li>Dimensions: {props.heightWidthLength}</li>}
            </ul> 
        </div>
    )
}

export default Product;