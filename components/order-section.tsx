"use client"

import { useState } from "react"
import { Send, MessageSquare, Phone, User, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

// WhatsApp SVG Icon
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

export function OrderSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    cakeType: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to submit order')
      }

      setIsSubmitting(false)
      setIsSubmitted(true)
      
      // Reset after showing success
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({ name: "", phone: "", cakeType: "", message: "" })
      }, 3000)
    } catch (error) {
      console.error('Error submitting order:', error)
      setIsSubmitting(false)
      alert('שגיאה בשליחת ההזמנה. אנא נסו שוב.')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section id="order" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">הזמנה בהתאמה אישית</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              הזמינו עוגה חלומית
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              ספרו לנו על האירוע ועל העוגה שאתם מחפשים, ואנחנו ניצור עבורכם יצירת מופת מתוקה
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-card rounded-2xl shadow-lg border border-border p-6 md:p-10">
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  הבקשה נשלחה בהצלחה!
                </h3>
                <p className="text-muted-foreground">
                  תודה שפניתם אלינו! נחזור אליכם בהקדם עם הצעת מחיר ופרטים נוספים
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name & Phone */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="relative">
                    <User className="absolute right-3 top-3 w-5 h-5 text-muted-foreground" />
                    <Input
                      name="name"
                      placeholder="שם מלא"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="pr-10"
                    />
                  </div>
                  <div className="relative">
                    <Phone className="absolute right-3 top-3 w-5 h-5 text-muted-foreground" />
                    <Input
                      name="phone"
                      type="tel"
                      placeholder="טלפון"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="pr-10"
                    />
                  </div>
                </div>

                {/* Cake Type */}
                <div>
                  <select
                    name="cakeType"
                    value={formData.cakeType}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">בחרו סוג עוגה</option>
                    <option value="birthday-boys">עוגת יום הולדת בנים</option>
                    <option value="birthday-girls">עוגת יום הולדת בנות</option>
                    <option value="birthday-adults">עוגת יום הולדת מבוגרים</option>
                    <option value="brit">עוגת ברית/בריתה</option>
                    <option value="smash">סמאש קייק</option>
                    <option value="bachelor">עוגת רווקים/רווקות</option>
                    <option value="anniversary">עוגת יום נישואין</option>
                    <option value="army">עוגת גיוס/שחרור</option>
                    <option value="bar-mitzvah">עוגת בר מצווה</option>
                    <option value="bat-mitzvah">עוגת בת מצווה</option>
                    <option value="wedding">עוגת חתונה</option>
                    <option value="chocolate-eggs">ביצי שוקולד</option>
                    <option value="cupcakes">קאפקייקס</option>
                    <option value="other">אחר</option>
                  </select>
                </div>

                {/* Message */}
                <div className="relative">
                  <MessageSquare className="absolute right-3 top-3 w-5 h-5 text-muted-foreground" />
                  <Textarea
                    name="message"
                    placeholder="ספרו לנו על העוגה - נושא, צבעים, העדפות מיוחדות..."
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    className="pr-10 resize-none"
                  />
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  size="lg"
                  className="w-full text-lg py-6"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      שולח...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-5 h-5" />
                      שליחת הזמנה
                    </span>
                  )}
                </Button>
              </form>
            )}
          </div>

          {/* Contact Alternative */}
          <div className="mt-8 text-center">
            <p className="text-muted-foreground mb-4">
              מעדיפים לדבר ישירות?
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://wa.me/972723933047"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-full hover:bg-[#20bd5a] transition-colors font-medium"
              >
                <WhatsAppIcon className="w-5 h-5" />
                <span>שלחו הודעה בוואטסאפ</span>
              </a>
              <a
                href="tel:+972723933047"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full hover:bg-primary/90 transition-colors font-medium"
              >
                <Phone className="w-4 h-4" />
                <span>072-393-3047</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
