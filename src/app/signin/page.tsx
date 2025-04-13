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
import { getUser } from "@/src/api/auth";
import Api from "@/src/services/Api";
import { toast } from "@/src/hooks/use-toast";
import bcrypt from "bcryptjs"

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  remember: z.boolean().optional(),
});

type SignInFormData = z.infer<typeof signInSchema>;

export default function SignInPage() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  // async function handleGetUser(email: string) {
  //   try {
  //     const res = await getUser({ search: `email:${email}` });
  //     console.log(res);
  //   } catch (error) {
  //     console.warn("error", error);
  //   }
  // }

  // const onSubmit = (data: SignInFormData) => {
  //   console.log("Form Submitted:", data); // ✅ Logging data
  //   handleGetUser(data.email);
  // };

  const onSubmit = async (data: SignInFormData) => {
    console.log("Form Submitted:", data);
    const { email, password } = data

    const res = await Api<User>("users").get({ search: `email:${email},is_deleted:0` })

    if (res.err || res.count === 0) {
        toast.error("User not found!")
        return
    }

    const user = res.result[0]

    const isPasswordCorrect = bcrypt.compareSync(password, user.password)
    if (!isPasswordCorrect) {
        toast.error("Password or User ID is incorrect!")
        return
    }

    const loginRes = (await frontql("auth-users", { fields: "id, name, user_id, email, phone, role, permissions" }).post({
        email,
        password: user.password,
    })) as unknown as AuthUser

    // const body = { phone: user.phone, password: user.password }
    // const loginRes = await loginUser(body)

    if (loginRes.err) {
        toast.error("Login failed!")
        return
    }

    setIsLoggedIn(true)

    const existingPerms = loginRes.result.permissions
    const perms = existingPerms || getDefaultPermissions({ role: loginRes.result.role })
    setUser({
        ...loginRes.result,
        permissions: perms,
    })

    setUserSession(loginRes.session)

    router.replace("/dashboard")
    toast.success("Login successful!")
}

  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen py-12 px-4">
      <Card className="w-full max-w-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">
              Sign in to your account
            </CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
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
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" {...register("password")} />
              {errors.password?.message && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Controller
                name="remember"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    id="remember"
                    checked={field.value}
                    onCheckedChange={(checked) => field.onChange(!!checked)}
                  />
                )}
              />
              <label
                htmlFor="remember"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Remember me
              </label>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full">
              Sign In
            </Button>
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-primary underline">
                Create an account
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
