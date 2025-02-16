import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@radix-ui/react-select';
import NaverIcon from '@/assets/naver.svg?react';
import KakaoIcon from '@/assets/kakao.svg?react';
import { Link } from 'react-router-dom';

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            로그인
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="space-y-4">
              <div className="space-y-2">
                <Input id="username" placeholder="아이디" />
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="비밀번호"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button className="w-full">로그인</Button>
          <div className="w-full">
            <Separator className="my-4" />
            <p className="text-center text-sm text-gray-500 mb-4">
              SNS계정으로 간편 로그인/회원가입
            </p>
            <div className="flex justify-center space-x-4">
              <Link to={'/users/auto/naver'}>
                <NaverIcon className="w-8 h-8" />
              </Link>
              <Link to={'/users/auto/kakao'}>
                <KakaoIcon className="w-8 h-8" />
              </Link>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
