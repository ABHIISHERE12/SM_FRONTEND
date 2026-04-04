# SaveMore - Component Patterns & Code Snippets

## Layout Patterns

### Main Layout (All Pages)

```jsx
<div className="min-h-screen bg-slate-950">
  {/* Background Effects */}
  <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-black opacity-50" />
  <div className="fixed inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(59,130,246,0.1),transparent_50%)]" />

  <div className="relative z-10">
    {/* Sidebar */}
    <Sidebar />

    {/* Main Content */}
    <div className="ml-64 min-h-screen">
      <Header />
      <main className="p-8">{/* Content */}</main>
    </div>
  </div>
</div>
```

### Grid Layouts

```jsx
// 3-column stats grid
<div className="grid grid-cols-3 gap-6 mb-8">
  <StatCard ... />
  <StatCard ... />
  <StatCard ... />
</div>

// Responsive card grid (1->2->3 columns)
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <Card>...</Card>
  <Card>...</Card>
</div>

// 2-column summary grid
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <Card>Left</Card>
  <Card>Right</Card>
</div>
```

## Navigation Patterns

### Sidebar Nav Link

```jsx
const NavLink = ({ icon, label, active, onClick, href }) => (
  <a
    href={href || "#"}
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
      active
        ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
        : "text-slate-400 hover:text-white hover:bg-slate-800/50"
    }`}
  >
    <span className="text-lg">{icon}</span>
    <span>{label}</span>
  </a>
);
```

### Header Search Bar (Future)

```jsx
<input
  type="text"
  placeholder="Search..."
  className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
/>
```

## Card Patterns

### Premium Card with Header/Footer

```jsx
<Card
  header={<h2 className="text-lg font-bold">Title</h2>}
  footer={<button className="btn-primary">Action</button>}
>
  <p>Content</p>
</Card>
```

### Interactive Card

```jsx
<Card className="p-6 group hover:shadow-2xl" hover interactive>
  <div className="flex items-start justify-between">
    <div>
      <h3 className="text-lg font-bold text-white">Card Title</h3>
      <p className="text-sm text-slate-400 mt-1">Description</p>
    </div>
    <div className="text-3xl">📌</div>
  </div>
</Card>
```

## Button Patterns

### Primary Button

```jsx
<button className="btn-primary">
  Action
</button>

// With Icon
<button className="btn-primary flex items-center gap-2">
  <span>+</span>
  New Item
</button>
```

### Secondary Button

```jsx
<button className="btn-secondary">Cancel</button>
```

### Danger Button

```jsx
<button className="btn-danger" disabled={!isUnlocked}>
  Withdraw
</button>
```

### Ghost Button (Link-like)

```jsx
<button className="btn-ghost">Learn More</button>
```

### Button States

```jsx
// Disabled State
<button disabled className="opacity-50 cursor-not-allowed">
  Disabled
</button>

// Loading State
<button disabled className="btn-primary">
  {loading ? 'Loading...' : 'Submit'}
</button>

// Active Press Animation
className="active:scale-95"
```

## Form Patterns

### Text Input

```jsx
<input
  type="text"
  placeholder="Enter text..."
  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-colors"
/>
```

### Number Input (Currency)

```jsx
<input
  type="number"
  placeholder="0.00"
  step="0.01"
  min="0"
  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-colors"
/>
```

### Form Error Message

```jsx
{
  error && <p className="text-sm text-red-400 mt-2">{error}</p>;
}
```

### Form Label

```jsx
<label className="block text-sm font-medium text-slate-300 mb-2">
  Label Text
</label>
```

## Badge Patterns

### Success Badge

```jsx
<span className="badge-success">Success</span>

// With Icon
<span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
  🔓 Unlocked
</span>
```

### Warning Badge

```jsx
<span className="badge-warning">Warning</span>
```

### Danger Badge

```jsx
<span className="badge-danger">Error</span>
```

## Modal Patterns

### Modal Container

```jsx
{
  isOpen && (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="w-full max-w-md">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Modal Title</h2>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white text-2xl leading-none"
            >
              ×
            </button>
          </div>

          {/* Modal Content */}
          <div className="space-y-4">{/* ... */}</div>

          {/* Modal Actions */}
          <div className="flex gap-3 mt-6">
            <button className="btn-primary flex-1">Confirm</button>
            <button className="btn-secondary flex-1">Cancel</button>
          </div>
        </div>
      </Card>
    </div>
  );
}
```

## Metric Display Patterns

### Large Metric (Balance Card)

```jsx
<div className="p-8">
  <p className="text-sm text-slate-400 uppercase tracking-wider mb-2">
    Current Balance
  </p>
  <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
    ₹{balance.toFixed(2)}
  </p>
</div>
```

### Metric with Icon

```jsx
<div className="flex items-start justify-between">
  <div>
    <p className="text-muted mb-1">Label</p>
    <p className="text-3xl font-bold text-white">Value</p>
    <p className="text-sm mt-2 font-medium text-green-400">↑ 10%</p>
  </div>
  <div className="text-3xl">💎</div>
</div>
```

### 3-Column Amount Grid

```jsx
<div className="grid grid-cols-3 gap-4 py-4 px-4 bg-slate-800/40 rounded-lg">
  <div>
    <p className="text-xs text-slate-500 uppercase tracking-wider">Saved</p>
    <p className="text-lg font-bold text-green-400">₹{saved}</p>
  </div>
  <div className="border-l border-r border-slate-700">
    <p className="text-xs text-slate-500 uppercase tracking-wider">Target</p>
    <p className="text-lg font-bold text-blue-400">₹{target}</p>
  </div>
  <div>
    <p className="text-xs text-slate-500 uppercase tracking-wider">Remaining</p>
    <p className="text-lg font-bold text-slate-300">₹{remaining}</p>
  </div>
</div>
```

## List Patterns

### Transaction List

```jsx
<Card className="overflow-hidden">
  <div className="divide-y divide-slate-800">
    {items.map((item) => (
      <div
        key={item.id}
        className="p-4 flex items-center justify-between hover:bg-slate-800/30 transition-colors"
      >
        <div className="flex items-center gap-4 flex-1">
          <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-lg font-bold text-green-400">
            ↓
          </div>
          <div>
            <p className="text-sm font-medium text-white">{item.title}</p>
            <p className="text-xs text-slate-500 mt-1">{item.time}</p>
          </div>
        </div>
        <p className="text-lg font-bold text-green-400">+₹{item.amount}</p>
      </div>
    ))}
  </div>
</Card>
```

## Alert/Message Patterns

### Info Alert

```jsx
<div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
  <p className="text-xs text-blue-400 font-medium">ℹ️ Informational message</p>
</div>
```

### Warning Alert

```jsx
<div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
  <p className="text-xs text-yellow-400 font-medium">
    💡 Deposit ₹{amount} more to unlock
  </p>
</div>
```

### Success Alert

```jsx
<div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
  <p className="text-xs text-green-400 font-semibold">✓ Ready to withdraw</p>
</div>
```

### Error Alert

```jsx
<div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
  <p className="text-xs text-red-400 font-medium">❌ Error message</p>
</div>
```

### Insight Card

```jsx
<Card className="p-6 border-l-4 border-green-500">
  <div className="flex gap-4">
    <span className="text-3xl">🎉</span>
    <div>
      <h4 className="font-bold text-white mb-1">Title</h4>
      <p className="text-sm text-slate-400">Description</p>
    </div>
  </div>
</Card>
```

## Chart Patterns

### Circular Progress (SVG)

```jsx
<div className="relative w-24 h-24">
  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
    {/* Background circle */}
    <circle
      cx="50"
      cy="50"
      r="45"
      fill="none"
      stroke="rgba(203, 213, 225, 0.1)"
      strokeWidth="8"
    />

    {/* Progress circle */}
    <circle
      cx="50"
      cy="50"
      r="45"
      fill="none"
      stroke={isUnlocked ? "#10b981" : "#f59e0b"}
      strokeWidth="8"
      strokeDasharray={`${(progress / 100) * 283} 283`}
      className="transition-all duration-700"
    />
  </svg>

  {/* Center text */}
  <div className="absolute inset-0 flex items-center justify-center">
    <p className="text-lg font-bold text-white">{progress}%</p>
  </div>
</div>
```

## Status Indicators

### Lock Status Badge

```jsx
<div
  className={`px-3 py-1.5 rounded-full text-xs font-semibold inline-block ${
    isLocked
      ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
      : "bg-green-500/20 text-green-400 border border-green-500/30"
  }`}
>
  {isLocked ? "🔒 Locked" : "🔓 Unlocked"}
</div>
```

## Text Styling

### Gradient Text

```jsx
<p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
  Premium Text
</p>
```

### Muted Text

```jsx
<p className="text-muted">Secondary text</p>
```

### Uppercase Label

```jsx
<p className="text-xs text-slate-500 uppercase tracking-wider">Label</p>
```

## Spacing Utilities

### Section Spacing

```jsx
<div className="space-y-8">
  <section>Content</section>
  <section>Content</section>
</div>
```

### Grid Gap

```jsx
<div className="grid grid-cols-3 gap-6">
  <div>Item</div>
</div>
```

### Flex Gap

```jsx
<div className="flex gap-3">
  <button>Action 1</button>
  <button>Action 2</button>
</div>
```

## Reusable Layout Components

### Section Header

```jsx
<div className="flex items-center justify-between mb-6">
  <h2 className="text-2xl font-bold text-white">Section Title</h2>
  <button className="btn-primary">Action</button>
</div>
```

### 2-Column Layout

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <div>Left Column</div>
  <div>Right Column</div>
</div>
```

### Divider

```jsx
<div className="divider"></div>;
{
  /* Or */
}
<div className="border-t border-slate-800 my-6"></div>;
```

---

## Usage Guidelines

1. **Consistency**: Always use predefined button classes (.btn-primary, .btn-secondary)
2. **Spacing**: Use the 8px grid (p-2, p-4, p-6, gap-3, gap-6)
3. **Colors**: Use semantic colors (text-green-400 for success, text-red-400 for errors)
4. **Animations**: Keep animations smooth (200-700ms) and purposeful
5. **Responsive**: Test on mobile first, then expand to desktop
6. **Performance**: Avoid creating new component variants; extend Tailwind config instead
7. **Accessibility**: Ensure sufficient color contrast and keyboard navigation

---

**Last Updated**: 2026-02-25
**Framework**: React 19 + Tailwind CSS 3+
