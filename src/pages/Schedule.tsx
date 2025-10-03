import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

/**
 * Schedule Service page
 *
 * This component provides a simple four‑step wizard for scheduling a
 * service appointment. It bypasses the GM/Quirk sign‑in page shown on
 * quirkchevynh.com and instead drops the user directly into the
 * appointment flow. The steps roughly mirror the GM online scheduler:
 *  1. Choose your vehicle (year, make, model, mileage)
 *  2. Select requested services
 *  3. Pick a date and time
 *  4. Review your selections
 *
 * The implementation here uses local state only – there is no
 * integration with any back‑end API. You can extend this later to
 * persist the appointment to a server or third‑party service. The page
 * is self‑contained so it can be plugged directly into the router.
 */
export default function Schedule() {
  const navigate = useNavigate();
  // wizard step index: 1–4
  const [step, setStep] = useState(1);
  // vehicle selection
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [mileage, setMileage] = useState("");
  // service selection
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  // appointment date/time
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // simple lists for demonstration. In a real implementation these
  // should be loaded from an API or configuration file.
  const years = Array.from({ length: 15 }, (_, i) => (new Date().getFullYear() - i).toString());
  const makes = ["Chevrolet", "GMC", "Buick", "Cadillac", "Other"];
  const modelsByMake: Record<string, string[]> = {
    Chevrolet: ["Bolt", "Blazer", "Colorado", "Equinox", "Silverado 1500", "Suburban", "Tahoe"],
    GMC: ["Acadia", "Canyon", "Savana 2500", "Sierra 1500", "Yukon"],
    Buick: ["Enclave", "Encore GX", "Envista"],
    Cadillac: ["Escalade", "XT4", "XT5", "XT6"],
    Other: ["Hummer EV Pickup", "Hummer EV SUV", "Other"],
  };
  const commonServices = [
    { id: "maintenance", label: "Scheduled Maintenance" },
    { id: "oil_change", label: "Oil Change" },
    { id: "oil_rotation", label: "Oil Change w/ Tire Rotation" },
    { id: "cabin_filter", label: "Replace Cabin Air Filter" },
    { id: "wiper_blades", label: "Replace Front Wiper Blades" },
  ];

  // derived list of models based on selected make
  const models = make ? modelsByMake[make] ?? [] : [];

  // helpers to toggle service selection
  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  };

  // navigate back one step, or to home if already at first step
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate(-1);
    }
  };

  // compute whether the continue button should be disabled based on step
  const isContinueDisabled = () => {
    if (step === 1) return !(year && make && model);
    if (step === 2) return selectedServices.length === 0;
    if (step === 3) return !(date && time);
    return false;
  };

  // render step indicator
  const renderStepIndicator = () => {
    const labels = ["Vehicle", "Services", "Appointment", "Review"];
    return (
      <div className="flex items-center justify-center gap-4 my-4">
        {labels.map((label, index) => {
          const number = index + 1;
          const isActive = step === number;
          const isCompleted = step > number;
          return (
            <div key={label} className="flex items-center gap-2">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                  isActive
                    ? "border-primary bg-primary text-primary-foreground"
                    : isCompleted
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-secondary bg-secondary text-secondary-foreground"
                }`}
              >
                {number}
              </div>
              <span className={`text-sm ${isActive ? "font-semibold" : "text-muted-foreground"}`}>{label}</span>
              {index < labels.length - 1 && <div className="w-8 h-px bg-border" />}
            </div>
          );
        })}
      </div>
    );
  };

  // render content for each step
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <h2 className="text-xl font-bold mb-4">Select Vehicle</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-1 text-sm font-medium">Year</label>
                <Select value={year} onValueChange={setYear}>
                  <SelectTrigger>
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((y) => (
                      <SelectItem key={y} value={y}>{y}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Make</label>
                <Select
                  value={make}
                  onValueChange={(v) => {
                    setMake(v);
                    setModel("");
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Make" />
                  </SelectTrigger>
                  <SelectContent>
                    {makes.map((m) => (
                      <SelectItem key={m} value={m}>{m}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="sm:col-span-2">
                <label className="block mb-1 text-sm font-medium">Model</label>
                <Select value={model} onValueChange={setModel} disabled={!make}>
                  <SelectTrigger>
                    <SelectValue placeholder={make ? "Model" : "Select make first"} />
                  </SelectTrigger>
                  <SelectContent>
                    {models.map((mdl) => (
                      <SelectItem key={mdl} value={mdl}>{mdl}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="sm:col-span-2">
                <label className="block mb-1 text-sm font-medium">Mileage (optional)</label>
                <Input
                  type="number"
                  placeholder="Mileage"
                  value={mileage}
                  onChange={(e) => setMileage(e.target.value)}
                />
              </div>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h2 className="text-xl font-bold mb-4">Common Services</h2>
            <p className="mb-4 text-sm text-muted-foreground">
              Select the services you require. You can choose multiple.
            </p>
            <div className="space-y-2 mb-4">
              {commonServices.map((svc) => (
                <label key={svc.id} className="flex items-center space-x-2 text-sm">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 rounded border-input text-primary"
                    checked={selectedServices.includes(svc.id)}
                    onChange={() => toggleService(svc.id)}
                  />
                  <span>{svc.label}</span>
                </label>
              ))}
            </div>
          </>
        );
      case 3:
        return (
          <>
            <h2 className="text-xl font-bold mb-4">Choose Appointment</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-1 text-sm font-medium">Date</label>
                <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Time</label>
                <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
              </div>
            </div>
          </>
        );
      case 4:
        return (
          <>
            <h2 className="text-xl font-bold mb-4">Review & Submit</h2>
            <div className="space-y-2 mb-4 text-sm">
              <p><strong>Year:</strong> {year}</p>
              <p><strong>Make:</strong> {make}</p>
              <p><strong>Model:</strong> {model}</p>
              {mileage && <p><strong>Mileage:</strong> {mileage}</p>}
              <p>
                <strong>Services:</strong>
                {selectedServices.length > 0
                  ? " " + selectedServices
                      .map((id) => commonServices.find((svc) => svc.id === id)?.label || id)
                      .join(", ")
                  : " None"}
              </p>
              <p><strong>Date:</strong> {date}</p>
              <p><strong>Time:</strong> {time}</p>
            </div>
            <p className="mb-4 text-sm text-muted-foreground">
              This is a demonstration. Submitting will not book an actual appointment.
            </p>
          </>
        );
      default:
        return null;
    }
  };

  const handleContinue = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      alert(
        `Thank you! Your appointment request has been recorded.\n\nVehicle: ${year} ${make} ${model}${
          mileage ? `, ${mileage} miles` : ""
        }\nServices: ${selectedServices
          .map((id) => commonServices.find((s) => s.id === id)?.label || id)
          .join(", ")}\nDate & Time: ${date} ${time}`,
      );
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-background py-6 px-4">
      <div className="container mx-auto max-w-2xl">
        <button onClick={handleBack} className="mb-4 text-blue-500 underline hover:text-blue-700">
          Back
        </button>
        <Card>
          <CardContent className="p-6">
            {renderStepIndicator()}
            {renderStepContent()}
            <div className="flex justify-end gap-2 mt-6">
              {step > 1 && (
                <Button variant="secondary" onClick={handleBack}>
                  Previous
                </Button>
              )}
              <Button onClick={handleContinue} disabled={isContinueDisabled()}>
                {step < 4 ? "Continue" : "Submit"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
