import "./App.css";
import { useState } from "react";
import clothingData from "./assets/clothing-data.json";
import ClothingItem from "./components/ClothingItem";

function App() {
  // TODO: use useState to create a state variable to hold the state of the cart
  /* add your cart state code here */
  clothingData.forEach((item) => {
    item.image = process.env.PUBLIC_URL + "/" + item.image;
  });

  const [total, setTotal] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [maxPrice, setMaxPrice] = useState(10);
  const [sortBy, setSortBy] = useState(null);

  const addToCart = (item) => {

  const doesExist = cartItems.find((cartItem) => cartItem.item === item);

  if (doesExist) {
    setCartItems(
      cartItems.map((cartItem) =>
        cartItem.item === item
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      )
    );

  } else {

    setCartItems([...cartItems, { item: item, quantity: 1 }]);

  }

    setTotal(parseFloat((total + item.price).toFixed(2)));

  };

  const handleCategoryClick = (category) => {
    setSelectedCategories((prevCategories) => {
      if (prevCategories.includes(category)) {
        return prevCategories.filter((prevCategory) => prevCategory !== category);
      } else {
        return [...prevCategories, category];
      }
    });
  };

  const handlePriceChange = (e) => {
    setMaxPrice(parseFloat(e.target.value));
  };

  const handleSortByPrice = () => {
    if (sortBy === "price") {
      setSortBy(null); // Deselect if already selected
    } else {
      setSortBy("price"); // Select if not selected
    }
  };

  const filteredClothingData = clothingData
    .filter((item) => {
      if (selectedCategories.length === 0) return true;
      return selectedCategories.includes(item.type);
    })
    .filter((item) => item.price <= maxPrice)
    .sort((a, b) => {
      if (sortBy === "price") {
        return a.price - b.price;
      }
      return 0;
    });

    const handleReset = () => {
      setSelectedCategories([]);
      setMaxPrice(10);
      setSortBy(null);
    };

    const removeFromCart = (item) => {
      const itemIndex = cartItems.findIndex((cartItem) => cartItem.item === item);
      if (itemIndex !== -1) {
          const updatedCart = [...cartItems];
          const removedItem = updatedCart.splice(itemIndex, 1)[0];
          setCartItems(updatedCart);
          setTotal((prevTotal) =>
              parseFloat((prevTotal - removedItem.item.price * removedItem.quantity).toFixed(2))
          );
      }
  };

  return (
    <div className="App">
      <h1>Eco Fashion</h1> {/* TODO: personalize your bakery (if you want) */}
      <div className="content">

      <div className="filters">
          <h2>Filters</h2>
          <div className="categories">
            <h3>Categories</h3>
            <div className="category">
              <div
                className={`bubble ${
                  selectedCategories.includes("Tops") && "selected"
                }`}
                onClick={() => handleCategoryClick("Tops")}
              >
                Tops
              </div>
              <div
                className={`bubble ${
                  selectedCategories.includes("Headwear") && "selected"
                }`}
                onClick={() => handleCategoryClick("Headwear")}
              >
                Headwear
              </div>
              <div
                className={`bubble ${
                  selectedCategories.includes("Bottoms") && "selected"
                }`}
                onClick={() => handleCategoryClick("Bottoms")}
              >
                Bottoms
              </div>
            </div>
          </div>

          <div className="price-range">
          <h3>Max Price</h3>
            <input
              type="range"
              min="0"
              max="10"
              step="0.5"
              value={maxPrice}
              onChange={handlePriceChange}
            />
            <div>${maxPrice}</div>
          </div>

          <div className="sort">
            <h2>Sort</h2>
            <div
              className={`bubble ${sortBy === "price" && "selected"}`}
              onClick={handleSortByPrice}
            >
              Price
            </div>
          </div>

          <div className="reset">
          <button onClick={handleReset}>Reset</button>
          </div>

        </div>

        <div className="item-container">
          {filteredClothingData.map((item, index) => (
            <ClothingItem
              key={index}
              image={item.image}
              name={item.name}
              type={item.type}
              price={item.price}
              clothing={item}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              inCart={cartItems.some((cartItem) => cartItem.item === item)}

            />
          ))}
        </div>

      <div className="Cart">
        <h2>My Cart</h2>
        <ul>
            {cartItems.map((cartItem, index) => (
               <li>
               ({cartItem.quantity}) - {cartItem.item.name}
             </li>
            ))}
        </ul>
        <h3>Total: {total}</h3>
      </div>
      </div>
    </div>
  );
}

export default App;

