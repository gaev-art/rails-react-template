import { useNavigate } from "react-router-dom"

import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card"
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials"
import { AnimatedTooltip } from "@/components/ui/animated-tooltip"
import { BackgroundBeams } from "@/components/ui/background-beams"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CometCard } from "@/components/ui/comet-card"
import { ContainerScroll } from "@/components/ui/container-scroll-animation"
import {
  GlowingStarsBackgroundCard,
  GlowingStarsDescription,
  GlowingStarsTitle,
} from "@/components/ui/glowing-stars"
import { PixelatedCanvas } from "@/components/ui/pixelated-canvas"
import { Spotlight } from "@/components/ui/spotlight"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TextRevealCard } from "@/components/ui/text-reveal-card"

export default function AnimatedPage() {
  const navigate = useNavigate()

  const people = [
    {
      id: 1,
      name: "John Doe",
      designation: "Software Engineer",
      image: "https://picsum.photos/200/200?random=1",
    },
    {
      id: 2,
      name: "Robert Johnson",
      designation: "Product Manager",
      image: "https://picsum.photos/200/200?random=2",
    },
    {
      id: 3,
      name: "Jane Smith",
      designation: "Data Scientist",
      image: "https://picsum.photos/200/200?random=3",
    },
    {
      id: 4,
      name: "Emily Davis",
      designation: "UX Designer",
      image: "https://picsum.photos/200/200?random=4",
    },
  ]

  const testimonials = [
    {
      quote:
        "This project changed my view on modern UI components. The animations are simply amazing!",
      name: "Alexey Petrov",
      designation: "Frontend Developer",
      src: "https://picsum.photos/300/300?random=10",
    },
    {
      quote:
        "Aceternity UI provides incredibly beautiful components. I recommend it to everyone!",
      name: "Maria Sidorova",
      designation: "UI/UX Designer",
      src: "https://picsum.photos/300/300?random=11",
    },
    {
      quote:
        "The best library of animated components for React. Very easy to use!",
      name: "Dmitry Kozlov",
      designation: "Full Stack Developer",
      src: "https://picsum.photos/300/300?random=12",
    },
  ]

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Spotlight Background */}
      <div className="relative">
        <Spotlight
          className="-top-40 left-0 md:-top-20 md:left-60"
          fill="white"
        />
        <div className="mx-auto max-w-7xl px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24">
          <div className="mb-8 text-center">
            <h1 className="mb-4 text-4xl font-bold">
              ✨ Aceternity Animated Components
            </h1>
            <p className="text-muted-foreground mb-6 text-lg">
              Modern animated UI components for React
            </p>
            <Button
              onClick={() => navigate("/")}
              variant="outline"
              className="gap-2"
            >
              ← Back to main page
            </Button>
          </div>

          <Tabs defaultValue="cards" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="cards">🎴 Cards</TabsTrigger>
              <TabsTrigger value="testimonials">💬 Testimonials</TabsTrigger>
              <TabsTrigger value="effects">✨ Effects</TabsTrigger>
              <TabsTrigger value="comet">☄️ Comet</TabsTrigger>
              <TabsTrigger value="backgrounds">🌌 Backgrounds</TabsTrigger>
            </TabsList>

            <TabsContent value="cards" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    🎴 3D Cards
                    <Badge variant="outline">Aceternity</Badge>
                  </CardTitle>
                  <CardDescription>
                    Cards with 3D effects and animations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <CardContainer className="group h-96 w-full cursor-pointer">
                      <CardBody className="bg-card border-border relative h-96 w-full rounded-xl border p-6 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-purple-500/20">
                        <CardItem
                          translateZ="50"
                          className="text-2xl font-bold text-neutral-700 transition-all duration-300 group-hover:text-purple-600 dark:text-white dark:group-hover:text-purple-400"
                        >
                          ✨ Animated Card
                        </CardItem>
                        <CardItem
                          as="p"
                          translateZ="60"
                          className="mt-4 max-w-sm text-sm text-neutral-600 transition-all duration-300 group-hover:text-neutral-700 dark:text-neutral-300 dark:group-hover:text-neutral-200"
                        >
                          Beautiful 3D card with smooth animations and hover
                          effects
                        </CardItem>
                        <CardItem translateZ="40" className="mt-6">
                          <div className="h-3 w-full rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 group-hover:h-4 group-hover:from-purple-600 group-hover:to-pink-600"></div>
                        </CardItem>
                        <CardItem translateZ="30" className="mt-4">
                          <div className="flex gap-2">
                            <div className="h-2 w-2 animate-pulse rounded-full bg-purple-500"></div>
                            <div className="h-2 w-2 animate-pulse rounded-full bg-pink-500 delay-100"></div>
                            <div className="h-2 w-2 animate-pulse rounded-full bg-purple-500 delay-200"></div>
                          </div>
                        </CardItem>
                      </CardBody>
                    </CardContainer>

                    <CardContainer className="group h-96 w-full cursor-pointer">
                      <CardBody className="bg-card border-border relative h-96 w-full rounded-xl border p-6 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-blue-500/20">
                        <CardItem
                          translateZ="50"
                          className="text-2xl font-bold text-neutral-700 transition-all duration-300 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400"
                        >
                          🚀 Interactive Card
                        </CardItem>
                        <CardItem
                          as="p"
                          translateZ="60"
                          className="mt-4 max-w-sm text-sm text-neutral-600 transition-all duration-300 group-hover:text-neutral-700 dark:text-neutral-300 dark:group-hover:text-neutral-200"
                        >
                          Card with interactive elements and animated
                          transitions
                        </CardItem>
                        <CardItem translateZ="40" className="mt-6">
                          <div className="h-3 w-full rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300 group-hover:h-4 group-hover:from-blue-600 group-hover:to-cyan-600"></div>
                        </CardItem>
                        <CardItem translateZ="30" className="mt-4">
                          <div className="flex gap-2">
                            <div className="h-2 w-2 animate-bounce rounded-full bg-blue-500"></div>
                            <div className="h-2 w-2 animate-bounce rounded-full bg-cyan-500 delay-100"></div>
                            <div className="h-2 w-2 animate-bounce rounded-full bg-blue-500 delay-200"></div>
                          </div>
                        </CardItem>
                      </CardBody>
                    </CardContainer>

                    <CardContainer className="group h-96 w-full cursor-pointer">
                      <CardBody className="bg-card border-border relative h-96 w-full rounded-xl border p-6 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-green-500/20">
                        <CardItem
                          translateZ="50"
                          className="text-2xl font-bold text-neutral-700 transition-all duration-300 group-hover:text-green-600 dark:text-white dark:group-hover:text-green-400"
                        >
                          🌟 Dynamic Card
                        </CardItem>
                        <CardItem
                          as="p"
                          translateZ="60"
                          className="mt-4 max-w-sm text-sm text-neutral-600 transition-all duration-300 group-hover:text-neutral-700 dark:text-neutral-300 dark:group-hover:text-neutral-200"
                        >
                          Card with dynamic effects and smooth animations
                        </CardItem>
                        <CardItem translateZ="40" className="mt-6">
                          <div className="h-3 w-full rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-300 group-hover:h-4 group-hover:from-green-600 group-hover:to-emerald-600"></div>
                        </CardItem>
                        <CardItem translateZ="30" className="mt-4">
                          <div className="flex gap-2">
                            <div className="h-2 w-2 animate-ping rounded-full bg-green-500"></div>
                            <div className="h-2 w-2 animate-ping rounded-full bg-emerald-500 delay-100"></div>
                            <div className="h-2 w-2 animate-ping rounded-full bg-green-500 delay-200"></div>
                          </div>
                        </CardItem>
                      </CardBody>
                    </CardContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    📝 Text Cards
                    <Badge variant="secondary">Text Reveal</Badge>
                  </CardTitle>
                  <CardDescription>
                    Cards with animated text appearance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <TextRevealCard
                      text="Did you know that animations make the interface more alive?"
                      revealText="Animations improve user experience!"
                    >
                      <div className="h-96 w-full rounded-lg bg-gradient-to-br from-violet-500 to-pink-500" />
                    </TextRevealCard>

                    <TextRevealCard
                      text="Modern UI libraries offer"
                      revealText="Amazing ready-to-use components!"
                    >
                      <div className="h-96 w-full rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500" />
                    </TextRevealCard>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="testimonials" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    💬 Animated Testimonials
                    <Badge variant="outline">Testimonials</Badge>
                  </CardTitle>
                  <CardDescription>
                    Beautiful animated testimonials with auto-scroll
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AnimatedTestimonials
                    testimonials={testimonials}
                    autoplay={true}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="effects" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    ✨ Animated Tooltips
                    <Badge variant="outline">Tooltip</Badge>
                  </CardTitle>
                  <CardDescription>
                    Beautiful animated tooltips for elements
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4">
                    <AnimatedTooltip items={people} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    🌟 Glowing Stars
                    <Badge variant="secondary">Glowing Stars</Badge>
                  </CardTitle>
                  <CardDescription>Animated glowing stars</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <GlowingStarsBackgroundCard className="h-64 w-full">
                      <GlowingStarsTitle className="text-2xl font-bold text-white">
                        Glowing Stars
                      </GlowingStarsTitle>
                      <GlowingStarsDescription className="text-white/80">
                        Beautiful animated stars
                      </GlowingStarsDescription>
                    </GlowingStarsBackgroundCard>

                    <GlowingStarsBackgroundCard className="h-64 w-full">
                      <GlowingStarsTitle className="text-2xl font-bold text-white">
                        Fast Stars
                      </GlowingStarsTitle>
                      <GlowingStarsDescription className="text-white/80">
                        Amazing animations
                      </GlowingStarsDescription>
                    </GlowingStarsBackgroundCard>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="comet" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    ☄️ Comet Card
                    <Badge variant="outline">Comet</Badge>
                  </CardTitle>
                  <CardDescription>
                    Beautiful cards with comet effect
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <CometCard className="h-64 w-full">
                      <div className="relative h-full w-full overflow-hidden rounded-lg">
                        <img
                          src="https://picsum.photos/400/300?random=20"
                          alt="Space Journey"
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-4 left-4 text-white">
                          <h3 className="text-xl font-bold">Space Journey</h3>
                          <p className="text-sm opacity-90">
                            Embark on an amazing journey through the galaxy
                          </p>
                        </div>
                      </div>
                    </CometCard>
                    <CometCard className="h-64 w-full">
                      <div className="relative h-full w-full overflow-hidden rounded-lg">
                        <img
                          src="https://picsum.photos/400/300?random=21"
                          alt="Starry Sky"
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-4 left-4 text-white">
                          <h3 className="text-xl font-bold">Starry Sky</h3>
                          <p className="text-sm opacity-90">
                            Enjoy the beauty of the starry sky
                          </p>
                        </div>
                      </div>
                    </CometCard>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    🎨 Pixelated Canvas
                    <Badge variant="secondary">Pixel Art</Badge>
                  </CardTitle>
                  <CardDescription>
                    Pixelated animation with beautiful effects
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-96 w-full">
                    <PixelatedCanvas
                      className="h-full w-full"
                      src="https://picsum.photos/600/400?random=30"
                      cellSize={8}
                      dotScale={0.6}
                      interactive={true}
                      distortionStrength={20}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    📜 Container Scroll Animation
                    <Badge variant="outline">Scroll</Badge>
                  </CardTitle>
                  <CardDescription>
                    Animations on container scroll
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ContainerScroll
                    titleComponent={
                      <h2 className="text-center text-2xl font-bold">
                        Our Team
                      </h2>
                    }
                  >
                    <div className="flex gap-4 overflow-x-auto pb-4">
                      {people.map((person) => (
                        <div
                          key={person.id}
                          className="w-48 flex-shrink-0 text-center"
                        >
                          <div className="relative mb-4">
                            <img
                              src={person.image}
                              alt={person.name}
                              className="mx-auto h-32 w-32 rounded-full object-cover"
                            />
                            <div className="absolute inset-0 rounded-full bg-gradient-to-t from-purple-500/20 to-transparent" />
                          </div>
                          <h3 className="text-lg font-bold">{person.name}</h3>
                          <p className="text-muted-foreground text-sm">
                            {person.designation}
                          </p>
                        </div>
                      ))}
                    </div>
                  </ContainerScroll>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="backgrounds" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    🌌 Анимированные фоны
                    <Badge variant="secondary">Background Beams</Badge>
                  </CardTitle>
                  <CardDescription>
                    Beautiful animated background effects
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative h-96 w-full overflow-hidden rounded-lg">
                    <BackgroundBeams />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <h3 className="mb-4 text-3xl font-bold text-white">
                          Animated Background
                        </h3>
                        <p className="text-white/80">
                          Beautiful light rays in motion
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
