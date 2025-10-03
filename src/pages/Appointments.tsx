import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import AppointmentsPanel from "@/components/panels/AppointmentsPanel";

export default function Appointments() {
  const navigate = useNavigate();
  const { toast } = useToast();

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <button onClick={() => navigate(-1)} className="mb-4 text-blue-600 underline">
          ← Back
        </button>
        <h1 className="text-3xl font-bold mb-6">Schedule Service</h1>

        <AppointmentsPanel
          onScheduleClick={() => navigate("/schedule")}
        />
      </div>
    </div>
  );
}
