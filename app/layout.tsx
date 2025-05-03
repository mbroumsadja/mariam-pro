import type React from "react"
import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/lib/use-cart"
import { ThemeProvider } from "@/components/theme-provider"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
})

export const metadata: Metadata = {
  title: "Élégance Boutique - Votre style, votre cuisine, votre beauté",
  description:
    "Découvrez notre collection exclusive de produits pour femmes: cosmétiques, vêtements et ustensiles de cuisine.",
  manifest: "/manifest.json",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <head>
        {/* Meta Pixel Code - Commenté pour l'instant */}
        {/* 
        <script>
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', 'VOTRE_PIXEL_ID');
          fbq('track', 'PageView');
        </script>
        */}

        {/* ManyChat Code - Commenté pour l'instant */}
        {/*
        <script src="//widget.manychat.com/VOTRE_ID_MANYCHAT.js" async="async"></script>
        */}

        {/* Shopify Buy Button - Commenté pour l'instant */}
        {/*
        <script type="text/javascript">
          (function () {
            var scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
            if (window.ShopifyBuy) {
              if (window.ShopifyBuy.UI) {
                ShopifyBuyInit();
              } else {
                loadScript();
              }
            } else {
              loadScript();
            }
            function loadScript() {
              var script = document.createElement('script');
              script.async = true;
              script.src = scriptURL;
              (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
              script.onload = ShopifyBuyInit;
            }
            function ShopifyBuyInit() {
              var client = ShopifyBuy.buildClient({
                domain: 'votre-boutique.myshopify.com',
                storefrontAccessToken: 'votre-token',
              });
              ShopifyBuy.UI.onReady(client).then(function (ui) {
                ui.createComponent('product', {
                  id: 'votre-id-produit',
                  node: document.getElementById('product-component-id'),
                  moneyFormat: '%E2%82%AF%20FCFA',
                  options: {
                    product: {
                      styles: {
                        product: {
                          '@media (min-width: 601px)': {
                            'max-width': '100%',
                            'margin-left': '0',
                            'margin-bottom': '50px'
                          }
                        }
                      }
                    },
                    cart: {
                      styles: {
                        button: {
                          'background-color': '#f472b6',
                          'color': 'white',
                          'font-family': 'Montserrat, sans-serif',
                          ':hover': {
                            'background-color': '#ec4899'
                          }
                        }
                      }
                    }
                  }
                });
              });
            }
          })();
        </script>
        */}
      </head>
      <body className={`${montserrat.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <CartProvider>{children}</CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
