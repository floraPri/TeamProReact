import Header from '@/component/common/header'
import { Inter } from 'next/font/google'
import styled from 'styled-components'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }) {
  return (
    <main className={inter.className}>
      <Header />
      <HeaderDIV />
      <Component {...pageProps} />
    </main>
  )
}

const HeaderDIV = styled.div`
  height: 100px;
`;
