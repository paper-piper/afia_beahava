"use client"

import { MapPin, Truck, Clock, CheckCircle } from "lucide-react"

const serviceAreas = [
  "ראשון לציון",
  "נס ציונה",
  "באר יעקב",
  "רחובות",
  "יבנה",
  "אשדוד",
  "חולון",
  "בת ים",
]

const deliveryInfo = [
  {
    icon: Truck,
    title: "משלוחים",
    description: "משלוחים לכל אזור השרון והמרכז בתיאום מראש",
  },
  {
    icon: Clock,
    title: "זמני הזמנה",
    description: "מומלץ להזמין לפחות שבוע מראש לאירועים גדולים",
  },
  {
    icon: CheckCircle,
    title: "איסוף עצמי",
    description: "אפשרות לאיסוף עצמי מראשון לציון ללא עלות",
  },
]

export function DeliverySection() {
  return (
    <section id="delivery" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-medium">אזורי שירות ומשלוחים</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              מגיעים אליכם
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              אנחנו פועלים מראשון לציון ומספקים שירות לכל אזור המרכז
            </p>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Service Areas */}
            <div className="bg-card rounded-2xl p-8 border border-border">
              <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                אזורי שירות
              </h3>
              
              <div className="grid grid-cols-2 gap-3">
                {serviceAreas.map((area) => (
                  <div
                    key={area}
                    className="flex items-center gap-2 bg-secondary/50 rounded-lg px-4 py-3"
                  >
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-foreground">{area}</span>
                  </div>
                ))}
              </div>

              <p className="mt-6 text-sm text-muted-foreground">
                * אזורים נוספים בתיאום מראש. צרו קשר לבדיקת אפשרות משלוח לאזורכם.
              </p>
            </div>

            {/* Delivery Info */}
            <div className="space-y-6">
              {deliveryInfo.map((info) => (
                <div
                  key={info.title}
                  className="bg-card rounded-xl p-6 border border-border flex items-start gap-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <info.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      {info.title}
                    </h4>
                    <p className="text-muted-foreground">
                      {info.description}
                    </p>
                  </div>
                </div>
              ))}

              {/* Contact Card */}
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-6 border border-primary/20">
                <h4 className="font-semibold text-foreground mb-3">
                  יש שאלות על משלוחים?
                </h4>
                <p className="text-muted-foreground mb-4">
                  צרו איתנו קשר ונשמח לעזור בכל שאלה
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://wa.me/972500000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full text-sm hover:bg-green-600 transition-colors"
                  >
                    <span>💬</span>
                    <span>וואטסאפ</span>
                  </a>
                  <a
                    href="tel:+972723933047"
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm hover:bg-primary/90 transition-colors"
                  >
                    <span>📞</span>
                    <span>072-393-3047</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
