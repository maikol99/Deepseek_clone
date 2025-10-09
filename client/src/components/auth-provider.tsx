'use client'
import React, { useEffect } from "react";
import { Loader } from "./Loader";
import { userAuthStore } from "../store/authStore";
import { usePathname } from "next/navigation";


const publicRoute = ["/sign-in","/sign-up"]


export default function AuthProvider({children}:{children:React.ReactNode}) {
    const {isAuthenticated,isLoading,userProfile,error} = userAuthStore();
    const pathname = usePathname();

    console.log(error)

    useEffect(() => {
        if(!publicRoute.includes(pathname)){
            userProfile()
        }
    },[userProfile,pathname])

    useEffect(() => {
        if(!isLoading)
            if(isAuthenticated && !publicRoute.includes(pathname)){
                return;
            }
    },[isAuthenticated,isLoading,pathname])

    if(isLoading){
        return <Loader type="default" position="center"/>
    }
    return <>{children}</>
}