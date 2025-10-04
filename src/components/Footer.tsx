import React from "react";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer(): React.ReactElement {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-accent text-accent-foreground border-t border-border"
      lang="nb"
    >
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Harestua Bilverksted</h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              Din lokale bilpartner på Harestua. Vi tilbyr komplett bilservice
              med personlig service og ærlig rådgivning.
            </p>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Hurtiglenker</h3>
            <nav className="space-y-2">
              <Link
                href="/"
                className="block text-sm hover:text-primary transition-colors"
              >
                Hjem
              </Link>
              <Link
                href="/tjenester"
                className="block text-sm hover:text-primary transition-colors"
              >
                Tjenester
              </Link>
              <Link
                href="/om-oss"
                className="block text-sm hover:text-primary transition-colors"
              >
                Om oss
              </Link>
              <Link
                href="/kontakt"
                className="block text-sm hover:text-primary transition-colors"
              >
                Kontakt
              </Link>
            </nav>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Kontakt oss</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 mt-0.5 text-primary" />
                <div>
                  <p className="text-sm">Hadelandsvegen 902</p>
                  <p className="text-sm">2743 Harestua</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-primary" />
                <p className="text-sm">+47 480 46 600</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-primary" />
                <p className="text-sm">post@harestuabil.no</p>
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Åpningstider</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Clock className="h-4 w-4 text-primary" />
                <div className="text-sm">
                  <p>Man-Fre: 07:00 - 16:00</p>
                  <p>Lørdag: Stengt</p>
                  <p>Søndag: Stengt</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              <p>
                © {currentYear} Harestua Bil AS. Alle rettigheter reservert.
              </p>
              <p>Org.nr: 998 828 309 MVA</p>
            </div>
            <div className="flex space-x-6 text-sm">
              {/* Privacy and Terms pages will be added later */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
