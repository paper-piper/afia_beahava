"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Cake } from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { href: "#gallery", label: "הגלריה" },
  { href: "#order", label: "הזמנה" },
  { href: "#about", label: "אודות" },
  { href: "#reviews", label: "ביקורות" },
  { href: "#delivery", label: "משלוחים" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 right-0 left-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Cake className="w-8 h-8 text-primary" />
            <span className="text-xl md:text-2xl font-bold text-foreground">
              אפייה מאהבה
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-foreground/80 hover:text-primary transition-colors font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button asChild>
              <Link href="#order">הזמינו עכשיו</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="תפריט"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-foreground/80 hover:text-primary transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Button asChild className="mt-2">
                <Link href="#order" onClick={() => setIsMenuOpen(false)}>
                  הזמינו עכשיו
                </Link>
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
