"use client"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be more than 2 characters",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
  rememberMe: z.boolean().default(false).optional(),
})

import React from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const Login = () => {
  const loginForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      rememberMe: false,
    },
  })

  function onSubmit() {}
  return (
    <div>
      <div className="flex flex-col items-center">
        <div className="mb-8 space-y-4">
          <h1 className="text-center text-4xl">Sign in</h1>
          <h3 className="text-center text-base">
            Sign in and start managing your Tanks
            <br /> from <span className="text-accent">anywhere!</span>
          </h3>
        </div>

        <Form {...loginForm}>
          <form
            onSubmit={loginForm.handleSubmit(onSubmit)}
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
                        placeholder="Enter your username"
                        type="text"
                        {...field}
                        className="rounded-3xl"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
            <FormField
              control={loginForm.control}
              name="password"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your password"
                        type="password"
                        {...field}
                        className="rounded-3xl"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
            <FormField
              control={loginForm.control}
              name="rememberMe"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="rounded-[3px] mr-2"
                      />
                    </FormControl>
                    <FormLabel>Remember me</FormLabel>
                  </FormItem>
                )
              }}
            />
            <Button className="rounded-full bg-accent text-lg text-accent-foreground">
              Submit
            </Button>
          </form>
        </Form>

        <h3 className="mt-8">
          Don't have an account?{" "}
          <Link href={"/signup"}>
            {" "}
            <span className="underline">Sign Up</span>{" "}
          </Link>
        </h3>
      </div>
    </div>
  )
}

export default Login
