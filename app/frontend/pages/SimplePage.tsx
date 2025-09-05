import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTheme } from "@/hooks/useTheme"

export default function SimplePage() {
  const { theme, toggleTheme, isInitialized } = useTheme()
  const navigate = useNavigate()
  const [progress, setProgress] = useState(0)
  const [sliderValue, setSliderValue] = useState([50])
  const [isChecked, setIsChecked] = useState(false)
  const [isSwitchOn, setIsSwitchOn] = useState(false)

  // Progress animation
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 10))
    }, 500)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="bg-background text-foreground min-h-screen p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-foreground mb-4 text-4xl font-bold">
            🎉 Rails + React Integration
          </h1>
          <div className="mb-6 flex flex-wrap justify-center gap-4">
            {isInitialized && (
              <Button onClick={toggleTheme} variant="outline" className="gap-2">
                {theme === "light" ? "🌙" : "☀️"}
                Switch to {theme === "light" ? "dark" : "light"} theme
              </Button>
            )}
            <Button
              onClick={() => navigate("/components")}
              variant="default"
              className="gap-2"
            >
              🧩 Shadcn Components
            </Button>
            <Button
              onClick={() => navigate("/animated")}
              variant="secondary"
              className="gap-2"
            >
              ✨ Animated Aceternity
            </Button>
          </div>
        </div>

        <Tabs defaultValue="colors" className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="colors">🎨 Colors</TabsTrigger>
            <TabsTrigger value="components">🧩 Components</TabsTrigger>
            <TabsTrigger value="interactive">⚡ Interactive</TabsTrigger>
          </TabsList>

          <TabsContent value="colors" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🎨 shadcn/ui Color Palette
                  <Badge variant="secondary" className="animate-pulse">
                    Animated
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Semantic colors with automatic adaptation to light/dark theme
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card className="bg-primary text-primary-foreground transition-all duration-500 hover:scale-105 hover:shadow-lg">
                    <CardContent className="p-4">
                      <h3 className="font-semibold">Primary</h3>
                      <p className="text-sm opacity-90">
                        bg-primary text-primary-foreground
                      </p>
                      <Badge variant="outline" className="mt-2 text-xs">
                        Primary color
                      </Badge>
                    </CardContent>
                  </Card>
                  <Card className="bg-secondary text-secondary-foreground transition-all duration-500 hover:scale-105 hover:shadow-lg">
                    <CardContent className="p-4">
                      <h3 className="font-semibold">Secondary</h3>
                      <p className="text-sm opacity-90">
                        bg-secondary text-secondary-foreground
                      </p>
                      <Badge variant="outline" className="mt-2 text-xs">
                        Secondary color
                      </Badge>
                    </CardContent>
                  </Card>
                  <Card className="bg-accent text-accent-foreground transition-all duration-500 hover:scale-105 hover:shadow-lg">
                    <CardContent className="p-4">
                      <h3 className="font-semibold">Accent</h3>
                      <p className="text-sm opacity-90">
                        bg-accent text-accent-foreground
                      </p>
                      <Badge variant="outline" className="mt-2 text-xs">
                        Accent color
                      </Badge>
                    </CardContent>
                  </Card>
                  <Card className="bg-muted text-muted-foreground transition-all duration-500 hover:scale-105 hover:shadow-lg">
                    <CardContent className="p-4">
                      <h3 className="font-semibold">Muted</h3>
                      <p className="text-sm opacity-90">
                        bg-muted text-muted-foreground
                      </p>
                      <Badge variant="outline" className="mt-2 text-xs">
                        Muted
                      </Badge>
                    </CardContent>
                  </Card>
                  <Card className="bg-destructive text-destructive-foreground transition-all duration-500 hover:scale-105 hover:shadow-lg">
                    <CardContent className="p-4">
                      <h3 className="font-semibold">Destructive</h3>
                      <p className="text-sm opacity-90">
                        bg-destructive text-destructive-foreground
                      </p>
                      <Badge variant="outline" className="mt-2 text-xs">
                        Destructive actions
                      </Badge>
                    </CardContent>
                  </Card>
                  <Card className="border-border border-2 transition-all duration-500 hover:scale-105 hover:shadow-lg">
                    <CardContent className="p-4">
                      <h3 className="font-semibold">Border</h3>
                      <p className="text-muted-foreground text-sm">
                        border-border
                      </p>
                      <Badge variant="outline" className="mt-2 text-xs">
                        Borders
                      </Badge>
                    </CardContent>
                  </Card>
                  <Card className="bg-card text-card-foreground border-border border transition-all duration-500 hover:scale-105 hover:shadow-lg">
                    <CardContent className="p-4">
                      <h3 className="font-semibold">Card</h3>
                      <p className="text-sm opacity-90">
                        bg-card text-card-foreground
                      </p>
                      <Badge variant="outline" className="mt-2 text-xs">
                        Cards
                      </Badge>
                    </CardContent>
                  </Card>
                  <Card className="bg-popover text-popover-foreground border-border border transition-all duration-500 hover:scale-105 hover:shadow-lg">
                    <CardContent className="p-4">
                      <h3 className="font-semibold">Popover</h3>
                      <p className="text-sm opacity-90">
                        bg-popover text-popover-foreground
                      </p>
                      <Badge variant="outline" className="mt-2 text-xs">
                        Popovers
                      </Badge>
                    </CardContent>
                  </Card>
                  <Card className="bg-background text-foreground border-border border transition-all duration-500 hover:scale-105 hover:shadow-lg">
                    <CardContent className="p-4">
                      <h3 className="font-semibold">Background</h3>
                      <p className="text-sm opacity-90">
                        bg-background text-foreground
                      </p>
                      <Badge variant="outline" className="mt-2 text-xs">
                        Main background
                      </Badge>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-muted mt-6 rounded-lg p-4">
                  <h4 className="text-muted-foreground mb-2 font-semibold">
                    💡 Benefits of shadcn colors:
                  </h4>
                  <ul className="text-muted-foreground space-y-1 text-sm">
                    <li>• Automatic adaptation to light/dark theme</li>
                    <li>• Semantic names for better code readability</li>
                    <li>• Consistency throughout the application</li>
                    <li>• Optimal contrast for accessibility</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="components" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🧩 Shadcn UI Components
                  <Badge variant="outline">Demo</Badge>
                </CardTitle>
                <CardDescription>
                  Different button variants and their sizes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="mb-4 font-semibold">Button variants:</h4>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="default">Default</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="link">Link</Button>
                  </div>
                </div>
                <Separator />
                <div>
                  <h4 className="mb-4 font-semibold">Button sizes:</h4>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button size="sm">Small</Button>
                    <Button size="default">Default</Button>
                    <Button size="lg">Large</Button>
                    <Button size="icon">🚀</Button>
                  </div>
                </div>
                <Separator />
                <div>
                  <h4 className="mb-4 font-semibold">Badges:</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge>Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                    <Badge variant="outline">Outline</Badge>
                  </div>
                </div>
                <Separator />
                <div>
                  <h4 className="mb-4 font-semibold">Avatar:</h4>
                  <div className="flex gap-4">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Avatar>
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="interactive" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  ⚡ Interactive Elements
                  <Badge variant="destructive" className="animate-bounce">
                    Live
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Animated and interactive components
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="mb-4 font-semibold">Animated progress:</h4>
                  <div className="space-y-2">
                    <Progress value={progress} className="w-full" />
                    <p className="text-muted-foreground text-sm">
                      Current progress: {progress}%
                    </p>
                  </div>
                </div>
                <Separator />
                <div>
                  <h4 className="mb-4 font-semibold">Slider:</h4>
                  <div className="space-y-2">
                    <Slider
                      value={sliderValue}
                      onValueChange={setSliderValue}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                    <p className="text-muted-foreground text-sm">
                      Value: {sliderValue[0]}
                    </p>
                  </div>
                </div>
                <Separator />
                <div>
                  <h4 className="mb-4 font-semibold">Checkbox and switch:</h4>
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="terms"
                        checked={isChecked}
                        onCheckedChange={(checked) =>
                          setIsChecked(checked === true)
                        }
                      />
                      <label
                        htmlFor="terms"
                        className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Agree to terms
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="airplane-mode"
                        checked={isSwitchOn}
                        onCheckedChange={setIsSwitchOn}
                      />
                      <label
                        htmlFor="airplane-mode"
                        className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Airplane mode
                      </label>
                    </div>
                  </div>
                </div>
                <Separator />
                <Alert>
                  <AlertTitle>Notification</AlertTitle>
                  <AlertDescription>
                    This is an example notification using the Alert component.
                    Checkbox state: {isChecked ? "enabled" : "disabled"},
                    switch: {isSwitchOn ? "enabled" : "disabled"}.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🌙 Theme Adaptation
              <Badge variant="outline" className="animate-pulse">
                Automatic
              </Badge>
            </CardTitle>
            <CardDescription>
              All shadcn colors automatically adapt to light/dark theme
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="bg-primary text-primary-foreground rounded-lg p-4 transition-all duration-300">
                <h3 className="font-semibold">Primary</h3>
                <p className="text-sm opacity-90">Changes automatically</p>
              </div>
              <div className="bg-secondary text-secondary-foreground rounded-lg p-4 transition-all duration-300">
                <h3 className="font-semibold">Secondary</h3>
                <p className="text-sm opacity-90">Changes automatically</p>
              </div>
              <div className="bg-muted text-muted-foreground rounded-lg p-4 transition-all duration-300">
                <h3 className="font-semibold">Muted</h3>
                <p className="text-sm opacity-90">Changes automatically</p>
              </div>
            </div>
            <div className="bg-accent mt-4 rounded-lg p-4">
              <p className="text-accent-foreground text-sm">
                💡 Switch the theme with the button above to see how all colors
                smoothly adapt to the new theme!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
