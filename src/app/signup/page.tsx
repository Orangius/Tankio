"use client"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { BiSolidHide, BiSolidShow } from "react-icons/bi" // <BiSolidHide />  <BiSolidShow />

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

const formSchema = z
  .object({
    username: z.string().min(2, {
      message: "Username must be more than 2 characters",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters",
    }),
    confirmPassword: z.string().min(6, {
      message: "Password must be at least 6 characters",
    }),
  })
  .refine(
    (data) => {
      return data.password === data.confirmPassword
    },
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  )

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"

export default function Login() {
  const loginForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  })

  const [showPassword, setShowPassword] = useState(false)
  const [formSubmitState, setFormSubmitState] = useState("")
  const router = useRouter()
  async function submitLogin(values: z.infer<typeof formSchema>) {
    const res = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "content-type": "application/json",
      },
    })
    if (res.status === 409) {
      setFormSubmitState("Username taken")
      return
    } else if (res.status === 400) {
      setFormSubmitState("Fields incomplete")
      return
    } else setFormSubmitState("Registration sucessful")

    const autoLogin = await signIn("credentials", {
      redirect: false,
      username: values.username,
      password: values.password,
    })

    if (autoLogin?.url !== null) {
      console.log("login success")
      router.replace("/dashboard")
    }
  }
  function handleShowPassword() {
    setShowPassword(!showPassword)
  }
  return (
    <div>
      <div className="flex flex-col items-center">
        <div className="mb-8 space-y-4">
          <h1 className="text-center text-4xl">Sign up</h1>
          <h3 className="text-center text-base">
            Sign up and start managing your Tanks
            <br /> from <span className="text-accent">anywhere!</span>
          </h3>
          {formSubmitState ? (
            <h4 className="text-center">{formSubmitState}</h4>
          ) : null}
        </div>

        <Form {...loginForm}>
          <form
            autoComplete="off"
            onSubmit={loginForm.handleSubmit(submitLogin)}
            className="w-4/5 md:w-2/5 flex flex-col gap-4 border border-primary rounded-3xl p-4 pb-10 pt-10 "
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
                        placeholder="Pick a username"
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
                    <div className="relative">
                      <FormControl>
                        <Input
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
                )
              }}
            />

            <FormField
              control={loginForm.control}
              name="confirmPassword"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Confirm password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Re-enter password"
                        type={showPassword ? "text" : "password"}
                        {...field}
                        className="rounded-3xl"
                      />
                    </FormControl>
                    <FormMessage className="text-destructive" />
                  </FormItem>
                )
              }}
            />

            <Button className="rounded-full bg-accent text-lg text-accent-foreground">
              Sign up
            </Button>
          </form>
        </Form>

        <h3 className="mt-8">
          Already have an account?{" "}
          <Link href={"/login"}>
            {" "}
            <span className="underline">Login</span>{" "}
          </Link>
        </h3>
      </div>
    </div>
  )
}
