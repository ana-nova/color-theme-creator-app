import { useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import { initialThemes } from "./lib/InitialThemes";
import { initialColors } from "./lib/InitialColors";
import ColorForm from "./Components/ColorForm/ColorForm";
import Color from "./Components/Color/Color";
import "./App.css";
import Theme from "./Components/Theme/Theme";

function App() {
  const [themes, setThemes] = useLocalStorageState("themes", {
    defaultValue: initialThemes,
  });
  const [colors, setColors] = useLocalStorageState("colors", {
    defaultValue: initialColors,
  });
  const [selectedThemeId, setSelectedThemeId] = useState("t1");

  const handleAddColor = (newColor) => {
    setColors((prevColors) => [newColor, ...prevColors]); // Adding the new color to the beginning of the colors array
    // Updating the selected theme to include the new color's ID
    setThemes((prevThemes) =>
      prevThemes.map((theme) =>
        theme.id === selectedThemeId
          ? { ...theme, colors: [newColor.id, ...theme.colors] }
          : theme
      )
    );
  };

  const handleDeleteColor = (colorId) => {
    setColors((prevColors) =>
      prevColors.filter((color) => color.id !== colorId)
    );

    setThemes((prevThemes) =>
      prevThemes.map((theme) =>
        theme.id === selectedThemeId
          ? { ...theme, colors: theme.colors.filter((id) => id !== colorId) }
          : theme
      )
    );
  };

  const handleUpdateColor = (colorId, updatedColor) => {
    setColors((prevColors) =>
      prevColors.map((color) => (color.id === colorId ? updatedColor : color))
    );

    setThemes((prevThemes) =>
      prevThemes.map((theme) =>
        theme.id === selectedThemeId
          ? {
              ...theme,
              colors: theme.colors.map((id) =>
                id === colorId ? updatedColor.id : id
              ),
            }
          : theme
      )
    );
  };

  const selectedTheme = themes.find((theme) => theme.id === selectedThemeId); // Finding the currently selected theme from the themes array
  // Getting the colors associated with the selected theme
  const colorsToShow = selectedTheme.colors
    .map((colorId) => colors.find((color) => color.id === colorId))
    .filter((color) => color !== undefined);

  return (
    <>
      <h1>Theme Creator</h1>
      <Theme
        themes={themes} // {/*The themes prop contains the list of all themes available in the application.*/}
        setThemes={setThemes} //  {/*This is a function that allows the Theme component to update the list of themes.*/}
        selectedThemeId={selectedThemeId} // {/*This prop holds the ID of the currently selected theme.*/}
        setSelectedThemeId={setSelectedThemeId} // {/*This function allows the Theme component to change the currently selected theme.*/}
      />

      <ColorForm onSubmitColor={handleAddColor} />

      {colorsToShow.length > 0 ? ( // Checking if there are colors to show in the current theme
        colorsToShow.map(
          (
            color // Mapping through the colorsToShow array to render each color
          ) => (
            <Color
              key={color.id} // Unique key for each Color component
              color={color} // Passing the color object to the Color component
              onDeleteColor={
                selectedThemeId !== "t1" ? handleDeleteColor : null
              } // Passing the delete function if allowed
              onUpdateColor={
                selectedThemeId !== "t1" ? handleUpdateColor : null
              } // Passing the update function if allowed
            />
          )
        )
      ) : (
        // If colorsToShow is empty, display a message instead
        <p className="color-card-highlight">
          you have no colors in your theme. wanna add some?
        </p>
      )}
    </>
  );
}

export default App;

/*
Summary of cuntionalities:
1. Uses useLocalStorageState to keep the state of themes and colors stored in the browser's local storage.
2. Allows users to add, delete, and update colors within the context of the selected theme.
3. Enables the user to select a theme and displays the corresponding colors associated with that theme.
4. Displays the list of colors that belong to the currently selected theme.

trivia:
ColorForm.jsx: The App component renders the ColorForm component, passing the handleAddColor function as 
the onSubmitColor prop. This allows the ColorForm to trigger the addition of new colors to the state when a color is submitted.

Color.jsx: The App component also renders the Color component for each color in the selected theme. 
It passes down the color object and functions for deleting (handleDeleteColor) and updating (handleUpdateColor) colors.

Deletion/Update Logic: The functions for deleting and updating colors are conditionally passed to the Color component 
based on the selected theme's ID to prevent modification of the default theme.

Theme.jsx: This component is responsible for displaying and selecting themes. It receives the themes state, the current 
selectedThemeId, and functions to modify these values from the App component.
*/
