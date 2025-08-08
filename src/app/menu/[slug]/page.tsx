import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import DigitalMenu from '@/components/menu/DigitalMenu'
import { prisma } from '@/lib/prisma'

interface MenuPageProps {
  params: {
    slug: string
  }
  searchParams: {
    lang?: string
    table?: string
  }
}

export async function generateMetadata({ params }: MenuPageProps): Promise<Metadata> {
  // In a real implementation, fetch restaurant data
  const restaurantSlug = params.slug
  
  // Mock restaurant data
  const restaurantName = "Restaurant Demo"
  
  return {
    title: `${restaurantName} - Digitale Speisekarte`,
    description: `Entdecken Sie die köstlichen Gerichte von ${restaurantName}. Hygienische digitale Speisekarte mit aktuellen Preisen und Allergenkennzeichnungen.`,
    openGraph: {
      title: `${restaurantName} - Digitale Speisekarte`,
      description: `Entdecken Sie die köstlichen Gerichte von ${restaurantName}`,
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function MenuPage({ params, searchParams }: MenuPageProps) {
  const { slug } = params
  const { lang = 'de', table } = searchParams

  // In a real implementation, fetch restaurant and menu data from database
  // const restaurant = await prisma.restaurant.findUnique({
  //   where: { slug },
  //   include: {
  //     menus: {
  //       include: {
  //         categories: {
  //           include: {
  //             items: {
  //               include: {
  //                 translations: true
  //               }
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }
  // })

  // For now, use mock data
  const mockRestaurant = {
    id: '1',
    name: 'Trattoria Bella Vista',
    description: 'Authentische italienische Küche im Herzen der Stadt',
    address: 'Musterstraße 123, 12345 Berlin',
    phone: '+49 30 12345678',
    website: 'https://bellavista.example.com',
    primaryColor: '#C8102E',
    secondaryColor: '#006233',
    template: 'modern',
    slug,
    menus: [
      {
        id: '1',
        name: 'Hauptspeisekarte',
        categories: [
          {
            id: '1',
            name: 'Antipasti',
            description: 'Italienische Vorspeisen',
            order: 0,
            items: [
              {
                id: '1',
                name: 'Bruschetta al Pomodoro',
                description: 'Geröstetes Brot mit frischen Tomaten, Basilikum und Knoblauch',
                price: 8.90,
                currency: 'EUR',
                image: null,
                allergens: ['gluten'],
                isAvailable: true,
                isVegetarian: true,
                isVegan: false,
                isGlutenFree: false,
                nutritionalInfo: {
                  calories: 180,
                  protein: 4,
                  carbs: 20,
                  fat: 8
                }
              },
              {
                id: '2',
                name: 'Antipasti della Casa',
                description: 'Hausgemachte Auswahl an italienischen Vorspeisen mit Oliven, Käse und Aufschnitt',
                price: 14.90,
                currency: 'EUR',
                image: null,
                allergens: ['laktose'],
                isAvailable: true,
                isVegetarian: true,
                isVegan: false,
                isGlutenFree: true,
                nutritionalInfo: {
                  calories: 420,
                  protein: 18,
                  carbs: 12,
                  fat: 32
                }
              }
            ]
          },
          {
            id: '2',
            name: 'Pasta & Risotto',
            description: 'Hausgemachte Pasta und cremige Risottos',
            order: 1,
            items: [
              {
                id: '3',
                name: 'Spaghetti Carbonara',
                description: 'Klassische römische Pasta mit Ei, Pecorino, Pancetta und schwarzem Pfeffer',
                price: 16.90,
                currency: 'EUR',
                image: null,
                allergens: ['gluten', 'ei', 'laktose'],
                isAvailable: true,
                isVegetarian: false,
                isVegan: false,
                isGlutenFree: false,
                nutritionalInfo: {
                  calories: 580,
                  protein: 28,
                  carbs: 65,
                  fat: 22
                }
              },
              {
                id: '4',
                name: 'Risotto ai Funghi Porcini',
                description: 'Cremiges Risotto mit Steinpilzen, Parmesan und frischen Kräutern',
                price: 18.90,
                currency: 'EUR',
                image: null,
                allergens: ['laktose'],
                isAvailable: true,
                isVegetarian: true,
                isVegan: false,
                isGlutenFree: true,
                nutritionalInfo: {
                  calories: 480,
                  protein: 16,
                  carbs: 68,
                  fat: 14
                }
              },
              {
                id: '5',
                name: 'Linguine alle Vongole',
                description: 'Linguine mit frischen Venusmuscheln in Weißwein-Knoblauch-Sauce',
                price: 22.90,
                currency: 'EUR',
                image: null,
                allergens: ['gluten', 'mollusken'],
                isAvailable: false,
                isVegetarian: false,
                isVegan: false,
                isGlutenFree: false,
                nutritionalInfo: {
                  calories: 520,
                  protein: 24,
                  carbs: 58,
                  fat: 18
                }
              }
            ]
          },
          {
            id: '3',
            name: 'Secondi Piatti',
            description: 'Hauptgerichte mit Fleisch und Fisch',
            order: 2,
            items: [
              {
                id: '6',
                name: 'Osso Buco alla Milanese',
                description: 'Geschmorte Kalbshaxe mit Risotto und Gremolata',
                price: 28.90,
                currency: 'EUR',
                image: null,
                allergens: ['laktose'],
                isAvailable: true,
                isVegetarian: false,
                isVegan: false,
                isGlutenFree: true,
                nutritionalInfo: {
                  calories: 680,
                  protein: 42,
                  carbs: 35,
                  fat: 38
                }
              },
              {
                id: '7',
                name: 'Branzino in Crosta di Sale',
                description: 'Wolfsbarsch in Salzkruste mit mediterranem Gemüse',
                price: 26.90,
                currency: 'EUR',
                image: null,
                allergens: ['fisch'],
                isAvailable: true,
                isVegetarian: false,
                isVegan: false,
                isGlutenFree: true,
                nutritionalInfo: {
                  calories: 380,
                  protein: 45,
                  carbs: 8,
                  fat: 18
                }
              }
            ]
          },
          {
            id: '4',
            name: 'Dolci',
            description: 'Italienische Desserts',
            order: 3,
            items: [
              {
                id: '8',
                name: 'Tiramisù della Casa',
                description: 'Hausgemachtes Tiramisù mit Mascarpone und starkem Espresso',
                price: 7.90,
                currency: 'EUR',
                image: null,
                allergens: ['ei', 'laktose', 'gluten'],
                isAvailable: true,
                isVegetarian: true,
                isVegan: false,
                isGlutenFree: false,
                nutritionalInfo: {
                  calories: 320,
                  protein: 8,
                  carbs: 28,
                  fat: 20
                }
              },
              {
                id: '9',
                name: 'Panna Cotta ai Frutti di Bosco',
                description: 'Seidige Panna Cotta mit frischen Waldbeeren',
                price: 6.90,
                currency: 'EUR',
                image: null,
                allergens: ['laktose'],
                isAvailable: true,
                isVegetarian: true,
                isVegan: false,
                isGlutenFree: true,
                nutritionalInfo: {
                  calories: 280,
                  protein: 4,
                  carbs: 24,
                  fat: 18
                }
              }
            ]
          }
        ]
      }
    ]
  }

  if (!mockRestaurant) {
    notFound()
  }

  return (
    <DigitalMenu 
      restaurant={mockRestaurant} 
      selectedLanguage={lang}
      tableNumber={table}
    />
  )
}