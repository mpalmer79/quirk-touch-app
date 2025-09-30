import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { copy } from "@/copy/en";

export default function AppointmentsPanel({
  onScheduleClick,
  onCallClick
}: {
  onScheduleClick?: () => void;
  onCallClick?: () => void;
}) {
  const c = copy.appointments;
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <h3 className="text-2xl font-semibold mb-2">{c.title}</h3>
        <p className="text-muted-foreground mb-4">{c.lead}</p>
        <ul className="list-disc pl-5 space-y-1 mb-6">
          {c.bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>

        {/* Open-for-more / Close pattern */}
        <details className="mt-2 select-none">
          <summary className="cursor-pointer font-medium underline underline-offset-4">
            Open for more
          </summary>
          <div className="mt-3 text-sm text-muted-foreground">
            Prefer to speak with a Service Advisor? We’re glad to help the
            traditional way—call us and we’ll get you on the books.
          </div>
        </details>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Button onClick={onScheduleClick}>{c.cta}</Button>
          <Button variant="secondary" onClick={onCallClick}>
            Call Service
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
