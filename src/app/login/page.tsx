'use client';

import { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";

import { useAuth } from "@/context/AuthContext";
import authService from "@/services/auth-service";
import { Container } from "@/lib/container";
import { Typography } from "@/lib/typography";
import Logo from "@/components/custom-components/logo";
import Link from "next/link";

const GoogleIcon = (props) => (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M3.06364 7.50914C4.70909 4.24092 8.09084 2 12 2C14.6954 2 16.959 2.99095 18.6909 4.60455L15.8227 7.47274C14.7864 6.48185 13.4681 5.97727 12 5.97727C9.39542 5.97727 7.19084 7.73637 6.40455 10.1C6.2045 10.7 6.09086 11.3409 6.09086 12C6.09086 12.6591 6.2045 13.3 6.40455 13.9C7.19084 16.2636 9.39542 18.0227 12 18.0227C13.3454 18.0227 14.4909 17.6682 15.3864 17.0682C16.4454 16.3591 17.15 15.3 17.3818 14.05H12V10.1818H21.4181C21.5364 10.8363 21.6 11.5182 21.6 12.2273C21.6 15.2727 20.5091 17.8363 18.6181 19.5773C16.9636 21.1046 14.7 22 12 22C8.09084 22 4.70909 19.7591 3.06364 16.4909C2.38638 15.1409 2 13.6136 2 12C2 10.3864 2.38638 8.85911 3.06364 7.50914Z" />
    </svg>
);

const loginSchema = z.object({
  email: z
      .string()
      .min(1, "Enter your email address")
      .email("Enter a valid email address"),
  password: z
      .string()
      .min(1, "Enter your password"),
});

export default function LoginPage() {
  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  useEffect(() => {
    if (user) {
      router.push('/player');
    }
  }, [user, router]);

  const onSubmit = async (values) => {
    setAuthError("");
    setLoading(true);

    try {
      await authService.loginWithEmail(values.email, values.password);
      router.push('/player');
    } catch (err) {
      setAuthError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setAuthError("");
    setGoogleLoading(true);

    try {
      await authService.loginWithGoogle();
      router.push('/player');
    } catch (err) {
      setAuthError(err.message);
    } finally {
      setGoogleLoading(false);
    }
  };

  const isBusy = loading || googleLoading;

  if (user) {
    return (
        <Container
            as="div"
            className="flex items-center justify-center min-h-dvh"
            style={{ background: "#0a0a0a" }}
        >
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-[#e8493f]/30 border-t-[#e8493f] rounded-full animate-spin mx-auto" />
            <Typography variant="p" className="mt-4 text-[#a1a1aa] text-sm">
              Redirecting to player...
            </Typography>
          </div>
        </Container>
    );
  }

  return (
      <Container
          as="div"
          className="relative flex min-h-dvh items-center justify-center overflow-hidden px-4 py-10"
          style={{
            background:
                "linear-gradient(180deg, rgba(10,10,10,0) 0%, rgba(10,10,10,0.4) 55%, #0a0a0a 100%), radial-gradient(ellipse at 70% 20%, #7c2d12 0%, #451a03 45%, #0a0a0a 70%)",
          }}
      >
        <Container as={"div"} className="w-full max-w-sm">
          <Card className="border-[#2a2a2e] bg-[#0f0f10] shadow-[0_0_40px_rgba(0,0,0,0.5)] gap-1! rounded-md!">
            <CardHeader>
              <Container as={"div"} className="mb-1 flex items-center justify-center gap-2.5 py-2">
                <Logo size={36} />
              </Container>
              <Typography variant="h2" className="text-center text-2xl font-extrabold tracking-tight text-[#f2f2f3]">
                Welcome back
              </Typography>
              <Typography variant="p" className="text-center mt-0! text-[#a1a1aa]">
                Sign in to your account to continue
              </Typography>
            </CardHeader>

            <CardContent className="px-6 sm:px-8 py-1">
              <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6">
                <FieldGroup className="gap-2.5">
                  <Controller
                      name="email"
                      control={form.control}
                      render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel
                                htmlFor="login-email"
                                className="text-[13px] font-medium text-[#d4d4d8]"
                            >
                              Email
                            </FieldLabel>
                            <Input
                                {...field}
                                id="login-email"
                                type="email"
                                placeholder="example@gmail.com"
                                autoComplete="username"
                                disabled={isBusy}
                                aria-invalid={fieldState.invalid}
                                className="h-auto rounded-[9px] border-[#2a2a2e] bg-[#18181b] px-3.5 py-[9px] text-[13px] text-[#e8e8ea] transition-colors duration-150 focus-visible:border-[#e8493f]/50 focus-visible:ring-[#e8493f]/20 aria-invalid:border-[#e8493f]/60 [&:-webkit-autofill]:[-webkit-text-fill-color:#e8e8ea] [&:-webkit-autofill]:[-webkit-box-shadow:0_0_0px_1000px_#18181b_inset] [&:-webkit-autofill]:[transition:background-color_9999s_ease-in-out_0s]"
                            />
                            {fieldState.invalid && (
                                <FieldError
                                    errors={[fieldState.error]}
                                    className="text-[12px] text-[#e0857a]"
                                />
                            )}
                          </Field>
                      )}
                  />

                  <Controller
                      name="password"
                      control={form.control}
                      render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <Container as={"div"}>
                              <FieldLabel
                                  htmlFor="login-password"
                                  className="text-[13px] font-medium text-[#d4d4d8]"
                              >
                                Password
                              </FieldLabel>
                            </Container>
                            <Input
                                {...field}
                                id="login-password"
                                type="password"
                                autoComplete="new-password"
                                placeholder="password"
                                disabled={isBusy}
                                aria-invalid={fieldState.invalid}
                                className="h-auto rounded-[9px] border-[#2a2a2e] bg-[#18181b] px-3.5 py-[9px] text-[13px] text-[#e8e8ea] transition-colors duration-150 focus-visible:border-[#e8493f]/50 focus-visible:ring-[#e8493f]/20 aria-invalid:border-[#e8493f]/60 [&:-webkit-autofill]:[-webkit-text-fill-color:#e8e8ea] [&:-webkit-autofill]:[-webkit-box-shadow:0_0_0px_1000px_#18181b_inset] [&:-webkit-autofill]:[transition:background-color_9999s_ease-in-out_0s]"
                            />
                            {fieldState.invalid && (
                                <FieldError
                                    errors={[fieldState.error]}
                                    className="text-[12px] text-[#e0857a]"
                                />
                            )}
                          </Field>
                      )}
                  />
                  <Typography variant={"span"} className={"mb-2"}>
                    <Link
                        href="/forgot-password"
                        className="text-[12px] font-medium text-[#a1a1aa] hover:text-[#e8493f] transition-colors mb-4"
                    >
                      Forgot password?
                    </Link>
                  </Typography>

                  <Button
                      type="submit"
                      disabled={isBusy}
                      className="h-auto w-full rounded-[9px] cursor-pointer bg-[#e8493f] py-[10px] text-md font-bold text-[#1a0a09] transition-colors duration-150 hover:bg-[#e8493f]/90 disabled:opacity-60"
                  >
                    {loading ? "Signing in..." : "Sign in"}
                  </Button>

                  <Container as={"div"} className="relative flex items-center justify-center py-1">
                    <Separator className="absolute inset-x-0 bg-[#2a2a2e]" />
                    <Typography
                        variant="span"
                        className="relative bg-[#0f0f10] px-2.5 text-[11px] font-semibold uppercase tracking-wide text-[#71717a]"
                    >
                      Or continue with
                    </Typography>
                  </Container>

                  <Button
                      type="button"
                      variant="outline"
                      onClick={handleGoogleSignIn}
                      disabled={isBusy}
                      className="h-auto w-full cursor-pointer rounded-md border-[#2a2a2e] bg-[#18181b] py-[10px] text-[13px] font-medium text-[#e8e8ea] transition-colors duration-150 hover:bg-[#212124] hover:text-[#e8e8ea] disabled:opacity-60"
                  >
                    <GoogleIcon className="mr-2 size-4" aria-hidden={true} />
                    {googleLoading ? "Connecting..." : "Sign in with Google"}
                  </Button>

                  {authError && (
                      <div className="rounded-[9px] border border-[#e8493f]/30 bg-[#e8493f]/10 px-3.5 py-2.5 text-[13px] text-[#e0857a]">
                        {authError}
                      </div>
                  )}
                </FieldGroup>
              </form>
            </CardContent>
          </Card>

          <Typography variant="p" className="mt-1! text-center text-[13px] text-[#a1a1aa]">
            Don&apos;t have an account?{" "}
            <Link
                href="/register"
                className="font-semibold text-[#e8493f] underline-offset-4 hover:underline"
            >
              Sign up
            </Link>
          </Typography>
        </Container>
      </Container>
  );
}