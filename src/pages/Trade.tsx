import { useNavigate } from "react-router-dom";
import SightUnseenTradePanel from "@/components/panels/SightUnseenTradePanel";
import { useToast } from "@/hooks/use-toast";

/**
 * Page for obtaining a sight-unseen trade estimate.
 *
 * At this stage the panel simply displays the copy and emits a
 * toast when the user opts to start the estimate. In the future
 * this could open a camera interface, upload photos, or redirect
 * to a valuation tool.
 */
export default function Trade() {
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
        <SightUnseenTradePanel
          onStartEstimate={() =>
            toast({
              title: "Trade Estimate",
              description:
                "Trade-in estimate functionality is not yet implemented.",
            })
          }
        />
      </div>
    </div>
  );
}