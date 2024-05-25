import React from "react";
import { RoutesBooks } from "./routes/RoutesBooks";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <RoutesBooks />
    </Provider>
  );
}

export default App;
