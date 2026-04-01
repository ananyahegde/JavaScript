# Javascript Fundamentals Self Learning Tasks

A collection of JavaScript exercises completed as part of a self learning training.

## Setup

1. Clone the repo:
```bash
git clone https://github.com/ananyahegde/JavaScript.git
```
2. Navigate into a task folder (e.g., task-1):
```bash
cd task-1
```
3. Open `index.html` in your browser:
```bash
google-chrome index.html
```

> **Note:** Tasks 4 and 10 fetch external data and will run into CORS issues if opened directly as a file. Use a local server instead:
> - VS Code: Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension and click **Go Live**
> - Or run in terminal:
>   ```bash
>   python3 -m http.server
>   ```
>   Then open `http://localhost:8000` in your browser

## Tasks

1. Interactive To-Do List Application
    - Add, mark complete, and remove tasks using DOM manipulation
    - Event listeners for task interactions
    - store tasks in `localStorage` for persistance.

2. Simple Calculator
    - Perform basic arithmetic operations (+, -, x, /)
    - Dynamically upadate the display on user interaction

3. Image Gallery Lightbox
    - Thumbnail click opens a larger image in a modal overlay
    - Background blur and dim with opening animation
    - CSS transitions for smooth modal display

4. Weather App with API Integration
    - Fetches live weather data using the [OpenWeatherMap](https://openweathermap.org/) API
    - Parse JSON response and updates the DOM dynamically
    - Error handling for invalid input and failed requests

5. Dynamic Quiz Application
    - Dynamically loads 5 random questions from an external JSON file
    - Tracks the user selection, calculates and displays final score with feedback

6. Drag and Drop List Reordering
    - Reorder items using the HTML5 Drag and Drop API
    - Adds visual hint (droppable items become dull) during drag operations

7. Real-time Chat Simulation
    - Chat Interface with contacts and chat window
    - Update the DOM as messages are sent
    - Use random hard-coded reply, simulate real-time chatting using `setTimeout`
    - Displays timestamps and updates conversation dynamically

8. Single-Page Application (SPA) with Hash-based Routing
    - Hash-based routing using `window.onhashchange`
    - Dynamically loads content based on URL hash

9. Infinite Scrolling Content Loader
    - Load [xkcd](https://xkcd.com/) comics infinitely as the user scrolls
    - Detect when user scrolls (using scroll event) and load the next comic
    - Use fetch API to get the data from xkcd (requires API key [corsproxy](https://corsproxy.io/))

10. Full-featured eCommerce Shopping Cart
    - Single Page E-Commerce Application with product browsing and cart features
    - Dynamically load product external JSON file
    - Filter by category and search by keyword
    - Add/remove items and adjust quantities while browsing
    - Store cart data in the `localStorage` for persistance
    - Populate cart section with cart data, calculate total amount with tax and discount breakdown
    - Use JavaScript ES6 modules and error handling
