'use client'
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import {isToday,isYesterday,subDays,isAfter} from 'date-fns';


interface Chat{
  id:string,
  title:string,
  createdAt:string
}

interface SidebarSectionProps{
  title:string,
  chats:Chat[],
  pathname:string
}

const ChatSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const chats = [{}];
  const [sidebarOpen,setSidebarOpen] = useState(true)

  const todayChats:Chat[] = [];
  const yesterdayChats:Chat[] = [];
  const last30daysChats:Chat[] = [];
  const olderChats:Chat[] = [];

  const today = new Date();
  const thirtydaysAgo = subDays(today,30);

  chats.forEach((chat:any) =>{
    const date = new Date(chat.createdAt);
    if(isToday(date)){
      todayChats.push(chat)
    }
    else if(isYesterday(date)){
      yesterdayChats.push(chat)

    }else if(isAfter(date,thirtydaysAgo)){
      last30daysChats.push(chat)
    } else{
      olderChats.push(chat)
    }
  })

  const SidebarSection = ({title,chats,pathname}:SidebarSectionProps) =>{
    if (chats.length === 0) 
      return null;

    return(
      <div className='mb-4'>
        <h3 className='mb-2 px-2 text-sm font-medium text-muted-foreground'>{title}</h3>
        <div>

        </div>
      </div>
    )
  }

  return (
    <div>ChatSidebar</div>
  )
}

export default ChatSidebar
