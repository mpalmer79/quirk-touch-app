import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ServiceStatusPanel from "@/components/panels/ServiceStatusPanel";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

/**
 * Page for showing a customer's service progress.
 *
 * The progress bar is powered by ServiceStatusPanel. For demo
 * purposes there's a button to advance through the steps, but in
 * production this state would be driven by data from the service
 * department.
 */
export default function ServiceStatus() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(0);

  const handleNext = () => {
    setStep((prev) => {
      const next = Math.min(prev + 1, 5);
      toast({
        title: "Service Status Updated",
        description: `Advanced to step ${next + 1}.`,
      });
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-blue-500 underline hover:text-blue-700"
        >
          Back
        </button>
        <ServiceStatusPanel currentStepIndex={step} />
        <div className="mt-4 flex justify-end">
          <Button onClick={handleNext}>Advance Step</Button>
        </div>
      </div>
    </div>
  );
}