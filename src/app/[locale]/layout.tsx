import { notFound } from "next/navigation";
import { isValidLocale } from "@/lib/i18n";
import { localeParams } from "@/lib/locale-params";

export const dynamicParams = true;
export const revalidate = 604800;

export function generateStaticParams() {
  return localeParams();
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  return <>{children}</>;
}
