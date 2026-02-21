## Overview

This file contains a collection of React components and a utility function for formatting currency. The components include a button and a user card, while the utility function formats a given amount with a specified currency.

## Functions

### Button

The Button component is a reusable React component that renders a button with a given label, variant, and optional disabled state.

#### Parameters

| Parameter | Type       | Description                                            |
| --------- | ---------- | ------------------------------------------------------ | -------- | ---------------------------------------------- |
| label     | string     | The text to be displayed on the button                 |
| onClick   | () => void | The function to be called when the button is clicked   |
| disabled  | boolean    | Optional disabled state of the button (default: false) |
| variant   | 'primary'  | 'secondary'                                            | 'danger' | The variant of the button (default: 'primary') |

#### Return Value

The Button component returns a React element.

### UserCard

The UserCard component is a reusable React component that fetches and displays user data based on a given user ID.

#### Parameters

| Parameter | Type       | Description                                                |
| --------- | ---------- | ---------------------------------------------------------- |
| userId    | number     | The ID of the user to fetch and display                    |
| onClose   | () => void | The function to be called when the close button is clicked |

#### Return Value

The UserCard component returns a React element.

### formatCurrency

The formatCurrency function formats a given amount with a specified currency.

#### Parameters

| Parameter | Type   | Description                                         |
| --------- | ------ | --------------------------------------------------- |
| amount    | number | The amount to be formatted                          |
| currency  | string | The currency to use for formatting (default: 'USD') |

#### Return Value

The formatCurrency function returns a string representing the formatted amount.

## Dependencies

- React
- useState
- useEffect
- fetch
- Intl.NumberFormat

## Usage Example

No clear usage example is visible in the provided code, but the components and function can be used as follows:

```tsx
import React from "react";
import { Button, UserCard, formatCurrency } from "./components";

const App = () => {
  const handleButtonClick = () => {
    console.log("Button clicked!");
  };

  const handleCloseClick = () => {
    console.log("Close button clicked!");
  };

  return (
    <div>
      <Button label="Click me!" onClick={handleButtonClick} />
      <UserCard userId={1} onClose={handleCloseClick} />
      <p>Formatted amount: {formatCurrency(1000)}</p>
    </div>
  );
};
```
