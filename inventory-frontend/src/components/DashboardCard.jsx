function DashboardCard({ title, value, variant = "primary" }) {
  const getIcon = () => {
    switch (variant) {
      case "primary": return "📦";
      case "success": return "🤝";
      case "warning": return "🛒";
      case "danger": return "⚠️";
      default: return "📊";
    }
  };

  const getGlowColor = () => {
    switch (variant) {
      case "primary": return "rgba(99, 102, 241, 0.15)";
      case "success": return "rgba(20, 184, 166, 0.15)";
      case "warning": return "rgba(245, 158, 11, 0.15)";
      case "danger": return "rgba(239, 68, 68, 0.15)";
      default: return "rgba(255, 255, 255, 0.05)";
    }
  };

  const getBorderColor = () => {
    switch (variant) {
      case "primary": return "rgba(99, 102, 241, 0.3)";
      case "success": return "rgba(20, 184, 166, 0.3)";
      case "warning": return "rgba(245, 158, 11, 0.3)";
      case "danger": return "rgba(239, 68, 68, 0.3)";
      default: return "rgba(255, 255, 255, 0.1)";
    }
  };

  return (
    <div 
      className="glass-card p-4 d-flex align-items-center justify-content-between text-white"
      style={{ 
        background: `linear-gradient(135deg, rgba(31, 41, 55, 0.6) 0%, ${getGlowColor()} 100%)`,
        borderColor: getBorderColor()
      }}
    >
      <div>
        <h6 className="card-title-custom text-muted-custom mb-1 text-uppercase small tracking-wider">{title}</h6>
        <h2 className="m-0 fw-bold">{value}</h2>
      </div>
      <div 
        className="d-flex align-items-center justify-content-center rounded-3 fs-3"
        style={{ 
          width: 50, 
          height: 50, 
          background: `rgba(255, 255, 255, 0.05)`,
          border: `1px solid ${getBorderColor()}`
        }}
      >
        {getIcon()}
      </div>
    </div>
  );
}

export default DashboardCard;

