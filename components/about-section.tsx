"use client"

import Image from "next/image"
import { Heart, Award, Sparkles, Clock } from "lucide-react"

const features = [
  {
    icon: Heart,
    title: "אהבה בכל פרט",
    description: "כל עוגה נאפית עם תשומת לב לפרטים הקטנים ביותר ואהבה אמיתית למלאכה",
  },
  {
    icon: Sparkles,
    title: "עיצוב אישי",
    description: "עוגות זילוף מעוצבות בהתאמה אישית לפי הבקשות והחלומות שלכם",
  },
  {
    icon: Award,
    title: "חומרי גלם איכותיים",
    description: "משתמשים רק בחומרים הטובים ביותר לטעם שאי אפשר לשכוח",
  },
  {
    icon: Clock,
    title: "שירות אישי",
    description: "ליווי צמוד מרגע ההזמנה ועד לקבלת העוגה המושלמת",
  },
]

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Side */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              אודות
              <span className="text-primary"> אפייה מאהבה</span>
            </h2>

            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                עם יותר מ־7 שנות ניסיון בעולם האפייה, אני מתמחה ביצירת עוגות בעיצוב ובהתאמה אישית לכל אירוע ורגע מיוחד. כל עוגה מתחילה מהקשבה אמיתית לרצון שלכם – הטעמים, הסגנון והחלום – ומקבלת ביטוי מדויק, מוקפד ויצירתי.
              </p>
              <p>אצלי כל עוגה נעשית באהבה גדולה, עם חומרי גלם איכותיים ותשומת לב לכל פרט קטן. המטרה שלי היא לא רק להכין עוגה יפה וטעימה, אלא ליצור חוויה מתוקה שתישאר איתכם הרבה אחרי הביס האחרון. 🍰
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-6 mt-10">
              {features.map((feature) => (
                <div key={feature.title} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image Side */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden relative">
              <Image
                src="/baker.jpg"
                alt="אפייה מאהבה - יצירת עוגות בהתאמה אישית"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-6 bg-card shadow-lg rounded-xl p-4 border border-border">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xl">
                  ❤️
                </div>
                <div>
                  <div className="font-bold text-foreground">500+</div>
                  <div className="text-sm text-muted-foreground">לקוחות מרוצים</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
