import type { Route } from "@tanstack/react-router";
import type Stripe from "stripe";

import type { Icons } from "@/components/icons";

export interface SessionUser {
  name: string;
  email: string;
  image?: string | null;
  role?: string | null;
  isAnonymous?: boolean | null;
}

export interface StoredFile {
  id: string;
  name: string;
  url: string;
}

export interface NavItem {
  title: string;
  url: Route;
  disabled?: boolean;
  external?: boolean;
  shortcut?: [string, string];
  icon?: React.ReactNode;
  label?: string;
  description?: string;
  isActive?: boolean;
  items?: NavItem[];
}

export interface SidebarNavItem {
  title: string;
  url: Route;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
  isActive?: boolean;
  description?: string;
}

export interface SearchParams {
  [key: string]: string | string[] | undefined;
}

export const UserRole = {
  Admin: "admin",
  Consumer: "consumer",
} as const;

export const UserGender = {
  Male: "male",
  Female: "female",
  Other: "other",
} as const;

export interface Option {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
  withCount?: boolean;
}

export type StripePaymentStatus = Stripe.PaymentIntent.Status;

export interface DataTableFilterField<TData> {
  label: string;
  value: keyof TData;
  placeholder?: string;
  options?: Option[];
}
