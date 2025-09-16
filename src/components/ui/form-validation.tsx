"use client";

import { useForm, SubmitHandler, FieldValues } from "react-hook-form";

interface FormValidationProps<T extends FieldValues> {
  onSubmit: SubmitHandler<T>;
  children: React.ReactNode;
  className?: string;
}

export function FormValidation<T extends FieldValues>({ onSubmit, children, className }: FormValidationProps<T>) {
  const { handleSubmit } = useForm<T>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={className}>
      {children}
    </form>
  );
}
