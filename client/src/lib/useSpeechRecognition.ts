import React, { useEffect, useState} from 'react'


const useSpeechRecognition = (isActive:Boolean) =>{
    const [transcript,setTranscript] = useState<string>("");
    const [isListening,setIsListening] = useState<boolean>(false);
    const [error,setError] = useState<string>("")

    useEffect(() =>{
        const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition

        if(!SpeechRecognition){
            setError("speech Recognition is not suported is this browser")
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.interimResults = true;
        recognition.lang = 'en-US';
        recognition.continuous = true;

        recognition.onresult = (event:any) =>{
            const lastResult = event.results[event.results.length - 1];
            if(lastResult && lastResult.isFinal){
                setTranscript(lastResult[0].transcript);
            }

        }
        recognition.onerror= (event:any) => {
            setError(event.error)
        }
        recognition.onstart = () => {
            setIsListening(true)
        }

        recognition.onend = () => (
            setIsListening(false)
        )

        if(isActive){
            recognition.start();
        }else{
            recognition.stop();
        }

        return () => {
            recognition.stop();
        }

    },[isActive])
    return {transcript,isListening,error}
}


export default useSpeechRecognition;