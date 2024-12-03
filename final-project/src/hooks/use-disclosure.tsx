import { useCallback, useState } from 'react';

const useDisclosure = (initial = false) => {
  const [isOpen, setOpen] = useState<boolean>(initial);
  const open = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => setOpen((state) => !state), []);
  return {
    isOpen,
    open,
    close,
    toggle
  };
};

export default useDisclosure;
