import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";

export function SummaryCard({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // no-op
    }
  };

  return (
    <Card className="rounded-xl border-gray-200">
      <CardHeader>
        <CardTitle className="text-gray-900">AI-generated Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <pre className="whitespace-pre-wrap rounded-lg bg-white text-sm leading-6 text-gray-700">
          {text}
        </pre>
      </CardContent>
      <CardFooter className="flex items-center gap-2">
        <Button
          onClick={handleCopy}
          className="rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          aria-label="Copy summary to clipboard"
        >
          {copied ? "Copied" : "Copy"}
        </Button>
      </CardFooter>
    </Card>
  );
}
