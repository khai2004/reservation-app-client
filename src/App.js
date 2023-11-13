import { Outlet, useLocation } from 'react-router-dom';
import Header from './component/header/Header';
import Home from './pages/home/Home';
import Footer from './component/footer/Footer';
import Navbar from './component/navbar/Navbar';

function App() {
  const { pathname } = useLocation();
  console.log(pathname);
  return (
    <div>
      <Navbar login={pathname} />
      {pathname === '/' && <Header />}
      {pathname === '/hotels' && <Header />}
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
