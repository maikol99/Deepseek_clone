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
import { Mail } from "lucide-react";
import { Lock } from "lucide-react";
import { EyeOff, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const isLoading = false;

  const router = useRouter();

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
            Only login via email, Google, login is supported in your region
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-4">
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
                  type={password ? "text" : "password"}
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
              {isLoading ? "loggin in..." : "Log in"}
            </Button>
          </form>
          <div className="mt-4 flex items-center justify-between">
            <Button
              variant="link"
              className="px-0 text-blue-500 text-sm"
              asChild
            >
              <Link href="#">Forget Password</Link>
            </Button>

            <Button
              variant="link" className="px-0 text-blue-500 text-sm" asChild>
              <Link href="/sign-up">Sign up</Link>
              
            </Button>
          </div>
          <div className="relative mt-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">OR</span>
            </div>
          </div>
          <Button variant="outline" className="w-full mt-6">
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
              <path d="M1 1h22v22H1z" fill="none" />
            </svg>
            Log in With Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
