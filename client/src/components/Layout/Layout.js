import React from 'react'
import Header from './Header'
import Footer from './Footer'

const Layout = ({children}) => {   //destructuring from props read about it
  return (
    <>
        <Header />
        <div className='content'>
            {children}
        </div>
        <Footer />
    </>
  )
}

export default Layout