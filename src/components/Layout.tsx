import { Outlet } from 'react-router';
import Header from './Header';

const Layout = () => {
  return (
    <div className="w-full flex flex-col h-screen">
      <Header />
      <div className="mx-4 my-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
