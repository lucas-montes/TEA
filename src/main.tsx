import ReactDOM from "react-dom/client";
import App from "./App";
import "./style.css";
import { Provider } from 'react-redux';
import store from './store/store';
import { MemoryRouter } from "react-router-dom";


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <MemoryRouter
    initialEntries={["/", "/last/where/I/was"]}//Find the last place where I was and start there 
    initialIndex={0}
  >
    <Provider store={store}>
      <div className="h-screen flex">
        <App />
      </div>
    </Provider>
  </MemoryRouter>
);
