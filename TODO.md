# Plan: Add Goal Feature to SaveMore React App

## Information Gathered

After analyzing the codebase, here's what I found:

### Current State:

1. **Dashboard.jsx** - Has a "+ New Goal" button (line 88) that doesn't work yet
2. **Modal Pattern** - Already exists in Dashboard.jsx for withdrawal confirmation (lines 145-167)
3. **Goals Display** - Uses `goal-card-horizontal` component with progress bars
4. **Styling** - modal.css already has styles for overlays and cards

### Key Files:

- `savemore-react/src/pages/Dashboard.jsx` - Main dashboard with goals section
- `savemore-react/src/assets/css/modal.css` - Modal styling (already exists)
- `savemore-react/src/assets/css/dashboard.css` - Dashboard and goal card styles

---

## Plan: How to Add a Goal

### Step 1: Add State for Goals

In Dashboard.jsx, add state to store goals:

```
jsx
const [goals, setGoals] = useState([
  {
    id: 1,
    name: "Summer Break Trip",
    current: 2100,
    target: 2500,
    progress: 82
  }
]);
```

### Step 2: Add State for Modal

Add state to control the "New Goal" modal:

```jsx
const [showNewGoalModal, setShowNewGoalModal] = useState(false);
```

### Step 3: Create Goal Form State

Add state for the form inputs:

```
jsx
const [newGoal, setNewGoal] = useState({
  name: '',
  targetAmount: '',
  currentAmount: '0'
});
```

### Step 4: Add Handler Functions

**Open modal handler:**

```
jsx
const handleNewGoal = () => {
  setShowNewGoalModal(true);
};
```

**Add goal handler:**

```
jsx
const handleAddGoal = (e) => {
  e.preventDefault();
  const goal = {
    id: Date.now(),
    name: newGoal.name,
    current: parseFloat(newGoal.currentAmount) || 0,
    target: parseFloat(newGoal.targetAmount),
    progress: Math.round((newGoal.currentAmount / newGoal.targetAmount) * 100)
  };
  setGoals([...goals, goal]);
  setShowNewGoalModal(false);
  setNewGoal({ name: '', targetAmount: '', currentAmount: '0' });
};
```

### Step 5: Wire Up the Button

Find the button on line 88:

```
jsx
<button className="btn btn-primary btn-sm" onClick={handleNewGoal}>
  + New Goal
</button>
```

### Step 6: Add the Modal HTML

Add this JSX after the existing modal (before closing `</div>`):

```
jsx
{showNewGoalModal && (
  <div className="modal-overlay fade-in" onClick={() => setShowNewGoalModal(false)}>
    <div className="modal-card" onClick={(e) => e.stopPropagation()}>
      <h3>Create New Goal</h3>
      <form onSubmit={handleAddGoal}>
        <div className="form-group" style={{marginBottom: '16px'}}>
          <label style={{display: 'block', marginBottom: '8px'}}>Goal Name</label>
          <input
            type="text"
            value={newGoal.name}
            onChange={(e) => setNewGoal({...newGoal, name: e.target.value})}
            placeholder="e.g., New Phone, Vacation"
            required
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.2)',
              background: 'rgba(255,255,255,0.05)',
              color: 'white'
            }}
          />
        </div>
        <div className="form-group" style={{marginBottom: '16px'}}>
          <label style={{display: 'block', marginBottom: '8px'}}>Target Amount (₹)</label>
          <input
            type="number"
            value={newGoal.targetAmount}
            onChange={(e) => setNewGoal({...newGoal, targetAmount: e.target.value})}
            placeholder="5000"
            required
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.2)',
              background: 'rgba(255,255,255,0.05)',
              color: 'white'
            }}
          />
        </div>
        <div className="form-group" style={{marginBottom: '24px'}}>
          <label style={{display: 'block', marginBottom: '8px'}}>Starting Amount (₹)</label>
          <input
            type="number"
            value={newGoal.currentAmount}
            onChange={(e) => setNewGoal({...newGoal, currentAmount: e.target.value})}
            placeholder="0"
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.2)',
              background: 'rgba(255,255,255,0.05)',
              color: 'white'
            }}
          />
        </div>
        <div className="modal-actions">
          <button type="submit" className="btn btn-primary">
            Create Goal
          </button>
          <button type="button" className="btn btn-outline" onClick={() => setShowNewGoalModal(false)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
)}
```

### Step 7: Make Goals List Dynamic

Replace the static goal card with dynamic rendering:

```
jsx
<div className="goals-list">
  {goals.map(goal => (
    <div key={goal.id} className="goal-card-horizontal">
      <div className="goal-main">
        <h4>{goal.name}</h4>
        <div className="goal-meta">₹{goal.current} / ₹{goal.target}</div>
        <div className="progress-bar-bg">
          <div className="progress-fill" style={{width: `${goal.progress}%`}}></div>
        </div>
      </div>
      <div className="goal-actions">
        <button className="btn btn-primary">Add Money</button>
        <button className="btn btn-outline" onClick={handleWithdraw}>Withdraw</button>
      </div>
    </div>
  ))}
</div>
```

---

## Files to Edit

1. **savemore-react/src/pages/Dashboard.jsx**
   - Add import for useState (already imported)
   - Add goals state
   - Add showNewGoalModal state
   - Add newGoal form state
   - Add handler functions
   - Wire up button
   - Add modal JSX
   - Make goals list dynamic

---

## Follow Up Steps

After implementing:

1. Test the "+ New Goal" button
2. Fill out the form and submit
3. Verify the new goal appears in the list
4. Optionally: Add form validation
5. Optionally: Add goal categories/icons
