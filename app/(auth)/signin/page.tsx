import React from "react";
import SignInForm from "./_form";

export default function SignInPage() {
  return (
    <div className="max-w-md w-full flex flex-col items-center justify-center mx-auto h-screen">
      <h1>ENV.STORE</h1>
      <div className="text-left w-full mb-4">
        <h2>Sign In</h2>
        <p>Sign in to your account.</p>
      </div>
      <SignInForm />
    </div>
  );
}
