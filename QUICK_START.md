# SaveMore - Developer Quick Start Guide

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Installation

```bash
# Clone the project
git clone <repo-url>
cd savemore-react

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at **http://localhost:5174**

---

## 📱 Running Different Modes

### Development (With Hot Reload)

```bash
npm run dev
# Watch mode enabled - changes appear instantly
```

### Production Build

```bash
npm run build
# Creates optimized production files in dist/
```

### Preview Production Build

```bash
npm run preview
# Test production build locally
```

### Lint Code

```bash
npm run lint
# Check for code errors and standards
```

---

## 🎨 Tailwind CSS Configuration

### Custom Theme Tokens

All custom theme extensions are in `tailwind.config.js`:

- Colors (success, warning, danger)
- Spacing scale (xs, sm, md, lg, xl, 2xl)
- Font sizes (7 levels)
- Shadows (10 levels)
- Border radius (6 levels)
- Animations (3 custom animations)

### Using Tailwind Classes

```jsx
// Buttons
<button className="btn-primary">Primary</button>
<button className="btn-secondary">Secondary</button>
<button className="btn-danger">Danger</button>

// Cards
<div className="card-solid p-6">Solid Card</div>
<div className="card-premium p-6">Premium Card</div>

// Text
<p className="text-heading">Heading</p>
<p className="text-body">Body text</p>
<p className="text-muted">Muted text</p>

// Spacing
<div className="space-y-6">Item 1</div> {/* Vertical gap */}
<div className="flex gap-4">Item 1</div> {/* Horizontal gap */}
<div className="grid grid-cols-3 gap-6">Item</div> {/* Grid gap */}
```

### Adding Custom Classes

Edit `tailwind.config.js` in the `theme.extend` section:

```javascript
theme: {
  extend: {
    colors: {
      custom: "#your-color";
    }
  }
}
```

---

## 📂 Project Structure

```
src/
├── components/
│   ├── Card.jsx          # Reusable card wrapper
│   ├── ProgressBar.jsx   # Goal progress visualization
│   ├── Navbar.jsx        # Top navigation
│   └── Footer.jsx        # Footer section
├── pages/
│   ├── Dashboard.jsx     # Main goals dashboard
│   ├── Wallet.jsx        # Wallet & transactions
│   ├── Analytics.jsx     # Analytics & insights
│   ├── Home.jsx          # Landing page
│   ├── Login.jsx         # Login page
│   └── Signup.jsx        # Sign up page
├── context/
│   └── AuthContext.jsx   # Authentication context
├── services/
│   └── api.js            # API calls & axios config
├── hooks/
│   └── useAnimations.js  # Custom animation hooks
├── assets/
│   └── css/
│       └── *.css         # Legacy CSS (integrated into Tailwind)
├── App.jsx               # App routes
├── index.css             # Tailwind directives
└── main.jsx              # Entry point

tailwind.config.js        # Tailwind theme customization
postcss.config.js         # PostCSS configuration
```

---

## 🔧 Common Development Tasks

### Add a New Component

```jsx
// src/components/MyComponent.jsx
import { Card } from "./Card";

export const MyComponent = ({ title, content }) => (
  <Card className="p-6">
    <h3 className="text-heading">{title}</h3>
    <p className="text-body mt-4">{content}</p>
  </Card>
);

export default MyComponent;
```

### Update Styling

**Before (Old CSS):**

```css
.my-button {
  background: blue;
  padding: 10px;
  border-radius: 8px;
}
```

**After (Tailwind):**

```jsx
<button className="bg-blue-500 px-4 py-2.5 rounded-xl">Click me</button>
```

### Add New Page

```jsx
// src/pages/MyPage.jsx
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Card } from "../components/Card";

const MyPage = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950">{/* Your page layout */}</div>
  );
};

export default MyPage;
```

Then add route in `src/App.jsx`:

```jsx
<Route
  path="/my-page"
  element={
    <ProtectedRoute>
      <MyPage />
    </ProtectedRoute>
  }
/>
```

### Update Color Scheme

Edit `tailwind.config.js`:

```javascript
colors: {
  primary: {
    50: '#f0f9ff',
    500: '#0ea5e9',
    600: '#0284c7',
  }
}
```

Then use in components:

```jsx
className = "text-primary-500 bg-primary-50";
```

---

## 🎯 Component Usage Examples

### StatCard

```jsx
import { StatCard } from "./components/Card";

<StatCard
  icon="💎"
  label="Total Savings"
  value="₹5,000"
  change={10} // Optional: percentage change
/>;
```

### Card with Header/Footer

```jsx
import { Card } from "./components/Card";

<Card
  header={<h2 className="font-bold">Card Title</h2>}
  footer={<button className="btn-primary">Save</button>}
>
  <p>Card content goes here</p>
</Card>;
```

### EmptyState

```jsx
import { EmptyState } from "./components/Card";

<EmptyState
  icon="🎯"
  title="No goals yet"
  description="Create your first goal to get started"
  action={<button className="btn-primary">Create Goal</button>}
/>;
```

### ProgressBar

```jsx
import ProgressBar from "./components/ProgressBar";

<ProgressBar currentAmount={4000} targetAmount={5000} showAnimation />;
```

---

## 🐛 Debugging

### Chrome DevTools

1. Right-click → Inspect
2. Check Computed tab to see Tailwind classes
3. Search elements by class name

### React DevTools

- Install React Developer Tools extension
- Check component props and state
- Time travel debugging with Redux/Context

### Console Errors

```bash
# Most common fixes:
1. Check component imports
2. Verify prop types match
3. Review API responses
4. Clear browser cache
```

### Build Issues

```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## 📊 Performance Tips

### Image Optimization

- Use SVG for icons (already done)
- Compress PNG/JPG files
- Use WebP format when possible

### Code Splitting

```jsx
// Lazy load pages for faster initial load
const Analytics = lazy(() => import("./pages/Analytics"));
```

### Monitoring Bundle Size

```bash
npm run build
# Check dist/ folder size
```

---

## 🔒 Security Notes

### Environment Variables

Create `.env` file (never commit to git):

```env
VITE_API_BASE_URL=http://localhost:3001/api
VITE_JWT_SECRET=your-secret-key
```

Use in code:

```javascript
const apiUrl = import.meta.env.VITE_API_BASE_URL;
```

### Authentication

- JWT tokens stored in localStorage
- Token interceptor in `src/services/api.js`
- Protected routes in `src/App.jsx`

### API Security

- Always validate user input
- Use HTTPS in production
- Validate token expiry
- CORS configuration on backend

---

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Connect GitHub repo on vercel.com
# Auto-deploys on push to main
```

### Netlify

```bash
npm run build
# Drag dist/ folder to Netlify
# Or connect GitHub for auto-deploy
```

### Docker

```dockerfile
FROM node:18
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

---

## 📚 Documentation Reference

### In This Repo

- `DESIGN_SYSTEM.md` - Design tokens & principles
- `COMPONENT_PATTERNS.md` - Code snippets & examples
- `tailwind.config.js` - Theme customization
- `README.md` - Basic project info

### External Resources

- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)

---

## 🤝 Git Workflow

### Making Changes

```bash
# Create feature branch
git checkout -b feature/my-feature

# Make changes and test
npm run dev

# Commit with clear message
git add .
git commit -m "feat: add new feature"

# Push to remote
git push origin feature/my-feature

# Create Pull Request on GitHub
```

### Commit Message Format

```
feat: add new dashboard feature
fix: resolve button styling issue
docs: update component guide
style: format code with Tailwind
refactor: optimize performance
test: add unit tests
chore: update dependencies
```

---

## ❓ Troubleshooting

### Port Already in Use

```bash
# Kill process on port 5173/5174
lsof -i :5173
kill -9 <PID>

# Or use different port
npm run dev -- --port 3000
```

### Tailwind Classes Not Working

```bash
# Restart dev server
npm run dev

# Clear Vite cache
rm -rf .vite

# Rebuild Tailwind
npx tailwindcss -i ./src/index.css -o ./src/output.css
```

### Component Not Displaying

1. Check import path
2. Verify component export
3. Check parent component render
4. Review browser console for errors
5. Check network tab for API errors

### Styling Looks Wrong

1. Check z-index conflicts
2. Verify class names applied
3. Check pseudo-class rules (hover, focus)
4. Use browser DevTools to inspect
5. Clear browser cache

---

## 📞 Common Commands Reference

| Command           | Purpose              |
| ----------------- | -------------------- |
| `npm run dev`     | Start dev server     |
| `npm run build`   | Production build     |
| `npm run preview` | Preview prod build   |
| `npm run lint`    | Check code quality   |
| `npm install`     | Install dependencies |
| `npm update`      | Update packages      |
| `npm audit fix`   | Fix vulnerabilities  |

---

## ✅ Before Committing

- [ ] Code follows project patterns
- [ ] No console errors/warnings
- [ ] Tested on mobile/tablet/desktop
- [ ] No hardcoded values
- [ ] Comments added for complex logic
- [ ] Components are reusable
- [ ] Performance checked
- [ ] Accessibility verified

---

## 🎓 Learning Path

1. **Start** - Understand Tailwind basics
2. **Explore** - Read DESIGN_SYSTEM.md
3. **Practice** - Review COMPONENT_PATTERNS.md
4. **Build** - Create a small component
5. **Integrate** - Add component to a page
6. **Deploy** - Test in production

---

**Happy Coding! 🚀**

For questions, refer to:

- Project documentation
- Tailwind CSS docs
- React documentation
- Component source code

---

**Last Updated**: 2026-02-25
**Framework**: React 19 + Tailwind CSS 3+
