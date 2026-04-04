/\*\*

- LOCK-BASED WITHDRAWAL SYSTEM - IMPLEMENTATION GUIDE
-
- This document outlines the complete implementation of the lock-based
- withdrawal system for the SaveMore MERN stack platform.
  \*/

// ============================================================================
// BACKEND IMPLEMENTATION
// ============================================================================

/\*\*

- 1.  ENDPOINT: POST /api/goals/:goalId/withdraw
-
- Purpose: Process withdrawal requests with 80% progress lock validation
-
- File: savemore-backend/routes/goalRoutes.js
- Method: withdrawFromGoal (in goalController.js)
-
- Flow:
- 1.  Receive withdrawal request with { amount }
- 2.  Validate goal ownership and existence
- 3.  Calculate progress percentage = (currentAmount / targetAmount) \* 100
- 4.  Check if progress >= 80%
- 5.  If progress < 80% → Return 403 with lock information
- 6.  If progress >= 80% → Deduct amount and return success
-
- Error Response (403 - Locked):
- {
- "status": false,
- "statusCode": 403,
- "message": "You cannot withdraw until you reach at least 80% of your savings goal.",
- "data": {
-     "progressPercentage": 65,
-     "currentAmount": 6500,
-     "targetAmount": 10000,
-     "requiredAmount": 2500,
-     "locked": true
- }
- }
-
- Success Response (200):
- {
- "status": true,
- "statusCode": 200,
- "message": "Withdrawal successful",
- "data": {
-     "goal": { ...updatedGoal },
-     "withdrawnAmount": 5000,
-     "progressPercentage": 25
- }
- }
  \*/

// ============================================================================
// FRONTEND IMPLEMENTATION
// ============================================================================

/\*\*

- 2.  API SERVICE UPDATE
-
- File: src/services/api.js
-
- Added method:
- withdraw: (id, data) => apiClient.post(`/goals/${id}/withdraw`, data)
-
- Usage:
- await goalsAPI.withdraw(goalId, { amount: 5000 })
  \*/

/\*\*

- 3.  PROGRESS BAR COMPONENT
-
- File: src/components/ProgressBar.jsx
- Dependencies: src/assets/css/progress-bar.css
-
- Props:
- - currentAmount (number): Current savings in goal
- - targetAmount (number): Target savings amount
- - goalTitle (string): Name of goal (optional)
- - showAnimation (boolean): Enable unlock animation (optional)
-
- Features:
- - Displays lock 🔒 / unlock 🔓 icons
- - Shows 80% threshold line
- - Animated progress bar
- - Displays amount needed to unlock
- - Responsive design
-
- Example Usage:
- <ProgressBar
- currentAmount={goal.currentAmount}
- targetAmount={goal.targetAmount}
- goalTitle={goal.title}
- showAnimation={true}
- />
  \*/

/\*\*

- 4.  WITHDRAWAL CARD COMPONENT
-
- File: src/components/WithdrawalCard.jsx
- Dependencies: src/assets/css/withdrawal-card.css
-
- Props:
- - goal (object): Goal object with \_id, title, currentAmount, targetAmount
- - onWithdraw (function): Callback when withdrawal is successful
- - onError (function): Callback when withdrawal fails
- - isLoading (boolean): Loading state
-
- Features:
- - Displays goal with lock/unlock badge
- - Integrated ProgressBar component
- - Withdrawal modal with amount input
- - Error/success message display
- - Max amount button
-
- Note: This is a standalone reusable component
-
- Example Usage:
- <WithdrawalCard
- goal={goal}
- onWithdraw={handleWithdraw}
- onError={handleError}
- isLoading={loading}
- />
  \*/

/\*\*

- 5.  DASHBOARD INTEGRATION
-
- File: src/pages/Dashboard.jsx
-
- Changes:
- - Import ProgressBar component
- - Updated confirmWithdraw() to call backend API
- - Integrated ProgressBar in goal card displays
- - Added 80% lock validation UI
- - Handle 403 error responses
-
- Key Function: confirmWithdraw()
- Purpose: Handle withdrawal workflow
- Flow:
- 1.  Validate user input (amount > 0, <= currentAmount)
- 2.  Call goalsAPI.withdraw(goalId, { amount })
- 3.  Backend validates 80% threshold
- 4.  On success: Update UI, add to wallet, create transaction
- 5.  On 403: Display lock error with progress info
- 6.  On other error: Display generic error message
      \*/

// ============================================================================
// SECURITY IMPLEMENTATION
// ============================================================================

/\*\*

- BACKEND VALIDATION (Most Important)
-
- All lock validation happens on the backend:
- ✓ Goal ownership verification (user can only withdraw from their goals)
- ✓ Progress percentage calculation
- ✓ 80% threshold enforcement
- ✓ Amount validation (can't exceed current balance)
-
- Frontend validation is for UX only - backend is authoritative.
  \*/

/\*\*

- FRONTEND VALIDATION (UX Only)
-
- ✓ Show/hide withdraw button based on progress
- ✓ Display lock icons for visual feedback
- ✓ Show amount needed to unlock
- ✓ Disable button when progress < 80%
- ✓ Show error message if user bypasses frontend
  \*/

// ============================================================================
// ERROR HANDLING FLOW
// ============================================================================

/\*\*

- Scenario 1: Progress < 80% (Frontend)
- - Withdraw button shows "Locked - Reach 80%"
- - Button is disabled
- - User sees ProgressBar with "Deposit X more to unlock"
-
- Scenario 2: Progress < 80% (User Bypasses Frontend)
- - Backend rejects with 403
- - Error message displayed:
- "You cannot withdraw until you reach at least 80% of your savings goal.
- Current: 6500/10000 (65%)"
-
- Scenario 3: Progress >= 80% (Normal Withdrawal)
- - Withdraw button enabled and shows "Withdraw Funds"
- - User enters amount
- - Backend processes immediately
- - Funds added to wallet
- - Transaction recorded
- - Success message shown
-
- Scenario 4: Invalid Amount
- - Amount > current balance
- - Error: "Maximum withdrawable amount is ₹6500"
-
- Scenario 5: Unauthorized Access
- - User tries to withdraw from other user's goal
- - Backend returns 404
- - Error: "Goal not found"
    \*/

// ============================================================================
// DATABASE SCHEMA
// ============================================================================

/\*\*

- Goal Schema (No changes needed - uses existing fields)
-
- Required fields for withdrawal:
- - \_id: ObjectId (goal identifier)
- - user: ObjectId (owner verification)
- - currentAmount: Number (balance in goal)
- - targetAmount: Number (goal target)
-
- Virtual fields used:
- - progressPercentage: Calculated as (currentAmount / targetAmount) _ 100
    _/

// ============================================================================
// TRANSACTION TYPES
// ============================================================================

/\*\*

- New transaction types supported:
- - "withdrawal_completed": Immediate withdrawal (with 80% lock)
- - "withdrawal_requested": (Legacy) For 48-hour approval system
- - "withdrawal_cancelled": Withdrawal cancellation
    \*/

// ============================================================================
// TESTING CHECKLIST
// ============================================================================

/\*\*

- TEST CASES TO VERIFY:
-
- 1.  Progress < 80%
- □ Button shows "Locked - Reach 80%"
- □ Button is disabled
- □ ProgressBar shows lock icon 🔒
- □ ProgressBar shows amount needed
- □ Clicking disabled button shows error toast
-
- 2.  Reaching 80% (Adding money)
- □ Button changes to "Withdraw Funds"
- □ Button becomes enabled
- □ ProgressBar shows unlock icon 🔓
- □ Unlock animation plays
- □ ProgressBar shows "Withdrawal ready!"
-
- 3.  Normal Withdrawal (Progress >= 80%)
- □ Click "Withdraw Funds"
- □ Modal appears
- □ Enter valid amount
- □ Click "Confirm Withdrawal"
- □ Funds are withdrawn immediately
- □ Goal balance updated
- □ Wallet balance increased
- □ Transaction created
- □ Success message shown
-
- 4.  Withdrawal Below 80%
- □ Manually call API with goal < 80%
- □ Backend returns 403
- □ Error message displayed in modal
- □ Goal not modified
-
- 5.  Edge Cases
- □ Withdraw exactly at 80%
- □ Withdraw more than available leaves goal at < 80%
- □ Multiple rapid withdrawals
- □ Withdrawal with 0 or negative amount (rejected)
- □ Withdrawal > current balance (rejected)
  \*/
