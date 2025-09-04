"use client";
import React, { useState, useRef, useEffect} from 'react'
import { Textarea } from "@/components/ui/textarea"
import useSpeechRecognition from '@/lib/useSpeechRecognition'


interface ChatInputProps{
  onSubmit:(message:string) => void
  isLoading:boolean
}

const ChatInput = ({onSubmit,isLoading}:ChatInputProps) => {
  const [Input,setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [isSpeechActive, setIsSpeechActive] = useState(false)
  const {transcript, isListening ,error} = useSpeechRecognition(isSpeechActive);

  useEffect(() =>{
    if(transcript){
      setInput((prevInput => prevInput + " " + transcript))
    }
  },[transcript])


  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault();
    if(Input.trim()){
      onSubmit(Input)
      setInput("")
    }
  }

  const handleKeyDown = (e:React.KeyboardEvent<HTMLTextAreaElement>) => {
    if(e.key === "Enter"&& !e.shiftKey){
      e.preventDefault();
      handleSubmit(e)
    }

  }

  useEffect(() => {
    const textarea = textareaRef.current;
    if(textarea){
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight,150)}px`
    }
  },[Input])

  return (
    <div className={'w-full max-w-4xl md:ml-64 rounded-xl bg-[#f4f4f6] py-4 px-4 shadow-[0_-1px_6px_rgba(0,0,0,0.05)]'}>
      <form onSubmit={handleSubmit} className='w-full'>
        <Textarea
        ref={textareaRef}
        placeholder={isListening ? 'Listening' : 'Ask Anything to deepseek'} 
        className='w-full resize-none overflow-hidden text-sm bg-background border-none outline-none right-0 focus:outline:none focus:border:none focus:ring-0 focus-visible:outline-none shadow-none'
        value={Input}
        disabled={isLoading}
        rows={1}
        />
      </form>
    </div>
  )
}

export default ChatInput
