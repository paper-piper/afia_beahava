import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export const dynamic = 'force-dynamic'

const categories = [
  { id: "all", name: "כל המתוקים" },
  { id: "boys-birthday", name: "עוגות יום הולדת בנים" },
  { id: "girls-birthday", name: "עוגות יום הולדת בנות" },
  { id: "adults-birthday", name: "עוגות יום הולדת מבוגרים" },
  { id: "brit", name: "עוגות לברית/בריתה" },
  { id: "smash-cake", name: "סמאש קייק" },
  { id: "bachelor", name: "עוגות למסיבת רווקים/רווקות" },
  { id: "anniversary", name: "עוגות ליום נישואין" },
  { id: "army", name: "עוגות למסיבת גיוס/שחרור" },
  { id: "chocolate-eggs", name: "ביצי שוקולד" },
  { id: "cupcakes", name: "קאפקייקס" },
  { id: "bar-mitzvah", name: "עוגות בר מצווה" },
  { id: "bat-mitzvah", name: "עוגות בת מצווה" },
  { id: "wedding", name: "עוגות חתונה" },
  { id: "rosh-hashana", name: "עוגות לראש השנה" },
  { id: "valentines", name: "עוגות ליום האהבה" },
  { id: "shavuot", name: "עוגות לשבועות" },
  { id: "other", name: "שונות" },
  { id: "gift-boxes", name: "מארזים מתוקים" },
]

// Match folder name to category using "starts with" logic
function findCategoryForFolder(folderName: string) {
  // First try exact match
  let category = categories.find(cat => cat.name === folderName)
  if (category) return category

  // Then try "starts with" match (for folders without "/" in name)
  category = categories.find(cat => cat.name.startsWith(folderName))
  if (category) return category

  // Default to "other" category
  return categories.find(cat => cat.id === 'other')!
}

export async function GET() {
  try {
    const cakesDir = path.join(process.cwd(), 'public', 'cakes')
    
    // Check if directory exists
    if (!fs.existsSync(cakesDir)) {
      return NextResponse.json({ cakes: [], categories })
    }

    const folders = fs.readdirSync(cakesDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)

    const cakes: Array<{
      id: string
      name: string
      category: string
      categoryName: string
      description: string
      imageUrl: string
    }> = []

    let cakeId = 1

    for (const folder of folders) {
      const category = findCategoryForFolder(folder)
      if (!category || category.id === 'all') continue

      const folderPath = path.join(cakesDir, folder)
      const files = fs.readdirSync(folderPath)
        .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))

      for (const file of files) {
        const fileName = path.parse(file).name
        cakes.push({
          id: String(cakeId++),
          name: fileName.replace(/[-_]/g, ' '),
          category: category.id,
          categoryName: category.name,
          description: `${category.name} - עוגה מעוצבת בהתאמה אישית`,
          imageUrl: `/cakes/${encodeURIComponent(folder)}/${encodeURIComponent(file)}`,
        })
      }
    }

    return NextResponse.json({ cakes, categories })
  } catch (error) {
    console.error('Error loading cakes:', error)
    return NextResponse.json({ cakes: [], categories, error: 'Failed to load cakes' })
  }
}
