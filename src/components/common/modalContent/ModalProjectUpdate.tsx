import React, { useState } from 'react';
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
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { ProjectType, Status } from '@/pages/Dashboard';

interface ModalProjectUpdateProps {
  action?: 'update' | 'create' | 'detail';
  selectedProject?: ProjectType;
  handleSubmit?: (projectData: ProjectType) => void;
  handleCancel: () => void;
}

export default function ModalProjectUpdate({
  selectedProject,
  handleSubmit,
  handleCancel,
}: ModalProjectUpdateProps) {
  const [projectData, setProjectData] = useState({
    id: selectedProject?.id || '',
    title: selectedProject?.title || '',
    description: selectedProject?.description || '',
    created_by: selectedProject?.created_by || '',
    due_date: selectedProject?.due_date || '',
    status: selectedProject?.status || 'not-in-progress',
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setProjectData({ ...projectData, [event.target.id]: event.target.value });
  };

  const handleStatusChange = (value: string) => {
    setProjectData((prev) => ({ ...prev, status: value as Status }));
  };

  const handleDateChange = (date: string) => {
    setProjectData((prev) => ({ ...prev, due_date: date }));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit?.(projectData);
      }}
      className="flex flex-col space-y-2"
    >
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="title" className="text-right">
          프로젝트 이름
        </Label>
        <Input
          id="title"
          name="title"
          value={projectData.title}
          onChange={handleChange}
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="due_date" className="text-right">
          마감일자
        </Label>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className={cn(
                'w-[280px] justify-start text-left font-normal',
                !projectData.due_date && 'text-muted-foreground',
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {projectData.due_date
                ? format(new Date(projectData.due_date), 'yyyy-MM-dd')
                : '날짜를 선택하세요'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={new Date(projectData.due_date)}
              onSelect={(date) => handleDateChange(date?.toISOString() || '')}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="status" className="text-right">
          상태
        </Label>
        <Select value={projectData.status} onValueChange={handleStatusChange}>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="상태 선택">
              {projectData.status == 'not-in-progress'
                ? '시작전'
                : projectData.status == 'in-progress'
                  ? '진행중'
                  : projectData.status === 'completed'
                    ? '완료'
                    : '상태 선택'}
            </SelectValue>
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
          value={projectData.description}
          onChange={handleChange}
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="created_by" className="text-right">
          멤버 이름
        </Label>
        <Input
          id="created_by"
          name="created_by"
          type="text"
          value={projectData.created_by}
          onChange={handleChange}
          className="col-span-3"
        />
      </div>
      <div className="flex justify-end mt-4">
        <button type="button" onClick={handleCancel} className="mr-2">
          취소
        </button>
        <button type="button" onClick={() => handleSubmit?.(projectData)}>
          저장
        </button>
      </div>
    </form>
  );
}
