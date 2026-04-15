"use client";

import { useActionState } from "react";
import { submitContact } from "@/lib/actions/contact";
import { contactSchema, type ContactFormData } from "@/lib/schemas/contact";
import type { ActionResult } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

// Initial state for the form
const initialState: ActionResult<ContactFormData> | null = null;

export function ContactForm() {
  const [state, formAction, isPending] = useActionState<
    ActionResult<ContactFormData> | null,
    FormData
  >(submitContact, initialState);

  // Client-side validation with Zod safeParse
  const validateField = (field: string, value: string): string | null => {
    const partialData = { [field]: value };
    // For name and email, we validate the specific field
    if (field === "name") {
      const result = contactSchema.safeParse({
        ...partialData,
        email: "temp@temp.com",
        message: "This is a test message that is long enough",
      });
      if (!result.success) {
        const nameError = result.error.issues.find((i) => i.path[0] === "name");
        return nameError?.message || null;
      }
    }
    if (field === "email") {
      const result = contactSchema.safeParse({
        name: "Test",
        ...partialData,
        message: "This is a test message that is long enough",
      });
      if (!result.success) {
        const emailError = result.error.issues.find((i) => i.path[0] === "email");
        return emailError?.message || null;
      }
    }
    if (field === "message") {
      const result = contactSchema.safeParse({
        name: "Test",
        email: "test@test.com",
        ...partialData,
      });
      if (!result.success) {
        const msgError = result.error.issues.find((i) => i.path[0] === "message");
        return msgError?.message || null;
      }
    }
    return null;
  };

  // Handle success state
  if (state?.success) {
    return (
      <div
        className="flex flex-col items-center justify-center rounded-lg border bg-card p-8 text-center"
        role="status"
        aria-live="polite"
      >
        <CheckCircle2 className="size-16 text-green-500 mb-4" />
        <p className="text-lg font-medium text-foreground">
          ¡Mensaje enviado! Te respondo pronto.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg">
      {/* Error Banner */}
      {state?.success === false && (
        <div
          id="form-error"
          className="mb-4 rounded-lg border border-destructive bg-destructive/10 px-4 py-3 text-sm text-destructive"
          role="alert"
          aria-live="assertive"
        >
          {state.error}
        </div>
      )}

      <form action={formAction} className="space-y-4">
        {/* Name Field */}
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="text-sm font-medium text-foreground"
          >
            Nombre
          </label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Tu nombre"
            required
            minLength={2}
            disabled={isPending}
            aria-describedby={state?.success === false ? "form-error" : undefined}
          />
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="text-sm font-medium text-foreground"
          >
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="tu@email.com"
            required
            disabled={isPending}
            aria-describedby={state?.success === false ? "form-error" : undefined}
          />
        </div>

        {/* Message Field */}
        <div className="space-y-2">
          <label
            htmlFor="message"
            className="text-sm font-medium text-foreground"
          >
            Mensaje
          </label>
          <Textarea
            id="message"
            name="message"
            placeholder="¿En qué puedo ayudarte?"
            required
            minLength={10}
            rows={5}
            disabled={isPending}
            aria-describedby={state?.success === false ? "form-error" : undefined}
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isPending}
          className={cn("w-full", isPending && "opacity-70")}
        >
          {isPending ? "Enviando..." : "Enviar mensaje"}
        </Button>
      </form>
    </div>
  );
}