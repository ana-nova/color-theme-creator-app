import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import "./App.css";
import { useState } from "react";
import ColorForm from "./Components/ColorForm/ColorForm";


function App() {
  // State to keep track of all colors
  const [colors, setColors] = useState(initialColors);

  // Function to handle adding a new color to the list
  function handleAddColor(newColor) {
    setColors((prev) => ([ newColor, ...prev]));
  }

  function handleDeleteColor(colorId) {
    setColors((prev) => {
      const updatedColors = prev.filter((color) => color.id != colorId);
      return updatedColors;
    });
  }

  return (
    <>
      <h1>Theme Creator</h1>
      <ColorForm onSubmitColor={handleAddColor} />
      {colors.length > 0 ? (
        colors.map((color) => (
          <Color key={color.id} color={color} onDeleteColor={handleDeleteColor} />
        ))
      ) : (
        <p className="color-card-highlight">
          No colors left in the theme! Please add new colors to get started.
        </p>
      )}
    </>
  );
}

export default App;
