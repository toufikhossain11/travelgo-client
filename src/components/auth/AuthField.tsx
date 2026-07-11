"use client";

import type { ChangeEvent, ReactNode } from "react";
import { FieldError, InputGroup, Label, TextField } from "@heroui/react";

interface AuthFieldProps {
  id: string;
  name: string;
  label: string;
  type?: string;
  icon: ReactNode;
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  autoComplete?: string;
  suffix?: ReactNode;
}

export default function AuthField({
  id,
  name,
  label,
  type = "text",
  icon,
  placeholder,
  value,
  onChange,
  error,
  autoComplete,
  suffix,
}: AuthFieldProps) {
  return (
    <TextField name={name} isInvalid={Boolean(error)} className="w-full">
      <Label htmlFor={id}>{label}</Label>
      <InputGroup fullWidth>
        <InputGroup.Prefix>{icon}</InputGroup.Prefix>
        <InputGroup.Input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
        />
        {suffix && <InputGroup.Suffix>{suffix}</InputGroup.Suffix>}
      </InputGroup>
      {error && <FieldError>{error}</FieldError>}
    </TextField>
  );
}
