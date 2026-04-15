"use server";

import { contactSchema, type ContactFormData } from "@/lib/schemas/contact";
import type { ActionResult } from "@/lib/types";

export async function submitContact(
  _prevState: ActionResult<ContactFormData> | null,
  formData: FormData,
): Promise<ActionResult<ContactFormData>> {
  const rawData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    message: formData.get("message") as string,
  };

  const result = contactSchema.safeParse(rawData);

  if (!result.success) {
    const errorMessage = result.error.issues
      .map((issue) => issue.message)
      .join(", ");
    return { success: false, error: errorMessage };
  }

  // v1: Log to console (email service integration in v2)
  console.log("Contact form submission:", {
    ...result.data,
    timestamp: new Date().toISOString(),
  });

  return { success: true, data: result.data };
}