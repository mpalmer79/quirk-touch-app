import { useNavigate } from "react-router-dom";
import TouchlessCheckinPanel from "@/components/panels/TouchlessCheckinPanel";
import { useToast } from "@/hooks/use-toast";

/**
 * Page for touchless check-in.
 *
 * This page surfaces the TouchlessCheckinPanel and wires the CTA to
 * a toast. Future enhancements might integrate with a QR code
 * generator or a secure key drop process.
 */
export default function Checkin() {
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
        <TouchlessCheckinPanel
          onCheckIn={() =>
            toast({
              title: "Touchless Check-In",
              description:
                "Touchless check-in functionality is not yet implemented.",
            })
          }
        />
      </div>
    </div>
  );
}