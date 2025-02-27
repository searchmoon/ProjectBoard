import { MouseEvent, useState } from 'react';
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
import GoogleIcon from '@/assets/google.svg?react';
import KakaoIcon from '@/assets/kakao.svg?react';
import { supabase } from '@/supabaseClient';
import { Link } from 'react-router-dom';
import useInputs from '@/hooks/useInputs';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const { values, onChangeValue } = useInputs({
    email: '',
    password: '',
  });

  async function signInWithKakao() {
    const { data: loginInfo, error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
    });
    if (error) {
      console.error(error);
    }
    if (loginInfo) {
    }
  }

  async function signInWithGoogle(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    const {
      data: { user },
    } = await supabase.auth.getUser();
    console.log(user);
  }

  const handleSignin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });
      if (error) throw error;
      const { user, session } = data;
      console.log(user, session);
      alert('로그인이 완료되었습니다');
      window.history.back();
      // window.location.href = '/';
    } catch (error) {
      console.error(error);
      const errorMessage =
        error instanceof Error ? error.message : String(error);

      alert(
        `로그인에 실패했습니다. ${errorMessage.includes('Email not confirmed') ? '가입한 이메일의 메일함에서 가입 확인을 완료해주세요.' : errorMessage}`,
      );
    }
  };

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
                <Input
                  id="email"
                  name="email"
                  value={values.email}
                  onChange={onChangeValue}
                  placeholder="이메일"
                />
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    value={values.password}
                    onChange={onChangeValue}
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
          <Button onClick={handleSignin} className="w-full">
            로그인
          </Button>
          <div className="w-full">
            <Separator className="my-4" />
            <p className="text-center text-sm text-gray-500 mb-4">
              SNS계정으로 간편 로그인 / <Link to="/sign-up">회원가입</Link>
            </p>
            <div className="flex justify-center space-x-4">
              <button onClick={signInWithGoogle}>
                <GoogleIcon className="w-8 h-8" />
              </button>
              <button onClick={signInWithKakao}>
                <KakaoIcon className="w-8 h-8" />
              </button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
