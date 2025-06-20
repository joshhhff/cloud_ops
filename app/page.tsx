import KPICards from '@/components/dashboard/kpi-cards';
import RevenueChart from '@/components/dashboard/revenue-chart';
import RecentActivity from '@/components/dashboard/recent-activity';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-600 mt-2">Welcome back! Here's what's happening with your business today.</p>
      </div>
      
      <KPICards />
      <RevenueChart />
      <RecentActivity />
    </div>
  );
}