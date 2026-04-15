import type { Service, ServiceId } from "../types";

export const SERVICES: readonly Service[] = [
  {
    id: "landing-pages" as ServiceId,
    title: "Landing Pages de Conversión",
    description: "Landing pages optimizadas para convertir visitantes en clientes. Diseño premium, animaciones sutiles y formularios integrados.",
    iconName: "Rocket",
    features: [
      "Diseño responsive y accesible",
      "Formularios con validación",
      "Animaciones que sorprenden",
      "SEO optimizado",
      "Integración con WhatsApp/Email",
    ],
  },
  {
    id: "dashboards" as ServiceId,
    title: "Dashboards Administrativos",
    description: "Paneles de control para gestionar tu negocio. Visualizaciones de datos, gestión de usuarios y configuraciones.",
    iconName: "LayoutDashboard",
    features: [
      "Gráficos interactivos",
      "Gestión de usuarios",
      "Exportación de datos",
      "Diseño adaptativo",
      "Notificaciones en tiempo real",
    ],
  },
  {
    id: "mvp" as ServiceId,
    title: "MVPs en 1-2 Semanas",
    description: "Tu idea convertida en producto mínimo viable en tiempo récord. Iteramos rápido para validar tu hipótesis de negocio.",
    iconName: "Zap",
    features: [
      "Entrega en 7-14 días",
      "Código mantenible",
      "Listo para escalar",
      "Documentación básica",
      "Soporte post-lanzamiento",
    ],
  },
  {
    id: "ai-integration" as ServiceId,
    title: "Integración Ligera de IA",
    description: "Agrega inteligencia artificial a tu producto sin complejidad. Chatbots, generación de contenido y análisis de datos.",
    iconName: "Brain",
    features: [
      "Chatbots inteligentes",
      "Generación de texto/imágenes",
      "Análisis de datos",
      "Integración con OpenAI",
      "APIs personalizables",
    ],
  },
] as const;

export type ServiceData = (typeof SERVICES)[number];
