"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";

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
import { getUser, loginUser } from "@/src/api/auth";
import { toast } from "@/src/hooks/use-toast";

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

  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: SignInFormData) => {
    setIsLoading(true);
    try {
      console.log("Form Submitted:", data);
      const { email, password } = data;

      const res = await getUser({
        search: `email:${email},is_deleted:0`,
      });

      if (res.err || res.count === 0) {
        toast({
          variant: "destructive",
          title: "Authentication failed",
          description: "User not found. Please check your credentials.",
        });
        console.log("user not found");
        return;
      }

      const user = res.result[0];
      console.log("usr is", user);
      const isPasswordCorrect = password === user.password;
      if (!isPasswordCorrect) {
        toast({
          variant: "destructive",
          title: "Authentication failed",
          description: "Password or User ID is incorrect!",
        });
        console.log("Password or User ID is incorrect!");
        return;
      }

      const body = { email: user.email, password: user.password };
      console.log("body is", body);
      const loginRes = await loginUser({ body });

      if (loginRes.err) {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: "There was a problem with your login attempt.",
        });
        console.log(loginRes);
        console.log("login failed");
        return;
      }

      setIsLoggedIn(true);

      const currentUser = loginRes.result;

      if (currentUser.role === "admin") {
        router.replace("/dashboard");
      } else {
        router.replace("/");
      }

      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
      console.log("login successful");
    } catch (error) {
      console.error("Login error:", error);
      toast({
        variant: "destructive",
        title: "An error occurred",
        description: "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Left side - Image */}
      <div className="hidden md:flex md:w-1/2 bg-primary/10 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center p-10">
          <div className="max-w-md text-center">
            <img
              src="/placeholder.svg?height=400&width=400"
              alt="Login illustration"
              className="mx-auto mb-8"
            />
            <h2 className="text-3xl font-bold text-primary mb-4">
              Welcome Back
            </h2>
            <p className="text-gray-700">
              Sign in to access your account and manage your services. We're
              glad to see you again.
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-10">
        <Card className="w-full max-w-md shadow-lg border-0">
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">
                Sign in to your account
              </CardTitle>
              <CardDescription className="text-center">
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
                  className="h-11"
                />
                {errors.email?.message && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                  className="h-11"
                />
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
              <Button
                type="submit"
                className="w-full h-11"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="text-primary font-medium hover:underline"
                >
                  Create an account
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
