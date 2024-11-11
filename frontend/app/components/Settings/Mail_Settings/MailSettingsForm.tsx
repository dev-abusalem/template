"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Failed, Success } from "@/app/globals/ToastMessage/ToastMessage";

// Define the schema for form validation
const mailSettingsSchema = z.object({
  smtpServer: z.string().min(1, "SMTP Server is required"),
  smtpPort: z.string().regex(/^\d+$/, "Port must be a number"),
  username: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  useGoogleAuth: z.boolean(),
  googlePassword: z.string().optional(),
});

type MailSettingsFormData = z.infer<typeof mailSettingsSchema>;

export default function MailSettingsForm() {
  const [useGoogleAuth, setUseGoogleAuth] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<MailSettingsFormData>({
    resolver: zodResolver(mailSettingsSchema),
    defaultValues: {
      useGoogleAuth: false,
    },
  });

  const onSubmit: SubmitHandler<MailSettingsFormData> = async (data) => {
    try {
      const response = await fetch("/api/mailSettings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        Success({
          message: "Your mail settings have been successfully saved.",
        });
      } else {
        throw new Error("Failed to save settings");
      }
    } catch (error) {
      Failed({
        message: "Failed to save mail settings. Please try again.",
      });
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Mail Settings</CardTitle>
        <CardDescription>Configure your email server settings</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="general">General Settings</TabsTrigger>
              <TabsTrigger value="authentication">Authentication</TabsTrigger>
            </TabsList>
            <TabsContent value="general">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="smtpServer">SMTP Server</Label>
                    <Input id="smtpServer" {...register("smtpServer")} />
                    {errors.smtpServer && (
                      <p className="text-sm text-red-500">
                        {errors.smtpServer.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtpPort">SMTP Port</Label>
                    <Input id="smtpPort" {...register("smtpPort")} />
                    {errors.smtpPort && (
                      <p className="text-sm text-red-500">
                        {errors.smtpPort.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Username (Email)</Label>
                  <Input id="username" {...register("username")} />
                  {errors.username && (
                    <p className="text-sm text-red-500">
                      {errors.username.message}
                    </p>
                  )}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="authentication">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="useGoogleAuth"
                    checked={useGoogleAuth}
                    onCheckedChange={(checked) => {
                      setUseGoogleAuth(checked);
                    }}
                    {...register("useGoogleAuth")}
                  />
                  <Label htmlFor="useGoogleAuth">
                    Use Google Authentication
                  </Label>
                </div>
                {useGoogleAuth ? (
                  <div className="space-y-2">
                    <Label htmlFor="googlePassword">Google App Password</Label>
                    <Input
                      id="googlePassword"
                      type="password"
                      {...register("googlePassword")}
                    />
                    {errors.googlePassword && (
                      <p className="text-sm text-red-500">
                        {errors.googlePassword.message}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      {...register("password")}
                    />
                    {errors.password && (
                      <p className="text-sm text-red-500">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
          <CardFooter className="flex justify-end mt-6">
            <Button type="submit">Save Settings</Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
