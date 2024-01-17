import { metaObject } from '@/config/site.config';
import ParkingOverviewDashboard from "@/app/shared/parking-overview/dashboard";

export const metadata = {
  ...metaObject('ParkingOverview'),
};

export default function ParkingOverviewDashboardPage() {
  return <ParkingOverviewDashboard />;
}
