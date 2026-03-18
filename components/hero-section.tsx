"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart, Sparkles } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-background to-secondary/30 pt-24 pb-12">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-right order-2 lg:order-1">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">עוגות מעוצבות בהזמנה אישית</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight text-balance">
              אפיית עוגות
              <br />
              <span className="text-primary">מאהבה</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              עוגות זילוף מעוצבות על פי הזמנה, סמאש קייק וביצי שוקולד בעיצוב אישי.
              כל עוגה נאפתה עם תשומת לב לפרטים ואהבה אמיתית.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Button size="lg" asChild className="text-lg px-8">
                <Link href="#gallery">
                  צפו בגלריה
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-8">
                <Link href="#order" className="flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  הזמינו עוגה
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0">
              <div className="text-center lg:text-right">
                <div className="text-2xl md:text-3xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground mt-1">עוגות שנאפו</div>
              </div>
              <div className="text-center lg:text-right">
                <div className="text-2xl md:text-3xl font-bold text-primary">18</div>
                <div className="text-sm text-muted-foreground mt-1">קטגוריות</div>
              </div>
              <div className="text-center lg:text-right">
                <div className="text-2xl md:text-3xl font-bold text-primary">100%</div>
                <div className="text-sm text-muted-foreground mt-1">אהבה</div>
              </div>
            </div>
          </div>

          {/* Image Side */}
          <div className="relative order-1 lg:order-2">
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-4 -left-4 w-64 h-64 bg-accent/30 rounded-full blur-3xl" />

              {/* Main image */}
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl border-4 border-card">
                <Image
                  src="/hero_cake.jpg"
                  alt="עוגה מעוצבת מאפייה מאהבה"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 bg-card rounded-xl shadow-lg p-4 border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Heart className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-bold text-foreground">נאפה באהבה</div>
                    <div className="text-sm text-muted-foreground">ראשון לציון</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
