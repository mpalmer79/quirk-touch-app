import { useNavigate } from "react-router-dom";
import LoyaltyPanel from "@/components/panels/LoyaltyPanel";
import { useToast } from "@/hooks/use-toast";

/**
 * Page for joining the service rewards program.
 *
 * Currently this page renders the LoyaltyPanel and shows a toast
 * notification when the user clicks join. In the future this page
 * could collect user details and submit them to a rewards system.
 */
export default function Loyalty() {
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
        <LoyaltyPanel
          onJoin={() =>
            toast({
              title: "Join Rewards",
              description:
                "Joining the rewards program is not yet implemented.",
            })
          }
        />
      </div>
    </div>
  );
}