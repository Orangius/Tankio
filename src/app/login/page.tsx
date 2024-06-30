"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be more than 2 characters",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
  rememberMe: z.boolean().default(false).optional(),
});

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Login = () => {
  const loginForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      rememberMe: false,
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const router = useRouter();

  async function submitLogin(values: z.infer<typeof formSchema>) {
    console.log(values);
    const res = await signIn("credentials", {
      redirect: false,
      username: values.username,
      password: values.password,
    });
    console.log("res is: ",res);
    if (res?.url == null) {
      setLoginError("Invalid username or password");
      console.log("Invalid username or password");
    } else {
      console.log("Login Successful");
      router.replace("/dashboard");
    }
  }

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  function clearError() {
    setLoginError("");
  }
  return (
    <div>
      <div className=" flex flex-col items-center justify-center">
        <div className="relative mb-9 space-y-4">
          <h1 className="text-center text-4xl">Login</h1>
          <h3 className="text-center text-base">
            Login and start managing your Tanks
            <br /> from <span className="text-accent">anywhere!</span>
          </h3>
          {loginError ? (
            <h3 className="text-red-500 top-24 left-6 text-center absolute">
              {loginError}
            </h3>
          ) : null}
        </div>

        <Form {...loginForm}>
          <form
            onSubmit={loginForm.handleSubmit(submitLogin)}
            className="w-4/5 md:w-2/5 flex flex-col gap-4 border border-primary rounded-3xl p-4 pb-10 pt-10"
          >
            <FormField
              control={loginForm.control}
              name="username"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        onFocus={clearError}
                        placeholder="Enter your username"
                        type="text"
                        {...field}
                        className="rounded-3xl"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={loginForm.control}
              name="password"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          onFocus={clearError}
                          placeholder="Enter password"
                          type={showPassword ? "text" : "password"}
                          {...field}
                          className="rounded-3xl"
                        />
                      </FormControl>
                      {!showPassword ? (
                        <BiSolidShow
                          onClick={handleShowPassword}
                          className="absolute text-xl top-[10px] right-3 cursor-pointer"
                        />
                      ) : (
                        <BiSolidHide
                          onClick={handleShowPassword}
                          className="absolute text-xl top-[10px] right-3
                          cursor-pointer"
                        />
                      )}
                    </div>
                    <FormMessage className="text-destructive" />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={loginForm.control}
              name="rememberMe"
              render={({ field }) => {
                return (
                  <FormItem>
                    <div className="flex gap-2 items-center ">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="rounded-[3px]"
                        />
                      </FormControl>
                      <FormLabel>Remember me</FormLabel>
                    </div>
                  </FormItem>
                );
              }}
            />
            <Button
              className="rounded-full bg-accent text-lg text-accent-foreground"
              disabled={loginForm.formState.isSubmitting}
            >
              {loginForm.formState.isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Form>

        <h3 className="mt-8">
          Don&apos;t have an account?{" "}
          <Link href={"/signup"}>
            {" "}
            <span className="underline">Sign Up</span>{" "}
          </Link>
        </h3>
      </div>
    </div>
  );
};

export default Login;
