import { useEffect } from "react";
import "./styles.css";
import { useState } from "react";

export default function App() {
  const [shoppingList, setShoppingList] = useState(() => {
    return JSON.parse(localStorage.getItem('SHOPPING_LIST')) || []
  });
  const [newItem, setNewItem] = useState("");

  const handleAddItem = (e) => {
    e.preventDefault();
    setShoppingList([...shoppingList, newItem]);
    setNewItem("");
  };

  const handleRemoveItem = (itemToDelete) => {
    setShoppingList(shoppingList.filter((item) => item !== itemToDelete));
  };

  useEffect(() => {
    if (shoppingList.length > 0) window.localStorage.setItem('SHOPPING_LIST', JSON.stringify(shoppingList))
  }, [shoppingList]);

  return (
    <div className="App">
      <h1>Shopping list</h1>
      <div>
        <form onSubmit={handleAddItem}>
          <input
            name="newItem"
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
          />
          <button type="submit">Add item</button>
        </form>
      </div>
      <ul>
        {shoppingList.map((item, index) => (
          <li key={index}>
            {item}
            <button onClick={() => handleRemoveItem(item)}>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
