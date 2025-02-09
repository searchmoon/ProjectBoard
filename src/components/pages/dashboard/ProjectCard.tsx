// import { Menu, Calendar, Users } from "lucide-react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Progress } from "@/components/ui/progress";

// const ProjectCard = () => {
//   return (
//     <div className="p-5 border rounded-lg shadow-sm bg-white">
//       <div className="flex items-center justify-between">
//         <div className="flex-1">
//           <h3 className="text-lg leading-6 font-medium text-gray-900">
//             프로젝트 1
//           </h3>
//           <p className="mt-1 text-sm text-gray-500">진행중 • 마감일 D-7</p>
//         </div>
//         <Menu className="h-5 w-5 text-gray-400" />
//       </div>
//       <div className="mt-4">
//         <p className="text-sm text-gray-600">
//           프로젝트 1의 설명이 여기에 들어갑니다.
//         </p>
//       </div>
//       <div className="mt-4">
//         <div className="flex items-center space-x-2">
//           <div className="flex -space-x-2">
//             <Avatar className="h-8 w-8 border-2 border-white">
//               <AvatarImage src="/api/placeholder/32/32" alt="Team member 1" />
//               <AvatarFallback>TM1</AvatarFallback>
//             </Avatar>
//             <Avatar className="h-8 w-8 border-2 border-white">
//               <AvatarImage src="/api/placeholder/32/32" alt="Team member 2" />
//               <AvatarFallback>TM2</AvatarFallback>
//             </Avatar>
//             <Avatar className="h-8 w-8 border-2 border-white">
//               <AvatarImage src="/api/placeholder/32/32" alt="Team member 3" />
//               <AvatarFallback>TM3</AvatarFallback>
//             </Avatar>
//           </div>
//           <span className="text-sm text-gray-500">+2 명</span>
//         </div>
//       </div>
//       <div className="mt-4 flex items-center justify-between">
//         <div className="flex items-center space-x-4">
//           <div className="flex items-center">
//             <Calendar className="h-4 w-4 text-gray-400 mr-1" />
//             <span className="text-sm text-gray-500">12월 31일</span>
//           </div>
//           <div className="flex items-center">
//             <Users className="h-4 w-4 text-gray-400 mr-1" />
//             <span className="text-sm text-gray-500">5명</span>
//           </div>
//         </div>
//         <div className="w-full max-w-[120px]">
//           <Progress value={45} className="h-2" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProjectCard;

import { Menu, Calendar, Users } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';

const ProjectCard = () => {
  return (
    <div className="p-5 border rounded-lg shadow-sm bg-white">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            프로젝트 1
          </h3>
          <p className="mt-1 text-sm text-gray-500">진행중 • 마감일 D-7</p>
        </div>
        <Menu className="h-5 w-5 text-gray-400" />
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-600">
          프로젝트 1의 설명이 여기에 들어갑니다.
        </p>
      </div>
      <div className="mt-4">
        <div className="flex items-center space-x-2">
          <div className="flex -space-x-2">
            <Avatar className="h-8 w-8 border-2 border-white">
              <AvatarImage src="/api/placeholder/32/32" alt="Team member 1" />
              <AvatarFallback>TM1</AvatarFallback>
            </Avatar>
            <Avatar className="h-8 w-8 border-2 border-white">
              <AvatarImage src="/api/placeholder/32/32" alt="Team member 2" />
              <AvatarFallback>TM2</AvatarFallback>
            </Avatar>
            <Avatar className="h-8 w-8 border-2 border-white">
              <AvatarImage src="/api/placeholder/32/32" alt="Team member 3" />
              <AvatarFallback>TM3</AvatarFallback>
            </Avatar>
          </div>
          <span className="text-sm text-gray-500">+2 명</span>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 text-gray-400 mr-1" />
            <span className="text-sm text-gray-500">12월 31일</span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 text-gray-400 mr-1" />
            <span className="text-sm text-gray-500">5명</span>
          </div>
        </div>
        <div className="w-full max-w-[120px]">
          <Progress value={45} className="h-2" />
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
