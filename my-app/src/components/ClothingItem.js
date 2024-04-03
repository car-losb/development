import '../App.css';

export default function ClothingItem(props) {
    return (
        <div className="ClothingItem">
            <img src={props.image}></img>
            <p>{props.name}</p>
            <p>{props.type}</p>
            <div className= "price-cart">
                <p>{props.price}</p>
                <button onClick={() => props.addToCart(props.clothing)}>Add to Cart</button>
            </div>
        </div>
    )
}