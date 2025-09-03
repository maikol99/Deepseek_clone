"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { isToday, isYesterday, subDays, isAfter } from "date-fns";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { LogOut, Menu, MessageSquarePlus, PanelLeft, Smartphone, Trash2 } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";


interface Chat {
  _id: string;
  title: string;
  createdAt: string;
}

interface SidebarSectionProps {
  title: string;
  chats: Chat[];
  pathname: string;
}

const ChatSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const chats = [{
    title:""
  }];
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const isChatLoading = false;

  const todayChats: Chat[] = [];
  const yesterdayChats: Chat[] = [];
  const last30daysChats: Chat[] = [];
  const olderChats: Chat[] = [];

  const today = new Date();
  const thirtydaysAgo = subDays(today, 30);

  chats.forEach((chat: any) => {
    const date = new Date(chat.createdAt);
    if (isToday(date)) {
      todayChats.push(chat);
    } else if (isYesterday(date)) {
      yesterdayChats.push(chat);
    } else if (isAfter(date, thirtydaysAgo)) {
      last30daysChats.push(chat);
    } else {
      olderChats.push(chat);
    }
  });

  const SidebarSection = ({ title, chats, pathname }: SidebarSectionProps) => {
    if (chats.length === 0) return null;

    return (
      <div className="mb-4">
        <h3 className="mb-2 px-2 text-sm font-medium text-muted-foreground">
          {title}
        </h3>
        <div className="space-y-1 w-[260px]">
          {chats.map((chat) => (
            <Link
              key={chat._id}
              href={`/chat/${chat._id}`}
              className={cn(
                "flex justify-around items-center px-2 py-1 rounded-lg group hover:bg-[#dae3ef]:",
                pathname === `/chat/${chat._id}` && "bg-[#dbeaff]"
              )}
            >
              <span className='truncate text-gray-700 text-xs flex-1'>
                {chat.title}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="opacity-0 group-hover:opacity-100 h-8 w-8"
              >
                <Trash2 className="h-4 w-4 text-gray-500" />
              </Button>
            </Link>
          ))}
        </div>
      </div>
    );
  };

  const SidebarContent = () => (
    <div className="flex h-full flex-col bg-[#f7fcff]">
      <div className="sticky top-0 z-10 flex items-center justify-beetween border-b bg-[#f7fcff] p-4">
        <Link href="/">
          <img
            src="/images/deepseek-title.svg"
            alt="deepseek-title"
            className="h-20 2-40 text-gray-300"
          />
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:flex hidden"
        >
          <PanelLeft className="h-5 w-5" />
        </Button>
      </div>

      <div className="p-4">
        <Button
          variant="outline"
          className="justify-start gap-2 bg-[#dce9ff] px-6 py-6 rounded-xl text-blue-500 hover:bg-blue"
        >
          <MessageSquarePlus className="h-5 w-5" />
          <span className="text-[16px]">New Chat</span>
        </Button>
      </div>
      <ScrollArea className="flex-1 px-2">
        {isChatLoading ? (
          <div className="flex justify-center py-4">
            <p className="text-sm text-muted-foreground">Loading chats...</p>
          </div>
        ) : (
          <>
            <SidebarSection
              title="today"
              chats={todayChats}
              pathname={pathname}
            />
            <SidebarSection
              title="Yesterday"
              chats={yesterdayChats}
              pathname={pathname}
            />

            <SidebarSection
              title="30 days"
              chats={last30daysChats}
              pathname={pathname}
            />
            {olderChats.length > 0 && (
              <SidebarSection
                title="Older"
                chats={olderChats}
                pathname={pathname}
              />
            )}
          </>
        )}
      </ScrollArea>
    </div>
  );

  return (
    <>
      <div className="md:hidden fixed top-0 z-58 flex h-16 w-full items-center justify-beetween border-b bg-[#f7fcff] px-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="w-72">
            <SheetHeader>
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            </SheetHeader>
            <SidebarContent/>
          </SheetContent>
        </Sheet>
        <div className="text-2xl font-semibold text-gray-700 mx-auto">
          Deepeseek
        </div>
        <div className="w-10"/>
      </div>

      <div className="hidden md:block">
        <div className={cn('fixed top-0 bottom-0 left-0 z-40 transition-all duration-300'
          , sidebarOpen ? 'w-72': 'w-8'
  )}>

    {sidebarOpen && <SidebarContent/>}
     {!sidebarOpen &&(
      <div className="fixed top-0 left-4 z-50">
        <Button
        variant='ghost'
        size = 'icon'
        onClick={() => setSidebarOpen(true)}
        >
          <Menu className="h-5 w-5"/>
        </Button>
      </div>
     )}
        </div>
      </div>
      <div className="h-16 md:hidden"/>
    </>
  );
};

export default ChatSidebar;
