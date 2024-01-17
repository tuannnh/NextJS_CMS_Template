import ParkingOverviewDashboard from '@/app/shared/parking-overview/dashboard';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject(),
};

export default function ParkingOverviewDashboardPage() {
  return <ParkingOverviewDashboard />;
}
