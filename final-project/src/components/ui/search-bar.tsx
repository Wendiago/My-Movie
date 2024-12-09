'use client';

import Form from 'next/form';
import { useFormStatus } from 'react-dom';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function SearchBar() {
  const status = useFormStatus;
  return (
    <Form action='/search' className='relative flex-1'>
      <Search className='absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none select-none opacity-50 w-4 h-14' />
      <Input placeholder='Search movies' name='keyword' className='pl-10' />
    </Form>
  );
}