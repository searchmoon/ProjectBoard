import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface ErrorFallbackProps {
  error: Error;
  reset?: () => void;
}

export function ErrorFallback({ error, reset }: ErrorFallbackProps) {
  return (
    <div className="flex items-center justify-center min-h-[400px] p-6">
      <Card className="w-full max-w-md shadow-lg border-destructive/20">
        <CardHeader className="bg-destructive/5 border-b border-destructive/10">
          <CardTitle className="text-destructive flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Something went wrong
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="bg-muted/50 p-4 rounded-md overflow-auto max-h-[200px] text-sm font-mono">
            {error.message}
          </div>
        </CardContent>
        {reset && (
          <CardFooter className="border-t bg-muted/20 flex justify-end">
            <Button variant="outline" onClick={reset} className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Try again
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
