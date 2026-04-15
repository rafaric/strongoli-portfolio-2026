import { z } from "zod";

// Zod 4: uses `error` parameter, not `message`
export const contactSchema = z.object({
  name: z.string().min(2, { error: "El nombre debe tener al menos 2 caracteres" }),
  email: z.email({ error: "Ingresá un email válido" }),
  message: z.string().min(10, { error: "El mensaje debe tener al menos 10 caracteres" }),
});

export type ContactFormData = z.infer<typeof contactSchema>;
