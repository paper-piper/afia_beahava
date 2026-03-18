"use client"

import { useState, useMemo, useEffect } from "react"
import Image from "next/image"
import { X, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { OrderModal } from "@/components/order-modal"

export interface Cake {
  id: string
  name: string
  category: string
  categoryName: string
  description: string
  imageUrl: string
}

interface Category {
  id: string
  name: string
}

export function GallerySection() {
  const [categories, setCategories] = useState<Category[]>([
    { id: "all", name: "כל המתוקים" }
  ])
  const [cakes, setCakes] = useState<Cake[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedCake, setSelectedCake] = useState<Cake | null>(null)
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)

  useEffect(() => {
    async function loadCakes() {
      try {
        const response = await fetch('/api/cakes')
        const data = await response.json()
        if (data.categories) {
          setCategories(data.categories)
        }
        if (data.cakes) {
          setCakes(data.cakes)
        }
      } catch (error) {
        console.error('Error loading cakes:', error)
      } finally {
        setLoading(false)
      }
    }
    loadCakes()
  }, [])

  const filteredCakes = useMemo(() => {
    return cakes.filter((cake) => {
      return selectedCategory === "all" || cake.category === selectedCategory
    })
  }, [selectedCategory, cakes])

  const handleCakeClick = (cake: Cake) => {
    setSelectedCake(cake)
    setIsOrderModalOpen(true)
  }

  return (
    <section id="gallery" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            הגלריה שלנו
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            צפו בעוגות שיצרנו באהבה ובחרו את ההשראה לעוגה הבאה שלכם
          </p>
        </div>

        {/* Category Filters */}
        <div className="max-w-5xl mx-auto mb-10">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-card text-foreground border border-border hover:border-primary/50 hover:bg-primary/5"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          {/* Active Filter Badge */}
          {selectedCategory !== "all" && (
            <div className="mt-4 flex items-center justify-center gap-2">
              <span className="text-sm text-muted-foreground">מציג:</span>
              <button
                onClick={() => setSelectedCategory("all")}
                className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm hover:bg-primary/20 transition-colors"
              >
                {categories.find((c) => c.id === selectedCategory)?.name}
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">טוען עוגות...</p>
          </div>
        )}

        {/* Cake Grid */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCakes.map((cake) => (
              <div
                key={cake.id}
                className="group bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => handleCakeClick(cake)}
              >
                {/* Image Container */}
                <div className="relative aspect-square bg-muted overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                  <Image
                    src={cake.imageUrl}
                    alt={cake.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  {/* Order Button on Hover */}
                  <div className="absolute bottom-4 inset-x-4 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                    <Button className="w-full" size="sm">
                      <Heart className="w-4 h-4 ml-2" />
                      אני רוצה עוגה כזו
                    </Button>
                  </div>
                </div>


              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredCakes.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-foreground mb-2">
              לא נמצאו עוגות בקטגוריה זו
            </h3>
            <p className="text-muted-foreground mb-4">
              בחרו קטגוריה אחרת או צפו בכל העוגות
            </p>
            <Button
              variant="outline"
              onClick={() => setSelectedCategory("all")}
            >
              הצג הכל
            </Button>
          </div>
        )}
      </div>

      {/* Order Modal */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => {
          setIsOrderModalOpen(false)
          setSelectedCake(null)
        }}
        selectedCake={selectedCake}
      />
    </section>
  )
}
