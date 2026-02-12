import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { EffectPreset } from './siteWideEffectPresets';

interface AdminEffectPresetPreviewProps {
  preset: EffectPreset;
}

export default function AdminEffectPresetPreview({ preset }: AdminEffectPresetPreviewProps) {
  return (
    <Card className="border-2 bg-gradient-to-br from-muted/50 to-muted/30">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div
            className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg text-3xl shadow-md"
            style={{ backgroundColor: `${preset.color}20` }}
          >
            {preset.icon}
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <h4 className="font-semibold">{preset.name}</h4>
              <Badge variant="secondary" className="text-xs">
                {preset.duration / 1000}s
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{preset.description}</p>
            <div className="flex items-center gap-2">
              <div
                className="h-4 w-4 rounded-full border-2 border-white shadow-sm"
                style={{ backgroundColor: preset.color }}
              />
              <span className="text-xs text-muted-foreground">Primary color</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
