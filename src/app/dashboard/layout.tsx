
import DashboardLayout from "@/components/DashboardLayout";
import { ThemeProvider } from "@/contexts/ThemeContext";

export default function DashboardLayoutWrapper({
  children,
}: { 
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </ThemeProvider>
  );
}

