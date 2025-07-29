"use client";

import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Label } from "@/src/components/ui/label";
import { Checkbox } from "@/src/components/ui/checkbox";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { getUser, registerUser } from "@/src/api/auth";
import toast from "react-hot-toast";
import Head from "next/head";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation"; // ✅ CORRECT for app directory
import bcrypt from "bcryptjs";

const formSchema = z
  .object({
    name: z
      .string()
      .min(2, "Full name must be at least 2 characters")
      .max(50, "Full name must be at most 50 characters")
      .regex(/^[A-Za-z\s]+$/, "Full name must contain only letters and spaces"),

    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),

    phone: z
      .string()
      .min(1, "Phone number is required")
      .regex(/^\d{10,15}$/, "Enter a valid phone number (10–15 digits)"),

    password: z.string().min(6, "Password must be at least 6 characters"),
    confirm: z.string(),
    terms: z.boolean().refine((val) => val, {
      message: "You must accept the terms",
    }),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords do not match",
    path: ["confirm"],
  });

type FormSchema = z.infer<typeof formSchema>;

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirm: "",
      terms: false,
    },
  });

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const onSubmit = async (data: FormSchema) => {
    try {
      console.log("Form Submitted:", data);

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(data.password, saltRounds);

      console.log("hashed Password is", hashedPassword);

      const body = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: hashedPassword,
        role: "user",
      };

      // 🔍 Check if user already exists
      const userFetchRes = await getUser({
        search: `email:${body.email},is_deleted:0`,
      });

      if (userFetchRes?.result?.length > 0) {
        toast.error("User already exists");

        router.push("/signin");

        return;
      }

      // 📝 Register user
      const res = await registerUser(body);
      console.log(res);

      if (res.err) {
        toast.error("Could not register user!");
        return;
      }

      toast.success("User registered successfully!");
      router.push("/signin");
    } catch (error) {
      toast.error("Could not register user!");
      console.error("Registration error:", error);
    }
  };

  return (
    <>
      {/* ✅ SEO Metadata */}
      <Head>
        <title>
          The Registration allows clients the ability to sign up for Mypafway's
          services.
        </title>
        <meta
          name="title"
          content="The Registration allows clients the ability sign up for Mypafway's services."
        />
        <meta
          name="description"
          content="Mypafway is an automotive parts Search Engine portal consisting of many applications. The Registration process is an important process that allows our clients to use our services."
        />
        <meta
          name="keywords"
          content="auto parts, register, auto part companies, auto part manufacturer, auto part supplier"
        />
      </Head>

      <div className="container mx-auto flex items-center justify-center min-h-screen py-12 px-4">
        <Card className="w-full max-w-md">
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">
                Create an account
              </CardTitle>
              <CardDescription>
                Enter your information to create an account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  {...register("name")}
                  onKeyDown={(e) => {
                    const key = e.key;
                    const isLetterOrSpace = /^[A-Za-z\s]$/.test(key);
                    const allowedKeys = [
                      "Backspace",
                      "Tab",
                      "ArrowLeft",
                      "ArrowRight",
                      "Delete",
                    ];
                    if (!isLetterOrSpace && !allowedKeys.includes(key)) {
                      e.preventDefault();
                    }
                  }}
                />
                {errors.name?.message && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="john.doe@example.com"
                />
                {errors.email?.message && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="text"
                  inputMode="numeric"
                  pattern="\d*"
                  placeholder="Enter 10–15 digit number"
                  {...register("phone")}
                  onKeyDown={(e) => {
                    const allowedKeys = [
                      "Backspace",
                      "ArrowLeft",
                      "ArrowRight",
                      "Delete",
                      "Tab",
                    ];
                    if (!/^\d$/.test(e.key) && !allowedKeys.includes(e.key)) {
                      e.preventDefault();
                    }
                  }}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    className="pr-10"
                  />
                  <div
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </div>
                </div>
                {errors.password?.message && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirm"
                    type={showConfirm ? "text" : "password"}
                    {...register("confirm")}
                    className="pr-10"
                  />
                  <div
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                    onClick={() => setShowConfirm((prev) => !prev)}
                  >
                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </div>
                </div>
                {errors.confirm?.message && (
                  <p className="text-red-500 text-sm">
                    {errors.confirm.message}
                  </p>
                )}
              </div>

              {/* ✅ Properly controlled Checkbox */}
              <div className="flex items-center space-x-2">
                <Controller
                  name="terms"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      id="terms"
                      checked={field.value}
                      onCheckedChange={(checked) => field.onChange(!!checked)}
                    />
                  )}
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree to the{" "}
                  <Link href="/terms" className="text-primary underline">
                    terms and conditions
                  </Link>
                </label>
              </div>
              {errors.terms?.message && (
                <p className="text-red-500 text-sm">{errors.terms.message}</p>
              )}
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button className="w-full" type="submit">
                Create Account
              </Button>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/signin" className="text-primary underline">
                  Sign in
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
}
