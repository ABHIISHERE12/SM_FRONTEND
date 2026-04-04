import { useState } from "react";
import ProgressBar from "./ProgressBar";
import "../assets/css/withdrawal-card.css";

/**
 * WithdrawalCard Component
 * Displays a goal with withdrawal capability and lock validation
 *
 * @param {Object} props
 * @param {Object} props.goal - Goal object
 * @param {string} props.goal._id - Goal ID
 * @param {string} props.goal.title - Goal title
 * @param {number} props.goal.currentAmount - Current savings
 * @param {number} props.goal.targetAmount - Target amount
 * @param {Function} props.onWithdraw - Callback when withdrawal is successful
 * @param {Function} props.onError - Callback when withdrawal fails
 * @param {boolean} props.isLoading - Loading state
 */
const WithdrawalCard = ({ goal, onWithdraw, onError, isLoading = false }) => {
  const [showModal, setShowModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const progress = Math.min(
    Math.round((goal.currentAmount / goal.targetAmount) * 100),
    100,
  );

  const isWithdrawable = progress >= 80;
  const maxWithdrawable = goal.currentAmount;

  const handleOpenModal = () => {
    if (!isWithdrawable) {
      setError(
        "Withdrawal is locked until you reach 80% of your savings goal.",
      );
      setTimeout(() => setError(""), 4000);
      return;
    }
    setShowModal(true);
    setError("");
    setSuccess("");
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setWithdrawAmount("");
    setError("");
    setSuccess("");
  };

  const handleWithdraw = async () => {
    const amount = parseFloat(withdrawAmount);

    // Validation
    if (!amount || amount <= 0) {
      setError("Please enter a valid withdrawal amount");
      return;
    }

    if (amount > maxWithdrawable) {
      setError(`Maximum withdrawable amount is ₹${maxWithdrawable.toFixed(2)}`);
      return;
    }

    try {
      // Call the withdrawal handler
      if (onWithdraw) {
        await onWithdraw({
          goalId: goal._id,
          amount: amount,
        });
      }

      setSuccess(`Successfully withdrew ₹${amount.toFixed(2)}!`);
      setWithdrawAmount("");
      setTimeout(() => {
        handleCloseModal();
        setSuccess("");
      }, 2000);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Withdrawal failed. Please try again.";
      setError(errorMessage);
      if (onError) {
        onError(errorMessage);
      }
    }
  };

  const handleMaxClick = () => {
    setWithdrawAmount(maxWithdrawable.toFixed(2));
  };

  return (
    <div className="withdrawal-card">
      {/* Card Header */}
      <div className="withdrawal-card-header">
        <div className="goal-info">
          <h3 className="goal-title">{goal.title}</h3>
          <p className="goal-category">{goal.category || "Savings"}</p>
        </div>
        <div className="progress-badge">
          <span className={`badge ${isWithdrawable ? "unlocked" : "locked"}`}>
            {isWithdrawable ? "🔓" : "🔒"}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="withdrawal-progress">
        <ProgressBar
          currentAmount={goal.currentAmount}
          targetAmount={goal.targetAmount}
          goalTitle={goal.title}
          showAnimation={true}
        />
      </div>

      {/* Error/Success Messages */}
      {error && (
        <div className="withdrawal-message error">
          <span className="icon">⚠️</span>
          <span className="text">{error}</span>
        </div>
      )}

      {success && (
        <div className="withdrawal-message success">
          <span className="icon">✓</span>
          <span className="text">{success}</span>
        </div>
      )}

      {/* Withdrawal Button */}
      <button
        className={`withdrawal-button ${isWithdrawable ? "enabled" : "disabled"}`}
        onClick={handleOpenModal}
        disabled={!isWithdrawable || isLoading}
        title={
          isWithdrawable
            ? "Click to withdraw from this goal"
            : "Reach 80% progress to unlock withdrawal"
        }
      >
        {isLoading
          ? "Processing..."
          : isWithdrawable
            ? "Withdraw Funds"
            : "Locked - Reach 80%"}
      </button>

      {/* Withdrawal Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Withdraw from {goal.title}</h2>
              <button className="modal-close" onClick={handleCloseModal}>
                ✕
              </button>
            </div>

            <div className="modal-body">
              {/* Current Balance */}
              <div className="balance-info">
                <span className="label">Available to withdraw:</span>
                <span className="amount">₹{goal.currentAmount.toFixed(2)}</span>
              </div>

              {/* Withdrawal Amount Input */}
              <div className="input-group">
                <label htmlFor="withdrawAmount">Withdrawal Amount *</label>
                <div className="input-wrapper">
                  <span className="currency">₹</span>
                  <input
                    id="withdrawAmount"
                    type="number"
                    min="0.01"
                    step="0.01"
                    max={maxWithdrawable}
                    value={withdrawAmount}
                    onChange={(e) => {
                      setWithdrawAmount(e.target.value);
                      setError("");
                    }}
                    placeholder="Enter amount"
                    disabled={isLoading}
                  />
                </div>
                <button
                  className="max-button"
                  onClick={handleMaxClick}
                  disabled={isLoading}
                >
                  Max
                </button>
              </div>

              {/* Error Message */}
              {error && (
                <div className="modal-error">
                  <span>⚠️ {error}</span>
                </div>
              )}

              {/* Info Box */}
              <div className="info-box">
                <p>
                  <strong>Note:</strong> The withdrawal will be processed
                  immediately. The amount will be transferred to your wallet.
                </p>
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="button-secondary"
                onClick={handleCloseModal}
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                className="button-primary"
                onClick={handleWithdraw}
                disabled={!withdrawAmount || isLoading}
              >
                {isLoading ? "Processing..." : "Confirm Withdrawal"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WithdrawalCard;
