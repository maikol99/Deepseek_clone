import React, { useEffect, useState} from 'react'


const useSpeechRecognition = (isActive:Boolean) =>{
    const [transcript,setTranscript] = useState<string>("");
    const [isListening,setIsListening] = useState<boolean>(false);
    const [error,setError] = useState<string>("")

    useEffect(() =>{
        const speechRecognition = window.S
    })
}