"use client";
import React from "react";
import { z, ZodType, ZodSchema } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface InvmsUpdateModalProps<T> {
  children: React.ReactNode;
  onSubmit: (values: T) => void;
  title: string;
  schema: any;
  defaultValues: any;
}

function InvmsUpdateModal<T>({
  children,
  onSubmit,
  title,
  schema,
  defaultValues,
}: InvmsUpdateModalProps<T>) {
  const form = useForm<any>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <AlertDialogHeader>
              <AlertDialogTitle>{title}</AlertDialogTitle>
              <AlertDialogDescription>
                {Object.keys(defaultValues).map((key) => (
                  <FormField
                    key={key}
                    control={form.control}
                    name={key}
                    render={({ field: formField }) => (
                      <FormItem>
                        <FormLabel>{key}</FormLabel>
                        <FormControl>
                          {Array.isArray(
                            (schema.shape as any)[key]?.options
                          ) ? (
                            <Select
                              onValueChange={(value) =>
                                formField.onChange(value)
                              }
                              defaultValue={formField.value as string}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder={`Select ${key}`} />
                              </SelectTrigger>
                              <SelectContent>
                                {(schema.shape as any)[key].options.map(
                                  (option: string) => (
                                    <SelectItem key={option} value={option}>
                                      {option}
                                    </SelectItem>
                                  )
                                )}
                              </SelectContent>
                            </Select>
                          ) : (
                            <Input {...formField} />
                          )}
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction type="submit">Update</AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default InvmsUpdateModal;
