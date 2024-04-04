import '../App.css';

export default function ClothingItem(props) {

    return (
        <div className="ClothingItem">
            <div className="picture">
                <img src={props.image}></img>
            </div>
            <h1>{props.name}</h1>
            <p>{props.type}</p>
            <p>${props.price}</p>
            <div className= "price-cart">
                <button onClick={() => props.addToCart(props.clothing)}>Add to Cart</button>
                {props.inCart ? (
                    <button className="remove" onClick={() => props.removeFromCart(props.clothing)}>Remove</button>
                ) : null}
            </div>
        </div>
    )
}