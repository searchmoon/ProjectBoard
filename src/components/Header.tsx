import { Bell } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '@/supabaseClient';

const Header = () => {
  const headerTabs = [
    { name: '대시보드', path: '/' },
    { name: '칸반보드', path: '/kanban' },
    { name: '프로젝트', path: '/project' },
  ];

  const [activeTab, setActiveTab] = useState<string>('/');

  const handleTabClick = (path: string) => {
    setActiveTab(path);
  };
  const [userInfo, setUserInfo] = useState<null | Record<string, any>>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUserInfo(user);
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          console.log('User signed in:', session.user);
          setUserInfo(session.user);
        } else if (event === 'SIGNED_OUT') {
          console.log('User signed out');
          setUserInfo(null);
        }
      },
    );
    return () => {
      authListener.subscription.unsubscribe(); // cleanup 함수. 메모리 누수 방지
    };
  }, []);

  const handleLogout = async () => {
    if (confirm('로그아웃 하시겠습니까?')) {
      await supabase.auth.signOut();
      setUserInfo(null);
      location.reload();
    }
  };

  return (
    <nav className=" shadow-sm border-b w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-indigo-600">TaskFlow</h1>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {headerTabs.map((tab) => (
                <Link
                  key={tab.path}
                  to={tab.path}
                  onClick={() => handleTabClick(tab.path)}
                  className={`${
                    activeTab === tab.path
                      ? 'border-indigo-500 text-gray-900 border-b-2 transform scale-300'
                      : 'text-gray-500 hover:text-gray-700'
                  } inline-flex items-center px-1 pt-1 text-sm font-medium transition-all duration-300 ease-in-out`}
                >
                  {tab.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="p-2 rounded-full text-gray-500 hover:bg-gray-100"
            >
              <Bell className="h-5 w-5" />
            </Button>
            <div className="ml-3 relative">
              {userInfo ? (
                <div className="flex gap-4">
                  <button onClick={handleLogout}>logout</button>
                  <Avatar>
                    <AvatarImage
                      src={userInfo?.user_metadata?.avatar_url}
                      alt="User avatar"
                    />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </div>
              ) : (
                <Link to="/login">
                  <Avatar>
                    <AvatarImage
                      src="/api/placeholder/32/32"
                      alt="User avatar"
                    />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
