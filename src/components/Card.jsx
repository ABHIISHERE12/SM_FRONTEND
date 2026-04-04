import React from "react";

/**
 * Card — Premium glass card wrapper
 * Variants: default | premium | hero | success
 */
export const Card = ({
  children,
  variant = "default",
  interactive = false,
  className = "",
  ...props
}) => {
  const variantClass =
    variant === "premium"
      ? "card--premium"
      : variant === "hero"
        ? "card--hero"
        : variant === "success"
          ? "card--success"
          : "";

  const classes = [
    "card",
    variantClass,
    interactive ? "interactive" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

/**
 * StatCard — Metric display with icon, value, optional change indicator
 * Used in dashboard overview, analytics key metrics
 */
export const StatCard = ({ icon, label, value, change, className = "" }) => {
  const isPositive = change >= 0;

  return (
    <Card className={`stat-card ${className}`}>
      <div className="card-body">
        <div className="stat-card-header">
          <div className="stat-card-meta">
            <p className="stat-card-label">{label}</p>
            <p className="stat-card-value">{value}</p>
            {change !== undefined && (
              <p
                className={`stat-card-change ${isPositive ? "positive" : "negative"}`}
                style={{ display: 'flex', alignItems: 'center', gap: '2px' }}
              >
                {isPositive ? (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M12 19V5M5 12l7-7 7 7" />
                  </svg>
                ) : (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M12 5v14M19 12l-7 7-7-7" />
                  </svg>
                )}
                {Math.abs(change)}%
              </p>
            )}
          </div>
          {icon && <div className="stat-card-icon">{icon}</div>}
        </div>
      </div>
    </Card>
  );
};

/**
 * EmptyState — Zero-data placeholder with icon, title, description, optional action
 */
export const EmptyState = ({ icon, title, description, action, className = "" }) => {
  return (
    <Card className={className}>
      <div className="empty-state">
        <div className="empty-state-icon">{icon}</div>
        <h3 className="empty-state-title">{title}</h3>
        <p className="empty-state-description">{description}</p>
        {action && <div style={{ marginTop: "8px" }}>{action}</div>}
      </div>
    </Card>
  );
};

export default Card;
