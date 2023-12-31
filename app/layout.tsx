/* Components */
import { Providers as ReduxProvider } from '@/lib/providers'
import SProvider from "./provider"
import { Nav } from './components/Nav'

/* Instruments */
import styles from './styles/layout.module.css'
import './styles/globals.css'

export default function RootLayout(props: React.PropsWithChildren) {

  return (
    <ReduxProvider>
      <html lang="en">
        <body>
          <SProvider>
            <section
            >
              <Nav />
              <header
              >
              </header>
              <main
              >{props.children}</main>
            </section>
          </SProvider>
        </body>
      </html>
    </ReduxProvider>
  )
}
