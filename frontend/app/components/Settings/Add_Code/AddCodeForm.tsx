"use client";

import { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Failed, Success } from "@/app/globals/ToastMessage/ToastMessage";

const codeSchema = z.object({
  css: z.string(),
  javascript: z.string(),
});

type CodeFormData = z.infer<typeof codeSchema>;

export default function AddCodeForm() {
  const [activeTab, setActiveTab] = useState<"css" | "javascript">("css");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CodeFormData>({
    resolver: zodResolver(codeSchema),
    defaultValues: {
      css: "",
      javascript: "",
    },
  });

  const onSubmit: SubmitHandler<CodeFormData> = async (data) => {
    try {
      const response = await fetch("/api/addCode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        Success({
          message: `Your ${activeTab.toUpperCase()} code has been successfully saved.`,
        });
      } else {
        throw new Error("Failed to save code");
      }
    } catch (error) {
      Failed({
        message: `Failed to save ${activeTab.toUpperCase()} code. Please try again.`,
      });
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Add Custom Code</CardTitle>
        <CardDescription>
          Add custom CSS and JavaScript to your website
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Tabs
            value={activeTab}
            onValueChange={(value) =>
              setActiveTab(value as "css" | "javascript")
            }
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="css">CSS</TabsTrigger>
              <TabsTrigger value="javascript">JavaScript</TabsTrigger>
            </TabsList>
            <TabsContent value="css">
              <div className="relative">
                <Controller
                  name="css"
                  control={control}
                  render={({ field }) => (
                    <pre className="min-h-[300px] p-4 bg-gray-800 text-gray-100 rounded-md overflow-auto">
                      <code className="block whitespace-pre-wrap">
                        <textarea
                          {...field}
                          className="w-full h-full bg-transparent resize-none outline-none font-mono"
                          placeholder="Enter your custom CSS here..."
                        />
                      </code>
                    </pre>
                  )}
                />
              </div>
              {errors.css && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.css.message}
                </p>
              )}
            </TabsContent>
            <TabsContent value="javascript">
              <div className="relative">
                <Controller
                  name="javascript"
                  control={control}
                  render={({ field }) => (
                    <pre className="min-h-[300px] p-4 bg-gray-800 text-gray-100 rounded-md overflow-auto">
                      <code className="block whitespace-pre-wrap">
                        <textarea
                          {...field}
                          className="w-full h-full bg-transparent resize-none outline-none font-mono"
                          placeholder="Enter your custom JavaScript here..."
                        />
                      </code>
                    </pre>
                  )}
                />
              </div>
              {errors.javascript && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.javascript.message}
                </p>
              )}
            </TabsContent>
          </Tabs>
          <CardFooter className="flex justify-end mt-6">
            <Button type="submit">
              Save {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Code
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
