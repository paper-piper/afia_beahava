"use client"

import { Star, MessageCircle } from "lucide-react"

const reviews = [
  {
    id: 1,
    name: "מיכל כ.",
    text: "תודה ענקית על העוגה התגובות היו מטורפות הבת שלי התלהבה מאוד מאוד וכולם הרעיפו עליך מלא מחמאות עשית לנו את היום הולדת !!!",
    rating: 5,
    event: "עוגת יום הולדת",
  },
  {
    id: 2,
    name: "שירה ל.",
    text: "רציתי לאמר תודה ענקית!! פשוט וואוו וואוו ועוד וואוו העוגה הייתה מהממת אפילו יותר מהתמונה בהרבה ובעיקר טעימה וטרייה באמת לילך תודה אחיין שלי היה מאושר כולם התעלפו לקחו גם את שמך ואת הטלפון מגיע לך שאפו ענק...",
    rating: 5,
    event: "עוגת יום הולדת",
  },
  {
    id: 3,
    name: "רונית מ.",
    text: "לילך בוקר טוב יקירה רוצה להודות לך מקרב לב על ההשקעה העוגה הייתה מושלמת! טעימה ומהממת הילדה שלי היתה בעננים תמשיכי לעשות חייל ונפגש בשמחות",
    rating: 5,
    event: "עוגת יום הולדת",
  },
  {
    id: 4,
    name: "דנה א.",
    text: "לילך המוכשרת המון המון תודות היה מושלם העוגה הייתה יפיפיה והכי חשוב טעימה ברמות הבת שלי הייתה בשמיים וכל החברות היו מוקסמות (כולן העלו סטטוס של העוגה אין ספק שנתראה שוב תודה רבה ושבת שלום",
    rating: 5,
    event: "עוגת יום הולדת",
  },
  {
    id: 5,
    name: "יעל ש.",
    text: "לילך היקרה, עכשיו כשכל הלחץ נרגע...אני חייבת להודות לך מקרב לב טעמתי המון עוגות מעוצבות בימי חיי ומעולם זה לא היה טעים ברמה שזה היה יפה כולם פשוט התמוגגו ולא הפסיקו לאכול...הכל- העוגה לגן, העוגה למסיבה בבית והקאפקייקס כמובן הכל היה מושלם והפך את המסיבה להצלחה מסחררת את באמת באמת מוכשרת - כל הכבוד",
    rating: 5,
    event: "עוגה וקאפקייקס",
  },
  {
    id: 6,
    name: "אורית ב.",
    text: "מושלם אחותי רואים מושקע ביותר שווה כל שקל היה מהמממם הילד היה בעננים ועוגה היית פצצה וטעימה סוף מחכה כבר לפעם הבא שזה מאוד קרוב",
    rating: 5,
    event: "עוגת יום הולדת",
  },
  {
    id: 7,
    name: "נועה ג.",
    text: "מהמם !!! תודה רבה היי לילך, רק רציתי לעדכן שהעוגה הייתה מממממש טעימה וכולם מאוד נהנו ממנה! אבא שלי ביקש למסור שהוא אכל לאט כי זה היה לו טעים מאוד! שוב תודהה ושבת שלום!!",
    rating: 5,
    event: "עוגת יום הולדת",
  },
  {
    id: 8,
    name: "תמר ד.",
    text: "היי לילך, רציתי לומר לך תודה רבה על העוגה היא הייתה פשוט מושלמת והטעם אמאלהההה לעוד ימי חגיגות רבים וטובים עם העוגות שלך",
    rating: 5,
    event: "עוגת חגיגה",
  },
  {
    id: 9,
    name: "אבי מ.",
    text: "ערב טוב, רק רציתי להגיד לך שכל מי שאכל וראה את העוגה עף עליה !! ובתור אחד שלא אוכל עוגות בדרך כלל עפתי ממש אז רוצה לומר לך שוב תודה",
    rating: 5,
    event: "עוגה מעוצבת",
  },
  {
    id: 10,
    name: "הילה ר.",
    text: "היי לילך, אני רוצה להגיד לך תודה רבה על העוגה המושלמת שהכנת העוגה יצאה ממש יפה וטעימה אליס והחברים שלה בגן מאוד נהנו",
    rating: 5,
    event: "עוגה לגן",
  },
  {
    id: 11,
    name: "סיון כ.",
    text: "לילך, עוגה שלך מדהימה! טעימה מאוד מאוד!! אתמול היה ממש כיף! עוגה הייתה לב המסיבה! המון תודה! בקרוב לבן שלי יש יום הולדת אהיה איתך בקשר",
    rating: 5,
    event: "עוגת מסיבה",
  },
]

export function ReviewsSection() {
  return (
    <section id="reviews" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm font-medium">מה הלקוחות אומרים</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            ביקורות ותגובות
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            הלקוחות שלנו הם המשפחה שלנו - קראו מה הם חושבים על העוגות והשירות
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-card rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow"
            >
              {/* WhatsApp-style header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-foreground">{review.name}</div>
                  <div className="text-xs text-muted-foreground">{review.event}</div>
                </div>
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-3">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-muted-foreground leading-relaxed">
                {'"'}{review.text}{'"'}
              </p>

              {/* WhatsApp Badge */}
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-xs text-green-600">
                  <span>💬</span>
                  <span>התקבל בוואטסאפ</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            גם אתם רוצים עוגה שתגרום לאורחים להתפעל?
          </p>
          <a
            href="#order"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors"
          >
            <span>הזמינו עכשיו</span>
            <span>🎂</span>
          </a>
        </div>
      </div>
    </section>
  )
}
