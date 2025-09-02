"use client";
import { useMemo, useState, useEffect } from "react";
import { SearchBar } from "./search-bar.jsx";
import { ResultsTabs } from "./results-tab.jsx";

export default function EducationApp() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);

  // rotating placeholder topics
  const placeholders = [
    "Photosynthesis",
    "Quantum Physics",
    "Machine Learning",
    "World War II",
    "Human Anatomy",
  ];
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 3000); // change every 3s
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (value) => {
    setQuery(value);
    setResults(generateMockResults(value));
  };

  const emptyState = useMemo(() => !results, [results]);

  return (
    <section aria-label="Educational search" className="px-4 py-10">
      {/* Hero Section with Tailwind animation */}
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="mb-3 text-pretty text-3xl font-semibold text-gray-900">
          <span className="animate-pulse text-blue-600">
            What do you want to learn today?
          </span>
        </h1>
        <p className="mb-8 text-gray-600">
          Search topics to explore videos, articles, a concise summary, and practice MCQs.
        </p>
        {/* Search bar with dynamic placeholder */}
        <SearchBar
          onSearch={handleSearch}
          placeholder={`Try "${placeholders[placeholderIndex]}"`}
        />
      </div>

      {emptyState ? (
        <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
          <HintCard
            title="Watch videos"
            desc="Get curated video explainers to learn faster."
          />
          <HintCard
            title="Read articles"
            desc="Skim key concepts with concise reads."
          />
          <HintCard
            title="Practice MCQs"
            desc="Check your understanding with interactive questions."
          />
        </div>
      ) : (
        <div className="mt-12">
          <ResultsTabs query={query} results={results} />
        </div>
      )}
    </section>
  );
}

function HintCard({ title, desc }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md hover:translate-y-[-2px] transition">
      <h3 className="mb-2 text-lg font-medium text-gray-900">{title}</h3>
      <p className="text-sm text-gray-600">{desc}</p>
    </div>
  );
}

// Mock generator to simulate results for the demo UI
function generateMockResults(topic) {
  const safeTopic = topic.trim() || "Photosynthesis";

  const videos = Array.from({ length: 6 }).map((_, i) => ({
    id: `v-${i}`,
    title: `${safeTopic} — Video Lesson ${i + 1}`,
    thumbnail: "/educational-video-thumbnail.png",
    duration: `${8 + i} min`,
  }));

  const articles = Array.from({ length: 6 }).map((_, i) => ({
    id: `a-${i}`,
    title: `Understanding ${safeTopic}: Key Points ${i + 1}`,
    thumbnail: "/educational-article-thumbnail.png",
    source: i % 2 === 0 ? "EduBlog" : "OpenLearn",
  }));

  const summary =
    `Here’s a concise explanation of ${safeTopic}:\n\n` +
    `• Definition: ${safeTopic} involves key concepts that form the foundation of the topic.\n` +
    `• Why it matters: Understanding ${safeTopic} helps connect theory to real-world applications.\n` +
    `• Core ideas: Break the topic into 2–4 memorable chunks, use analogies, and relate to prior knowledge.\n` +
    `• Tip: Practice by explaining ${safeTopic} to a friend in simple language.`;

  const mcqs = [
    {
      id: "q1",
      question: `Which statement best describes ${safeTopic}?`,
      options: [
        `It is unrelated to everyday life.`,
        `It’s a structured set of ideas with practical applications.`,
        `It refers only to historical events.`,
        `It means the same thing as creativity.`,
      ],
      correctIndex: 1,
    },
    {
      id: "q2",
      question: `A helpful way to remember ${safeTopic} is to:`,
      options: [
        `Avoid analogies and memorize everything verbatim.`,
        `Use analogies and connect it to what you already know.`,
        `Focus only on formulas without context.`,
        `Ignore practice and rely on last-minute cramming.`,
      ],
      correctIndex: 1,
    },
    {
      id: "q3",
      question: `When studying ${safeTopic}, which approach improves understanding?`,
      options: [
        `Explaining it simply to someone else.`,
        `Skipping examples and only reading definitions.`,
        `Avoiding questions.`,
        `Learning without taking any notes.`,
      ],
      correctIndex: 0,
    },
  ];

  return { videos, articles, summary, mcqs };
}
