import { Button } from "@/components/ui/button"
import { useTheme } from "@/hooks/useTheme"

export default function SimplePage() {
  const { theme, toggleTheme, isInitialized } = useTheme()
  return (
    <div className="bg-background text-foreground min-h-screen p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-foreground mb-4 text-4xl font-bold">
            🎉 Rails + React Integration
          </h1>
          {isInitialized && (
            <div className="mb-4">
              <Button onClick={toggleTheme} variant="outline" className="gap-2">
                {theme === "light" ? "🌙" : "☀️"}
                Переключить на {theme === "light" ? "темную" : "светлую"} тему
              </Button>
            </div>
          )}
        </div>

        <div className="border-border bg-card mb-8 rounded-lg border p-6 shadow-lg">
          <h2 className="text-card-foreground mb-4 text-2xl font-semibold">
            🎨 Стандартные цвета Tailwind CSS
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-lg bg-blue-500 p-4 text-white">
              <h3 className="font-semibold">Primary</h3>
              <p>bg-blue-500 text-white</p>
            </div>
            <div className="rounded-lg bg-gray-200 p-4 text-gray-800">
              <h3 className="font-semibold">Secondary</h3>
              <p>bg-gray-200 text-gray-800</p>
            </div>
            <div className="rounded-lg bg-purple-500 p-4 text-white">
              <h3 className="font-semibold">Accent</h3>
              <p>bg-purple-500 text-white</p>
            </div>
            <div className="rounded-lg bg-gray-100 p-4 text-gray-600">
              <h3 className="font-semibold">Muted</h3>
              <p>bg-gray-100 text-gray-600</p>
            </div>
            <div className="rounded-lg bg-red-500 p-4 text-white">
              <h3 className="font-semibold">Destructive</h3>
              <p>bg-red-500 text-white</p>
            </div>
            <div className="rounded-lg border-2 border-gray-300 p-4">
              <h3 className="font-semibold">Border</h3>
              <p>border-gray-300</p>
            </div>
          </div>
        </div>

        <div className="border-border bg-card mb-8 rounded-lg border p-6 shadow-lg">
          <h2 className="text-card-foreground mb-4 text-2xl font-semibold">
            🎨 Цвета shadcn/ui с CSS переменными (через Tailwind)
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="bg-primary text-primary-foreground rounded-lg p-4">
              <h3 className="font-semibold">Primary</h3>
              <p>bg-primary text-primary-foreground</p>
            </div>
            <div className="bg-secondary text-secondary-foreground rounded-lg p-4">
              <h3 className="font-semibold">Secondary</h3>
              <p>bg-secondary text-secondary-foreground</p>
            </div>
            <div className="bg-accent text-accent-foreground rounded-lg p-4">
              <h3 className="font-semibold">Accent</h3>
              <p>bg-accent text-accent-foreground</p>
            </div>
            <div className="bg-muted text-muted-foreground rounded-lg p-4">
              <h3 className="font-semibold">Muted</h3>
              <p>bg-muted text-muted-foreground</p>
            </div>
            <div className="bg-destructive text-destructive-foreground rounded-lg p-4">
              <h3 className="font-semibold">Destructive</h3>
              <p>bg-destructive text-destructive-foreground</p>
            </div>
            <div className="border-border rounded-lg border-2 p-4">
              <h3 className="font-semibold">Border</h3>
              <p>border-border</p>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-card-foreground mb-4 font-semibold">
              Shadcn Button Components:
            </h4>
            <div className="flex flex-wrap gap-3">
              <Button variant="default">Default</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button size="icon">🚀</Button>
            </div>
          </div>
        </div>

        <div className="border-border bg-card mb-8 rounded-lg border p-6 shadow-lg">
          <h2 className="text-card-foreground mb-4 text-2xl font-semibold">
            🌙 Демонстрация темной темы
          </h2>
          <p className="text-muted-foreground mb-4">
            Используйте кнопку выше для переключения темы. Все цвета
            автоматически адаптируются благодаря CSS переменным.
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="bg-primary text-primary-foreground rounded-lg p-4">
              <h3 className="font-semibold">Primary</h3>
              <p>Адаптируется к теме</p>
            </div>
            <div className="bg-secondary text-secondary-foreground rounded-lg p-4">
              <h3 className="font-semibold">Secondary</h3>
              <p>Адаптируется к теме</p>
            </div>
            <div className="bg-muted text-muted-foreground rounded-lg p-4">
              <h3 className="font-semibold">Muted</h3>
              <p>Адаптируется к теме</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
