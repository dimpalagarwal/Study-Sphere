import React, { useState, useMemo } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";

export function MCQs({ questions }) {
  const [answers, setAnswers] = useState(
    Object.fromEntries(questions.map((q) => [q.id, null]))
  );
  const [submitted, setSubmitted] = useState(false);

  const score = useMemo(() => {
    if (!submitted) return 0;
    return questions.reduce((sum, q) => {
      const a = answers[q.id];
      return sum + (a === q.correctIndex ? 1 : 0);
    }, 0);
  }, [submitted, answers, questions]);

  const onSelect = (qid, idx) => {
    setAnswers((prev) => ({ ...prev, [qid]: idx }));
  };

  const onSubmit = () => setSubmitted(true);
  const onReset = () => {
    setAnswers(Object.fromEntries(questions.map((q) => [q.id, null])));
    setSubmitted(false);
  };

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {questions.map((q) => {
        const selected = answers[q.id];
        const isCorrect = submitted && selected === q.correctIndex;
        const isIncorrect = submitted && selected !== null && selected !== q.correctIndex;

        return (
          <Card key={q.id} className="rounded-xl border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900">{q.question}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2" role="radiogroup" aria-label={q.question}>
              {q.options.map((opt, idx) => {
                const chosen = selected === idx;
                const base = "w-full rounded-lg border px-3 py-2 text-left text-sm transition-colors";
                const state = chosen
                  ? "border-blue-600 bg-blue-50 text-gray-900"
                  : "border-gray-300 bg-white text-gray-800 hover:border-blue-600";
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onSelect(q.id, idx)}
                    className={`${base} ${state}`}
                    role="radio"
                    aria-checked={chosen}
                    aria-label={`Option ${idx + 1}: ${opt}`}
                  >
                    <span className="mr-2 inline-block h-4 w-4 rounded-full border border-gray-400 align-[-1px]">
                      <span
                        className={`block h-full w-full rounded-full ${chosen ? "bg-blue-600" : "bg-transparent"}`}
                        aria-hidden="true"
                      />
                    </span>
                    {opt}
                  </button>
                );
              })}
              {submitted ? (
                <div className="mt-2 text-sm">
                  {isCorrect && <p className="font-medium text-gray-900">Correct</p>}
                  {isIncorrect && <p className="font-medium text-gray-900">Review the concept and try again</p>}
                </div>
              ) : null}
            </CardContent>
            <CardFooter className="flex items-center gap-2">
              <Button onClick={onSubmit} className="rounded-lg bg-blue-600 text-white hover:bg-blue-700">
                Submit
              </Button>
              <Button variant="outline" className="rounded-lg bg-transparent" onClick={onReset}>
                Reset
              </Button>
            </CardFooter>
          </Card>
        );
      })}

      {submitted && (
        <Card className="rounded-xl border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-900">Your Score</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-700">
            You answered {score} out of {questions.length} correctly.
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="rounded-lg bg-transparent" onClick={onReset}>
              Try Again
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
