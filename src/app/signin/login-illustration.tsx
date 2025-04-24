import Image from "next/image";

export function LoginIllustration() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg
        className="absolute inset-0 w-full h-full text-primary/5"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        fill="none"
        viewBox="0 0 800 800"
        preserveAspectRatio="none"
      >
        <circle cx="400" cy="400" r="400" fill="currentColor" />
      </svg>
      <div className="relative z-10 max-w-md text-center">
        <div className="mb-8 mx-auto w-64 h-64 relative">
          <Image
            src="/placeholder.svg?height=256&width=256"
            alt="Login illustration"
            width={256}
            height={256}
            priority
          />
        </div>
        <h2 className="text-3xl font-bold text-primary mb-4">Welcome Back</h2>
        <p className="text-gray-700">
          Sign in to access your account and manage your services. We're glad to
          see you again.
        </p>
      </div>
    </div>
  );
}
