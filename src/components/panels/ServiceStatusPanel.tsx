import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { copy } from "@/copy/en";

export default function ServiceStatusPanel({
  currentStepIndex = 0
}: {
  currentStepIndex?: number; // 0-based index into steps
}) {
  const c = copy.serviceStatus;
  const pct = Math.round(
    ((currentStepIndex + 1) / Math.max(1, c.steps.length)) * 100
  );

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <h3 className="text-2xl font-semibold mb-2">{c.title}</h3>
        <p className="text-muted-foreground mb-4">{c.lead}</p>

        <Progress value={pct} className="h-2 mb-4" />

        <ol className="space-y-1 mb-4">
          {c.steps.map((step, i) => (
            <li key={step} className={i <= currentStepIndex ? "font-medium" : ""}>
              {i + 1}. {step}
            </li>
          ))}
        </ol>

        <details>
          <summary className="cursor-pointer font-medium underline underline-offset-4">
            Open for more
          </summary>
          <p className="mt-3 text-xs text-muted-foreground">{c.legal}</p>
        </details>
      </CardContent>
    </Card>
  );
}
