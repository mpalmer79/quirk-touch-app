import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FloatingScheduleButton = () => {
  const navigate = useNavigate();
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        variant="accent"
        size="lg"
        className="shadow-2xl hover:scale-105 transition-transform rounded-full px-6"
        onClick={() => navigate("/schedule")}
      >
        <Calendar className="w-5 h-5" />
        Schedule Service
      </Button>
    </div>
  );
};

export default FloatingScheduleButton;
