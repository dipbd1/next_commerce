import { SessionProvider } from "next-auth/react"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { reduxStore as store } from "@/lib/redux/store";
import { persistStore } from "redux-persist";



export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {

  const persistor = persistStore(store);


  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<div>Loading ...</div>}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  )
}