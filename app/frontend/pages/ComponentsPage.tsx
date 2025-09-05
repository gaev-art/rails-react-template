import { format } from "date-fns"
import { enUS } from "date-fns/locale"
import { CalendarIcon, ChevronDown, Menu, User } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

export default function ComponentsPage() {
  const navigate = useNavigate()
  const [progress, setProgress] = useState(33)
  const [sliderValue, setSliderValue] = useState([50])
  const [isChecked, setIsChecked] = useState(false)
  const [isSwitchOn, setIsSwitchOn] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [textareaValue, setTextareaValue] = useState("")
  const [selectedValue, setSelectedValue] = useState("")
  const [date, setDate] = useState<Date>()

  return (
    <div className="bg-background text-foreground min-h-screen p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <h1 className="text-foreground mb-4 text-4xl font-bold">
            🧩 Shadcn UI Components
          </h1>
          <p className="text-muted-foreground mb-6 text-lg">
            Complete demonstration of all available components
          </p>
          <Button
            onClick={() => navigate("/")}
            variant="outline"
            className="gap-2"
          >
            ← Back to main page
          </Button>
        </div>

        <Tabs defaultValue="forms" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="forms">📝 Forms</TabsTrigger>
            <TabsTrigger value="data">📊 Data</TabsTrigger>
            <TabsTrigger value="feedback">💬 Feedback</TabsTrigger>
            <TabsTrigger value="navigation">🧭 Navigation</TabsTrigger>
          </TabsList>

          <TabsContent value="forms" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  📝 Forms and Data Input
                  <Badge variant="outline">Interactive</Badge>
                </CardTitle>
                <CardDescription>
                  Components for creating forms and data input
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Input fields:</h4>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Enter your message..."
                        value={textareaValue}
                        onChange={(e) => setTextareaValue(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Select option</Label>
                      <Select
                        value={selectedValue}
                        onValueChange={setSelectedValue}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="option1">Option 1</SelectItem>
                          <SelectItem value="option2">Option 2</SelectItem>
                          <SelectItem value="option3">Option 3</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold">Controls:</h4>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="terms2"
                          checked={isChecked}
                          onCheckedChange={(checked) =>
                            setIsChecked(checked === true)
                          }
                        />
                        <Label htmlFor="terms2">Agree to terms</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="notifications"
                          checked={isSwitchOn}
                          onCheckedChange={setIsSwitchOn}
                        />
                        <Label htmlFor="notifications">Notifications</Label>
                      </div>
                      <div className="space-y-2">
                        <Label>Slider: {sliderValue[0]}</Label>
                        <Slider
                          value={sliderValue}
                          onValueChange={setSliderValue}
                          max={100}
                          step={1}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="data" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  📊 Data Display
                  <Badge variant="secondary">Visualization</Badge>
                </CardTitle>
                <CardDescription>
                  Components for data display and visualization
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Progress and indicators:</h4>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm">
                          Loading progress: {progress}%
                        </Label>
                        <Progress value={progress} className="mt-2" />
                        <div className="mt-2 flex gap-2">
                          <Button
                            size="sm"
                            onClick={() =>
                              setProgress(Math.max(0, progress - 10))
                            }
                          >
                            -10%
                          </Button>
                          <Button
                            size="sm"
                            onClick={() =>
                              setProgress(Math.min(100, progress + 10))
                            }
                          >
                            +10%
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold">Avatars and badges:</h4>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src="https://github.com/shadcn.png" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <Avatar>
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <Avatar>
                          <AvatarFallback>AB</AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Badge>Default</Badge>
                        <Badge variant="secondary">Secondary</Badge>
                        <Badge variant="destructive">Destructive</Badge>
                        <Badge variant="outline">Outline</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="feedback" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  💬 Feedback
                  <Badge variant="destructive">Important</Badge>
                </CardTitle>
                <CardDescription>
                  Components for notifications and feedback
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Alert>
                    <AlertTitle>Information notification</AlertTitle>
                    <AlertDescription>
                      This is a regular information notification.
                    </AlertDescription>
                  </Alert>

                  <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                      An error occurred while performing the operation.
                    </AlertDescription>
                  </Alert>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-semibold">Dialogs and modal windows:</h4>
                  <div className="flex gap-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">Open dialog</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Dialog example</DialogTitle>
                          <DialogDescription>
                            This is an example of a modal dialog using
                            shadcn/ui.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="py-4">
                          <p>Dialog content can be anything.</p>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date
                            ? format(date, "PPP", { locale: enUS })
                            : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="navigation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🧭 Navigation
                  <Badge variant="outline">Menu</Badge>
                </CardTitle>
                <CardDescription>
                  Components for navigation and menus
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Dropdown menus:</h4>
                  <div className="flex gap-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                          <User className="mr-2 h-4 w-4" />
                          Profile
                          <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>My account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuItem>Logout</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                          <Menu className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>Home</DropdownMenuItem>
                        <DropdownMenuItem>About</DropdownMenuItem>
                        <DropdownMenuItem>Contact</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-semibold">Tabs:</h4>
                  <Tabs defaultValue="tab1" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                      <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                      <TabsTrigger value="tab3">Tab 3</TabsTrigger>
                    </TabsList>
                    <TabsContent value="tab1" className="mt-4">
                      <Card>
                        <CardHeader>
                          <CardTitle>Tab 1 content</CardTitle>
                          <CardDescription>
                            This is the content of the first tab.
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p>Any content can be here.</p>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    <TabsContent value="tab2" className="mt-4">
                      <Card>
                        <CardHeader>
                          <CardTitle>Tab 2 content</CardTitle>
                          <CardDescription>
                            This is the content of the second tab.
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p>Any content can be here.</p>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    <TabsContent value="tab3" className="mt-4">
                      <Card>
                        <CardHeader>
                          <CardTitle>Tab 3 content</CardTitle>
                          <CardDescription>
                            This is the content of the third tab.
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p>Any content can be here.</p>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
