# CELO Design Tokens Quick Reference

A quick reference guide for developers working with the CELO Token Launcher design system.

## Colors

### Using in CSS/Tailwind

```tsx
// Primary (CELO Green)
className="bg-primary text-primary-foreground"
className="border-primary text-primary"
className="hover:bg-primary/10"

// Secondary (CELO Gold)
className="bg-secondary text-secondary-foreground"

// Accent (CELO Prosperity)
className="bg-accent text-accent-foreground"

// Semantic
className="bg-destructive text-destructive-foreground" // Errors
className="bg-muted text-muted-foreground"            // Subtle backgrounds
```

### Using in JavaScript

```ts
import { COLORS } from '@/lib/design-system';

// Access brand colors
COLORS.celo.green        // #35D07F
COLORS.celo.greenLight   // #5CDB96
COLORS.celo.greenDark    // #21B26B
COLORS.celo.gold         // #FBCC5C
COLORS.celo.prosperity   // #46CD85

// Semantic colors
COLORS.semantic.success  // #35D07F
COLORS.semantic.warning  // #FBCC5C
COLORS.semantic.error    // #EF4444
```

### Gradients

```tsx
// Tailwind classes
className="bg-gradient-to-r from-[#35D07F] to-[#46CD85]"
className="bg-gradient-to-r from-[#35D07F] to-[#FBCC5C]"

// JavaScript
import { GRADIENTS } from '@/lib/design-system';
style={{ backgroundImage: GRADIENTS.primary }}
style={{ backgroundImage: GRADIENTS.energy }}
```

## Typography

### Font Families

```tsx
// Default (Inter)
className="font-sans"

// Monospace (JetBrains Mono) - for addresses, code
className="font-mono"

// Example
<p className="font-mono text-sm">0x742d35...95f0bEb</p>
```

### Font Sizes

```tsx
className="text-xs"    // 12px - captions
className="text-sm"    // 14px - labels
className="text-base"  // 16px - body (default)
className="text-lg"    // 18px - large body
className="text-xl"    // 20px
className="text-2xl"   // 24px - subsections
className="text-3xl"   // 32px - section headers
className="text-4xl"   // 40px - page titles
className="text-5xl"   // 56px - hero headlines
```

### Font Weights

```tsx
className="font-normal"    // 400 - body text
className="font-medium"    // 500 - emphasis
className="font-semibold"  // 600 - headings (recommended)
className="font-bold"      // 700 - strong emphasis
```

### Typography Best Practices

```tsx
// Headings - always semibold or bold
<h1 className="text-4xl font-semibold tracking-tight">...</h1>
<h2 className="text-3xl font-semibold tracking-tight">...</h2>
<h3 className="text-2xl font-semibold">...</h3>

// Body text
<p className="text-base">Regular body text</p>
<p className="text-base font-medium">Emphasized body text</p>

// Wallet addresses & technical data
<span className="font-mono text-sm tabular-nums">0x123...</span>

// Labels
<label className="text-sm font-medium">Token Name</label>
```

## Spacing

```tsx
// Padding/Margin scale
className="p-1"   // 4px
className="p-2"   // 8px
className="p-3"   // 12px
className="p-4"   // 16px - base unit
className="p-6"   // 24px
className="p-8"   // 32px
className="p-12"  // 48px
className="p-16"  // 64px

// Gap in flex/grid
className="gap-3"  // 12px
className="gap-4"  // 16px
className="gap-6"  // 24px
```

## Border Radius

```tsx
className="rounded-md"   // 0.75rem (12px) - default
className="rounded-lg"   // 1rem (16px) - cards, buttons
className="rounded-xl"   // 1.25rem (20px) - large cards
className="rounded-full" // Fully rounded - pills, avatars
```

## Component Patterns

### Buttons

```tsx
// Primary CTA
<button className="rounded-lg bg-gradient-to-r from-[#35D07F] to-[#46CD85] px-6 py-3 font-medium text-white shadow-lg transition-all hover:shadow-xl">
  Launch Token
</button>

// Secondary
<button className="rounded-lg border-2 border-primary px-6 py-3 font-medium text-primary transition-all hover:bg-primary/10">
  Connect Wallet
</button>

// Ghost/Tertiary
<button className="rounded-lg px-6 py-3 font-medium text-primary transition-all hover:bg-primary/5">
  Learn More
</button>
```

### Cards

```tsx
// Standard card
<div className="rounded-xl border border-border bg-card p-6 shadow-sm">
  <h3 className="text-xl font-semibold">Card Title</h3>
  <p className="text-muted-foreground">Card content...</p>
</div>

// Interactive card (with hover)
<div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-md">
  ...
</div>

// Card with gradient accent
<div className="rounded-xl border border-primary/30 bg-card p-6 shadow-sm">
  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
    {/* Icon */}
  </div>
  ...
</div>
```

### Input Fields

```tsx
// Using shadcn/ui Input component
<Input
  className="rounded-lg border-border focus:border-primary focus:ring-primary"
  placeholder="Enter token name"
/>

// Manual styling
<input className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
```

### Containers

```tsx
// Page container
<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
  ...
</div>

// Narrow content
<div className="mx-auto max-w-2xl">
  ...
</div>

// Section spacing
<section className="py-16 sm:py-24">
  ...
</section>
```

## Animations

```tsx
// Hover transitions
className="transition-all hover:shadow-md"
className="transition-colors hover:bg-primary/10"

// Scale on hover
className="transition-transform hover:scale-[1.02]"

// With Framer Motion
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  ...
</motion.div>
```

## Responsive Design

```tsx
// Mobile-first approach
className="text-2xl md:text-4xl"           // Smaller on mobile
className="grid grid-cols-1 md:grid-cols-3" // 1 col mobile, 3 on desktop
className="px-4 sm:px-6 lg:px-8"           // Progressive padding

// Breakpoints
// sm: 640px  (tablet)
// md: 768px  (desktop)
// lg: 1024px (large desktop)
// xl: 1280px (extra large)
```

## Dark Mode

```tsx
// Automatic dark mode support via CSS variables
// All colors adapt automatically

// Custom dark mode styles
className="bg-white dark:bg-gray-900"
className="text-gray-900 dark:text-white"
```

## Icons

```tsx
// Using Lucide React
import { Rocket, Target, TrendingUp } from 'lucide-react';

<Rocket className="h-6 w-6 text-primary" />

// Sizes
className="h-4 w-4"  // 16px - inline icons
className="h-5 w-5"  // 20px - small standalone
className="h-6 w-6"  // 24px - default standalone
className="h-8 w-8"  // 32px - large icons
```

## Utility Classes

```tsx
// Truncate text
className="truncate"

// Line clamp
className="line-clamp-2"

// Smooth scroll
<html className="scroll-smooth">

// Accessibility
className="sr-only"              // Screen reader only
className="focus:ring-2 focus:ring-primary" // Focus visible
```

## Example: Token Card Component

```tsx
<div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-md">
  {/* Header */}
  <div className="mb-4 flex items-center gap-3">
    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
      <Rocket className="h-6 w-6 text-primary" />
    </div>
    <div>
      <h3 className="text-lg font-semibold">MyToken</h3>
      <p className="font-mono text-sm text-muted-foreground">MTK</p>
    </div>
  </div>

  {/* Stats */}
  <div className="grid grid-cols-2 gap-4 border-t border-border pt-4">
    <div>
      <p className="text-sm text-muted-foreground">Supply</p>
      <p className="tabular-nums text-lg font-semibold">1,000,000</p>
    </div>
    <div>
      <p className="text-sm text-muted-foreground">Milestones</p>
      <p className="text-lg font-semibold">3/5</p>
    </div>
  </div>

  {/* Action */}
  <button className="mt-4 w-full rounded-lg border-2 border-primary py-2 font-medium text-primary transition-all hover:bg-primary/10">
    View Details
  </button>
</div>
```

---

**Quick Tip:** All semantic color tokens (`primary`, `secondary`, `accent`, etc.) automatically adapt to dark mode. Use them instead of hardcoded colors for consistency.
