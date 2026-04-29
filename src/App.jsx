import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/HomePage/Home'
import Items from './pages/Items/Items'
import ItemDetail from './pages/Itemdetail/Itemdetail'
import Favoritos from './pages/Favoritos/Favoritos'
import NotFound from './components/NotFound/NotFound'


export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/items" element={<Items />} />
        <Route path="/items/:id" element={<ItemDetail />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}