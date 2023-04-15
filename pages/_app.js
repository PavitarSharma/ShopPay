import store from "@/store/store";
import "@/styles/globals.scss";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}
