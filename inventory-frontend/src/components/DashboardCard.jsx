function DashboardCard({ title, value, variant = "primary" }) {
  return (
    <div className="card text-white bg-transparent border-0">
      <div className={`card-body bg-${variant} rounded-4 p-4 text-center`}>
        <h5 className="card-title">{title}</h5>
        <p className="display-6 mb-0">{value}</p>
      </div>
    </div>
  );
}

export default DashboardCard;
