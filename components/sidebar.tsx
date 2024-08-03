'use client';

import { SidebarItems } from '@/app/types';
import {
    FileText,
    MoreHorizontal,
    NotebookPen,
    Settings
} from 'lucide-react';
import { SidebarButton } from './sidebar-button';
import { SidebarDesktop } from './sidebar-desktop';

const sidebarItems: SidebarItems = {
  links: [
    { label: 'Documents', href: '/', icon: FileText },
    { label: 'Notes', href: '/item/notifications', icon: NotebookPen },
    { label: 'Settings', href: '/item/messages', icon: Settings },
  ],
  extras: (
    <div className='flex flex-col gap-2'>
      <SidebarButton icon={MoreHorizontal} className='w-full'>
        More
      </SidebarButton>
      <SidebarButton
        className='w-full justify-center text-white'
        variant='default'
      >
        Tweet
      </SidebarButton>
    </div>
  ),
};

export function Sidebar() {
  return <SidebarDesktop sidebarItems={sidebarItems}/>;
}