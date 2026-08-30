export const AdminDashboard = () => {
  const cards = [
    {
      id: "total",
      icon: (
        <div className="size-8 bg-primary-500 rounded-lg flex items-center justify-center">
          <UserGroup className="text-white size-4.5" />
        </div>
      ),
      title: "Total Users",
      value: statistics?.totalUsers ?? 0,
      actionLabel: "All Users",
      linkPath: "user-management",
    },
    {
      id: "active",
      icon: (
        <div className="size-8 bg-success-500 rounded-lg flex items-center justify-center">
          <UserCheck01 className="text-white size-4.5" />
        </div>
      ),
      title: "Active Users",
      value: statistics?.activeUsers ?? 0,
    },
    {
      id: "deactivated",
      icon: (
        <div className="size-8 bg-error-500 rounded-lg flex items-center justify-center">
          <UserRemove02 className="text-white size-4.5" />
        </div>
      ),
      title: "Deactivated Users",
      value: statistics?.deactivatedUsers ?? 0,
    },
    {
      id: "pending",
      icon: (
        <div className="size-8 bg-warning-500 rounded-lg flex items-center justify-center">
          <UserQuestion01 className="text-white size-4.5" />
        </div>
      ),
      title: "Pending Invitations",
      value: statistics?.pendingInvitations ?? 0,
    },
  ];
  return (
    <div className="border border-primary">
      <h2 className="text-grey-700 text-2xl font-medium leading-8">
        Hiring portfolio snapshot
      </h2>

      <div className="flex gap-8"></div>
    </div>
  );
};
