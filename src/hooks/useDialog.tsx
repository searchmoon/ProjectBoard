import { useState } from 'react';

export default function useDialog() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleToggleDialog = () => {
    setIsOpen((prev) => !prev);
  };

  return { isOpen, handleToggleDialog };
}
