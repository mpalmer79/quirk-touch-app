import { useNavigate } from "react-router-dom";
import AppointmentsPanel from "@/components/panels/AppointmentsPanel";
import { useToast } from "@/hooks/use-toast";

/**
 * Page for scheduling a service appointment.
 *
 * Currently this page surfaces the existing AppointmentsPanel and
 * emits a toast notification when the user tries to schedule. In a
 * future iteration this could post form data to an API or open a
 * scheduling widget. The secondary action initiates a phone call.
 */
export default function Appointments() {
  const navigate = useNavigate();
  const { toast } = useToast();
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-blue-500 underline hover:text-blue-700"
        >
          Back
        </button>
        <AppointmentsPanel
          onScheduleClick={() =>
            toast({
              title: "Schedule Service",
              description: "Scheduling functionality is not yet implemented.",
            })
          }
          onCallClick={() => {
            // Use a tel: link to initiate a phone call. On desktop this will
            // prompt the user to open their default calling app.
            window.location.href = "tel:8665598193";
          }}
        />
      </div>
    </div>
  );
}
