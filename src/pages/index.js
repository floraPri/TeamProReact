import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <Link href="/first/first"> 첫번째 </Link>
        <Link href="/main/main"> 메인 </Link>
        <Link href="/login/login"> 로그인 </Link>
        <Link href="/join/join"> 회원가입 </Link>
        <Link href="/login/test"> 테스트 </Link>
      </main>
    </>
  )
}
