import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { supabase } from '@/supabaseClient';
import dayjs from 'dayjs';

const NewProjectDialog = () => {
  const [dueDate, setDueDate] = useState<Date>();
  const [status, setStatus] = useState<string>('');
  const [inputs, setInputs] = useState({
    title: '',
    // dueDate: '',
    // status: '',
    description: '',
    created_by: 0,
  });

  const { title, description, created_by } = inputs;

  // const handleCreateProject = (event) => {
  //   event.preventDefault();
  //   console.log(event);
  //   console.log(event.target);

  // const formData = new FormData(event.target);
  // console.log(formData);
  // const titleValue = formData.get('title');
  // console.log(titleValue);
  // };
  /* input id 종류::::: title, dueDate, status, description*/
  // 이 input 의 value 들을 저장 클릭 시, 프로젝트 추가되게 하기. supabase  post기능

  const handleCreateProject = async (e) => {
    e.preventDefault();
    const { data } = await supabase.from('project').insert({
      title,
      status,
      description,
      // due_date: dayjs().format('YYYY-MM-DD'),
      due_date: dueDate,
      // members: members, // 나중에는 여기 number 로 바꿔줘야 하나, 테이블 수정하기.
      created_by: '익명이',
    });
    console.log(data);
  };

  const handleInputChange = (event) => {
    console.log(event.target.id);
    console.log(event.target.name);
    console.log(event.target.value);
    setInputs({ ...inputs, [event.target.id]: event.target.value });
  };

  const handleValueChange = (value: string) => {
    setStatus(value);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
          <Plus className="h-5 w-5 mr-2" />새 프로젝트
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>새 프로젝트 생성</DialogTitle>
        </DialogHeader>
        <form className="grid gap-4 py-4" onSubmit={handleCreateProject}>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              프로젝트 이름
            </Label>
            <Input
              id="title"
              name="title"
              className="col-span-3"
              onChange={handleInputChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="dueDate" className="text-right">
              마감일자
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={'outline'}
                  className={cn(
                    'w-[280px] justify-start text-left font-normal',
                    !dueDate && 'text-muted-foreground',
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dueDate ? (
                    format(dueDate, 'PPP')
                  ) : (
                    <span>날짜를 선택하세요</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dueDate}
                  onSelect={setDueDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              상태
            </Label>
            <Select onValueChange={handleValueChange}>
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="상태 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="not-in-progress">시작전</SelectItem>
                <SelectItem value="in-progress">진행중</SelectItem>
                <SelectItem value="completed">완료</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              설명
            </Label>
            <Textarea
              id="description"
              name="description"
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="created_by" className="text-right">
              멤버 이름
              {/* 이부분은 멤버 선택해서 추가하는 것으로 바꿔야할듯. */}
              {/* user 목록 쫙 뿌려주고, 선택하게 하기? 검색도 가능하게 */}
              {/* 이 프로젝트에 초대 또는 액세스 허용된 사람들의 목록을 쭉 깔아주고, 그 중 선택할 수 있어야할듯. 선택하면, 추가되게하기 */}
            </Label>
            <Input
              id="created_by"
              name="created_by"
              type="text"
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          {/* <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="createdAt" className="text-right">
              생성일자
            </Label>
            <Input id="createdAt" type="date" className="col-span-3" />
          </div> */}
          {/* 생성일자는 필요없을듯 알아서 생성되고, 프로젝트에만 표시되면 될듯 함 */}
          <Button type="submit" onClick={(e) => handleCreateProject(e)}>
            저장
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewProjectDialog;
