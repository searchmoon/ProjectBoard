import { Outlet } from 'react-router';
import Header from './Header';

const Layout = () => {
  return (
    <div className="w-full flex flex-col h-screen">
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
