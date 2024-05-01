import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'
import Catalog from './components/Catalog'
import About from './components/About'
import Cart from './components/Cart'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css'

function App() {
  

  return (
    <>
    <BrowserRouter>
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100svh'
    }}>
    <Header />
      <main style={{
        flexGrow: 1
      }}>
      <Routes> 
        <Route path='/cart' element= {<Cart/>} />
        <Route path='/' element={<Main />} />
        <Route path='/catalog' element={<Catalog />} />
        <Route path='/aboutus' element={<About />} />
      </Routes>
      </main>
      <Footer/>
    </div>
    </BrowserRouter>
    </>
  )
}

export default App
