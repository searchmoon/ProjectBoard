import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { supabase } from '@/supabaseClient';
import useInputs from '../hooks/useInputs';

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { values, onChangeValue } = useInputs({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { name, email, password, confirmPassword } = values;
  console.log(name, email, password, confirmPassword);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleSubmitSignup = async () => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (error) throw error;

      alert('회원가입이 완료되었습니다');
      window.history.back();
      // window.location.href = '/login';
    } catch (error) {
      console.error(error);
      alert(`회원가입이 완료되지 않았습니다: ${error?.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            회원가입
          </CardTitle>
          <CardDescription className="text-center">
            새 계정을 만드세요
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">이름</Label>
                <Input
                  id="name"
                  name="name"
                  value={values.name}
                  placeholder="이름을 입력하세요"
                  onChange={onChangeValue}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">이메일</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={values.email}
                  placeholder="이메일을 입력하세요"
                  onChange={onChangeValue}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">비밀번호</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    value={values.password}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="비밀번호를 입력하세요"
                    onChange={onChangeValue}
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
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">비밀번호 확인</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="비밀번호를 다시 입력하세요"
                    onChange={onChangeValue}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    {showConfirmPassword ? (
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
          <Button onClick={handleSubmitSignup} className="w-full">
            회원가입
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
