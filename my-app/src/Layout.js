import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import SlideShow from './components/SlideShow';
import Footer from './components/Footer';

function Layout() {
  return (
    <>
        <Navbar/>
        <SlideShow/>
        <Footer/>
    </>
  );
}

export default Layout;
