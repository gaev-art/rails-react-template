# Component Documentation

## Overview

This document provides comprehensive information about all UI components available in the React Starter Kit, including usage examples, props, and best practices.

## Component Library Structure

The project uses **shadcn/ui** components built on top of **Radix UI** primitives with **Tailwind CSS** styling.

### Component Categories

1. **[Layout Components](#layout-components)** - Structure and organization
2. **[Form Components](#form-components)** - User input and interaction
3. **[Display Components](#display-components)** - Information presentation
4. **[Feedback Components](#feedback-components)** - User feedback and status
5. **[Interactive Components](#interactive-components)** - Advanced interactions

---

## Layout Components

### Card
Flexible content containers for grouping related information.

```typescript
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

// Basic usage
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Optional description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
</Card>
```

**Variants:**
- `Card` - Main container
- `CardHeader` - Header section
- `CardContent` - Main content area
- `CardTitle` - Title text
- `CardDescription` - Subtitle/description text

### Separator
Visual divider between content sections.

```typescript
import { Separator } from '@/components/ui/separator'

<div>
  <p>Content above</p>
  <Separator />
  <p>Content below</p>
</div>
```

### Tabs
Tabbed interface for organizing content.

```typescript
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">
    <p>Content for tab 1</p>
  </TabsContent>
  <TabsContent value="tab2">
    <p>Content for tab 2</p>
  </TabsContent>
</Tabs>
```

---

## Form Components

### Button
Primary interaction element with multiple variants and sizes.

```typescript
import { Button } from '@/components/ui/button'

// Variants
<Button variant="default">Default</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="link">Link</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon">🚀</Button>
```

**Props:**
- `variant`: `"default" | "outline" | "secondary" | "ghost" | "destructive" | "link"`
- `size`: `"default" | "sm" | "lg" | "icon"`
- `disabled`: `boolean`
- `onClick`: `() => void`

### Input
Text input field with various types.

```typescript
import { Input } from '@/components/ui/input'

<Input
  type="text"
  placeholder="Enter text..."
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
```

**Props:**
- `type`: Standard HTML input types
- `placeholder`: `string`
- `value`: `string`
- `onChange`: `(event) => void`
- `disabled`: `boolean`

### Textarea
Multi-line text input.

```typescript
import { Textarea } from '@/components/ui/textarea'

<Textarea
  placeholder="Enter multi-line text..."
  value={value}
  onChange={(e) => setValue(e.target.value)}
  rows={4}
/>
```

### Checkbox
Boolean selection control.

```typescript
import { Checkbox } from '@/components/ui/checkbox'

<div className="flex items-center space-x-2">
  <Checkbox
    id="terms"
    checked={isChecked}
    onCheckedChange={setIsChecked}
  />
  <label htmlFor="terms">Accept terms</label>
</div>
```

**Props:**
- `checked`: `boolean`
- `onCheckedChange`: `(checked: boolean) => void`
- `disabled`: `boolean`

### Switch
Toggle control for on/off states.

```typescript
import { Switch } from '@/components/ui/switch'

<div className="flex items-center space-x-2">
  <Switch
    id="notifications"
    checked={isEnabled}
    onCheckedChange={setIsEnabled}
  />
  <label htmlFor="notifications">Enable notifications</label>
</div>
```

### Select
Dropdown selection control.

```typescript
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

<Select value={value} onValueChange={setValue}>
  <SelectTrigger>
    <SelectValue placeholder="Select option..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
    <SelectItem value="option3">Option 3</SelectItem>
  </SelectContent>
</Select>
```

### Label
Form field labels with proper accessibility.

```typescript
import { Label } from '@/components/ui/label'

<div>
  <Label htmlFor="email">Email address</Label>
  <Input id="email" type="email" />
</div>
```

### Slider
Range input for numeric values.

```typescript
import { Slider } from '@/components/ui/slider'

<Slider
  value={[value]}
  onValueChange={(newValue) => setValue(newValue[0])}
  max={100}
  min={0}
  step={1}
/>
```

**Props:**
- `value`: `number[]`
- `onValueChange`: `(value: number[]) => void`
- `min`: `number`
- `max`: `number`
- `step`: `number`

---

## Display Components

### Badge
Small status or category indicators.

```typescript
import { Badge } from '@/components/ui/badge'

<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="outline">Outline</Badge>
```

**Variants:**
- `default` - Primary badge style
- `secondary` - Muted badge style
- `destructive` - Error/danger style
- `outline` - Outline only style

### Avatar
User profile image with fallback.

```typescript
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

<Avatar>
  <AvatarImage src="https://github.com/username.png" alt="User" />
  <AvatarFallback>UN</AvatarFallback>
</Avatar>
```

### Progress
Progress indicator for loading states.

```typescript
import { Progress } from '@/components/ui/progress'

<Progress value={progress} className="w-full" />
```

**Props:**
- `value`: `number` (0-100)
- `className`: Additional CSS classes

---

## Feedback Components

### Alert
Notification messages with different severity levels.

```typescript
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

<Alert>
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    You can add components and dependencies to your app using the cli.
  </AlertDescription>
</Alert>
```

**Variants:**
- `default` - Neutral information
- `destructive` - Error or warning messages

---

## Interactive Components

### Dialog
Modal windows for focused interactions.

```typescript
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>
        Dialog description goes here.
      </DialogDescription>
    </DialogHeader>
    <p>Dialog content...</p>
  </DialogContent>
</Dialog>
```

### Popover
Floating content attached to elements.

```typescript
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Open popover</Button>
  </PopoverTrigger>
  <PopoverContent>
    <p>Popover content goes here.</p>
  </PopoverContent>
</Popover>
```

### Dropdown Menu
Context menus with actions.

```typescript
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Open Menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Settings</DropdownMenuItem>
    <DropdownMenuItem>Logout</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

### Calendar
Date selection component.

```typescript
import { Calendar } from '@/components/ui/calendar'

<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  className="rounded-md border"
/>
```

---

## Advanced Components

### Animated Components
The project includes several advanced animated components:

- **3D Card** - Interactive 3D card effects
- **Text Reveal Card** - Animated text reveals
- **Moving Border** - Animated border effects
- **Spotlight** - Interactive spotlight effects
- **Background Beams** - Animated background effects
- **Glowing Stars** - Particle effects
- **Container Scroll Animation** - Scroll-triggered animations

### Custom Theme Integration

All components automatically adapt to the current theme:

```typescript
// Theme-aware component usage
const { theme, toggleTheme } = useTheme()

<Button onClick={toggleTheme}>
  Switch to {theme === 'light' ? 'dark' : 'light'} theme
</Button>
```

---

## Best Practices

### 1. Component Composition
Build complex interfaces by composing simple components:

```typescript
<Card className="transition-all duration-300 hover:shadow-lg">
  <CardHeader>
    <div className="flex items-center justify-between">
      <CardTitle>User Profile</CardTitle>
      <Badge variant="secondary">Active</Badge>
    </div>
  </CardHeader>
  <CardContent>
    <div className="flex items-center space-x-4">
      <Avatar>
        <AvatarImage src={user.avatar} />
        <AvatarFallback>{user.initials}</AvatarFallback>
      </Avatar>
      <div>
        <h3 className="font-semibold">{user.name}</h3>
        <p className="text-muted-foreground">{user.email}</p>
      </div>
    </div>
  </CardContent>
</Card>
```

### 2. Consistent Spacing
Use Tailwind's spacing scale consistently:

```typescript
// Good - consistent spacing
<div className="space-y-4">
  <div className="space-y-2">
    <Label>Label</Label>
    <Input />
  </div>
  <Button className="w-full">Submit</Button>
</div>
```

### 3. Accessibility
Always include proper labels and ARIA attributes:

```typescript
<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input
    id="email"
    type="email"
    placeholder="Enter your email"
    aria-describedby="email-help"
  />
  <p id="email-help" className="text-sm text-muted-foreground">
    We'll never share your email
  </p>
</div>
```

### 4. Responsive Design
Use responsive utilities for mobile-first design:

```typescript
<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
  {items.map(item => (
    <Card key={item.id} className="transition-all hover:scale-105">
      {/* Card content */}
    </Card>
  ))}
</div>
```

### 5. Loading States
Provide feedback during loading:

```typescript
<Button disabled={isLoading}>
  {isLoading ? 'Loading...' : 'Submit'}
</Button>

// Or with a spinner
<Button disabled={isLoading}>
  {isLoading && <Spinner className="mr-2 h-4 w-4" />}
  {isLoading ? 'Processing...' : 'Submit'}
</Button>
```

---

## Customization

### Adding Custom Components
To add new components following the shadcn/ui pattern:

1. Create the component in `app/frontend/components/ui/`
2. Use Radix UI primitives when possible
3. Apply Tailwind classes with CSS variables
4. Export from the component file

### Styling Guidelines
- Use CSS variables for theme-aware colors
- Follow Tailwind's utility-first approach
- Apply consistent spacing and sizing
- Use semantic color names (primary, secondary, etc.)

### Animation Guidelines
- Use CSS transitions for micro-interactions
- Apply `motion` library for complex animations
- Keep animations performant and purposeful
- Respect user's motion preferences

---

This component library provides a solid foundation for building modern, accessible, and beautiful user interfaces. All components are designed to work together seamlessly and adapt automatically to theme changes.
