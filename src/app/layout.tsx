import type { Metadata } from "next";
import { Manrope, Open_Sans, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { AnnouncementBanner } from "@/components/layout/AnnouncementBanner";
import { EditModeProvider } from "@/components/edit/EditModeContext";
import { EditBridge } from "@/components/edit/EditBridge";
import { getPortalSettings, getCmsPage } from "@/lib/portal";
import { generateThemeCss } from "@/lib/theme";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  variable: "--font-open-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const revalidate = 3600;

export const metadata: Metadata = {
  metadataBase: new URL("https://tirskix-academy.com"),
  title: {
    default: "TirSkix Academy — онлайн-школа программирования для детей",
    template: "%s | TirSkix Academy",
  },
  description:
    "Обучение программированию для детей 10–18 лет онлайн. Три трека: Игровая студия, Кодэкс, ТехноЛаб. Реальные результаты: БВИ, ОГЭ 19/21, полуфинал ICPC.",
  keywords: [
    "онлайн школа программирования для детей",
    "программирование для детей",
    "Python для подростков",
    "обучение программированию для школьников",
  ],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "TirSkix Academy",
  },
  robots: { index: true, follow: true },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [settings, branding, announcement] = await Promise.all([
    getPortalSettings(),
    getCmsPage("branding") as Promise<Record<string, unknown>>,
    getCmsPage("announcement") as Promise<Record<string, unknown>>,
  ]);
  const brandHex = typeof branding.brand_hex === "string" && /^#[0-9a-fA-F]{6}$/.test(branding.brand_hex)
    ? branding.brand_hex : null;
  const themeCss = brandHex ? generateThemeCss(brandHex) : null;
  const faviconUrl = typeof branding.favicon_url === "string" && branding.favicon_url.trim()
    ? branding.favicon_url.trim() : null;
  const customHeadScript = typeof branding.custom_head_script === "string" && branding.custom_head_script.trim()
    ? branding.custom_head_script.trim() : null;
  const annEnabled = announcement.enabled === true;
  const annText = typeof announcement.text === "string" && announcement.text.trim()
    ? announcement.text.trim() : null;
  const annHref = typeof announcement.href === "string" && announcement.href.trim()
    ? announcement.href.trim() : null;
  const annStyle = typeof announcement.style === "string" ? announcement.style : "brand";

  return (
    <html
      lang="ru"
      suppressHydrationWarning
      className={`${manrope.variable} ${openSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        {themeCss && <style dangerouslySetInnerHTML={{ __html: themeCss }} />}
        {faviconUrl && (
          <>
            <link rel="icon" href={faviconUrl} />
            <link rel="shortcut icon" href={faviconUrl} />
            <link rel="apple-touch-icon" href={faviconUrl} />
          </>
        )}
        {customHeadScript && (
          <script dangerouslySetInnerHTML={{ __html: customHeadScript }} />
        )}
        {/* Google Analytics 4 */}
        {settings.ga_measurement_id && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${settings.ga_measurement_id}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${settings.ga_measurement_id}');`,
              }}
            />
          </>
        )}

        {/* Yandex.Metrica */}
        {settings.ym_counter_id && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");ym(${settings.ym_counter_id},"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true});`,
            }}
          />
        )}

        {/* VK Pixel */}
        {settings.vk_pixel_id && (
          <script
            dangerouslySetInnerHTML={{
              __html: `!function(){var t=document.createElement("script");t.type="text/javascript",t.async=!0,t.src="https://vk.com/js/api/openapi.js?169",t.onload=function(){VK.Retargeting.Init("${settings.vk_pixel_id}"),VK.Retargeting.Hit()},document.head.appendChild(t)}();`,
            }}
          />
        )}
      </head>
      <body className="min-h-full flex flex-col">
        <EditModeProvider>
          <EditBridge />
          {annEnabled && annText && (
            <AnnouncementBanner text={annText} href={annHref} style={annStyle} />
          )}
          <ThemeProvider>{children}</ThemeProvider>
        </EditModeProvider>
      </body>
    </html>
  );
}
