"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Mail, User } from "lucide-react";
import { Lock } from "lucide-react";
import { EyeOff, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const page = () => {

  const [name,setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cofirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const isLoading = false;
  
  
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-50 px-4 p-12 sm:px-6 lg:px-8">
      <div className="flex justify-center mb-12">
        <Image
          src="/images/deepseek-logo.svg"
          alt="deepseek-logo"
          width={230}
          height={230}
          className="rounded-full"
        />
      </div>
      <Card className="w-full max-w-[430px]">
        <CardHeader className="space-y-1 text-left">
          <CardDescription>
            Only email registration is supported in your region. One DeepSeek account is all you need to access to all DeepSeek services.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <Input
                  id="name"
                  placeholder="full name"
                  type="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10"
                  required
                />
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="relative">
                <Input
                  id="email"
                  placeholder="email address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="relative">
                <Input
                  id="password"
                  placeholder="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>


            <div className="space-y-2">
              <div className="relative">
                <Input
                  id="confirmPassword"
                  placeholder="confirm password"
                  type={showPassword ? "text" : "password"}
                  value={cofirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10"
                  required
                />
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="text-left  text-xs text-gray-500">
              By signing up or logging in, you consent to DeepSeek's{" "}
              <a href="#" className="text-black underline">
                Terms of Use
              </a>{" "}
              and{" "}
              <a href="#" className="text-black underline">
                Privacy Policy
              </a>
              .
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-500"
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Sign up"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
               Already have an account?  {" "}
            <Button
              variant="link" className="px-0 text-blue-500 text-sm" 
              asChild>
              <Link href="/sign-in">Sign in</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default page
