import type { ReactNode } from "react";
import {
  Bot,
  Building2,
  Gauge,
  Globe,
  LayoutDashboard,
  PanelTop,
  PenTool,
  RefreshCw,
  Search,
  ShoppingBag,
  Workflow,
  Wrench,
  type LucideIcon,
} from "lucide-react";

/**
 * En Lucide-ikon per tjänst.
 * Nyckeln matchar service.slug i lib/services.ts.
 */
const icons: Record<string, LucideIcon> = {
  landningssidor: PanelTop,
  "e-handel": ShoppingBag,
  foretagssajter: Building2,
  webbdesign: PenTool,
  redesign: RefreshCw,
  seo: Search,
  prestanda: Gauge,
  hosting: Globe,
  underhall: Wrench,
  "api-integrationer": Workflow,
  "ai-integrationer": Bot,
  "skradarsydda-system": LayoutDashboard,
};

export const serviceIcons: Record<string, ReactNode> = Object.fromEntries(
  Object.entries(icons).map(([slug, Icon]) => [
    slug,
    <Icon key={slug} aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />,
  ]),
);
