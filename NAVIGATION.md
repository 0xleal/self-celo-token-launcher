# Navigation & Routing Implementation

Complete navigation system with all pages and user flows.

## Routes Implemented

### Static Pages
- **`/`** - Home/Landing page with hero and features
- **`/launch`** - Token creation page
- **`/explore`** - Browse all tokens
- **`/dashboard`** - User dashboard (tokens, bets, milestones)

### Dynamic Pages
- **`/token/[address]`** - Individual token detail page
- **`/milestone/[id]`** - Milestone detail with prediction market

## Navigation Structure

### Header Navigation
Located in `src/components/layout/header.tsx`

**Desktop:**
- Logo (links to home)
- Explore
- Launch Token
- Dashboard
- Connect Wallet button (right side)

**Mobile:**
- Hamburger menu with all nav links
- Connect Wallet button always visible

### Wallet Connection
Located in `src/components/layout/connect-button.tsx`

**Features:**
- Connect multiple wallet types (via wagmi connectors)
- Display connected address (formatted)
- Account dropdown with:
  - Current network
  - Full address
  - Copy address
  - View on block explorer
  - Disconnect

**States:**
- **Not Connected:** Shows "Connect Wallet" button
- **Connected:** Shows address with dropdown menu

## User Flows

### Builder Journey
```
Home → Launch Token → [Self.xyz Verify] → Token Created
  → Dashboard → [Create Milestone] → Manage Progress
```

### Community Journey
```
Home → Explore → Token Detail → View Milestones
  → Milestone Detail → Place Bet → Track Position
```

## Component Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with Header/Footer
│   ├── page.tsx                # Home page
│   ├── launch/
│   │   └── page.tsx            # Token launch
│   ├── explore/
│   │   └── page.tsx            # Browse tokens
│   ├── dashboard/
│   │   └── page.tsx            # User dashboard
│   ├── token/
│   │   └── [address]/
│   │       └── page.tsx        # Token detail
│   └── milestone/
│       └── [id]/
│           └── page.tsx        # Milestone + prediction market
└── components/
    └── layout/
        ├── header.tsx          # Main navigation
        ├── connect-button.tsx  # Wallet connection
        └── footer.tsx          # Site footer
```

## Page Layouts

### Home (`/`)
- Hero section with gradient title
- Two CTAs: "Launch Token" and "Explore Tokens"
- Three feature cards
- Links to key pages

### Launch (`/launch`)
- Centered form layout
- Token details section
- Placeholder for token creation form
- Will integrate Self.xyz verification

### Explore (`/explore`)
- Grid layout for token cards
- Search/filter section (placeholder)
- Token preview cards
- Links to individual token pages

### Dashboard (`/dashboard`)
- Two-column layout:
  - My Tokens
  - My Bets
- Active Milestones section
- User-specific content

### Token Detail (`/token/[address]`)
- Token header with logo and stats
- Total supply, milestones, creator info
- List of milestones
- Links to individual milestones

### Milestone Detail (`/milestone/[id]`)
- Milestone status and description
- Target date and token info
- Two-column layout:
  - Prediction Market (betting interface)
  - Recent Activity feed
- Market stats (pool size, odds)

## Navigation Features

### Responsive Design
- Desktop: Full horizontal navigation
- Tablet: Compact navigation
- Mobile: Hamburger menu

### Active Link Styling
Ready for implementation:
```tsx
// Add to header.tsx for active states
import { usePathname } from 'next/navigation';
const pathname = usePathname();
className={pathname === link.href ? 'text-primary' : 'text-foreground/80'}
```

### Dropdown Menus
Both wallet connection and mobile menu use click-outside handlers (can be enhanced with a hook).

## Build Status

✅ **All routes compile successfully**
- 4 static pages
- 2 dynamic routes
- TypeScript passing
- No build errors

## Next Steps

### Immediate Enhancements
1. **Active Link States** - Highlight current page in nav
2. **Click Outside Handler** - Close dropdowns when clicking outside
3. **Toast Notifications** - For wallet connection feedback
4. **Loading States** - Add skeletons while data loads

### Future Navigation Features
1. **User Menu** - Additional profile options in wallet dropdown
2. **Notifications** - Bell icon with activity feed
3. **Search** - Global search for tokens/milestones
4. **Breadcrumbs** - For deep navigation (token → milestone)
5. **Back Button** - Smart back navigation on detail pages

## Testing Checklist

- [x] Home page loads
- [x] All nav links work
- [x] Mobile menu toggles
- [x] Wallet connect dropdown works
- [x] Footer links are correct
- [x] Dynamic routes are accessible
- [x] Build completes successfully
- [ ] Wallet connection functional (requires API keys)
- [ ] Active link highlighting
- [ ] Click-outside dropdown close

## Usage

```bash
# Run development server
npm run dev

# Visit pages
http://localhost:3000/          # Home
http://localhost:3000/launch    # Launch token
http://localhost:3000/explore   # Browse tokens
http://localhost:3000/dashboard # User dashboard
http://localhost:3000/token/0x123...   # Token detail
http://localhost:3000/milestone/abc123 # Milestone detail
```

All pages are fully navigable with working links!
