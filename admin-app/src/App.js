import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import MainLayout from './Components/MainLayout';
import Dashboard from './pages/Dashboard';
import './App.css'
import Blog from './pages/Blog';
import BlogCategory from './pages/BlogCategory';
import Oders from './pages/Orders';
import ColorList from './pages/ColorList';
import CategoryList from './pages/CategoryList';
import Products from './pages/Products';
import Image from './pages/Image';
import SizeList from './pages/SizeList';
import AddClothes from './pages/AddClothes';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<MainLayout />}>
            <Route index path="orders" element={<Oders />} />
            <Route path="color-list" element={<ColorList />} />
            <Route path="category-list" element={<CategoryList />} />
            <Route path="image-list" element={<Image />} />
            <Route path="product" element={<Products />} />
            <Route path="size-list" element={<SizeList />} />
            <Route path="add-clothes" element={<AddClothes />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
