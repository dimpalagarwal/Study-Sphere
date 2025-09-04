import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { SummaryCard } from "./summary-card";
import { MCQs } from "./tab-mcqs";

export function ResultsTabs({ query, results }) {
  // Ensure results object always has defaults
  const safeResults = {
    videos: results?.videos || [],
    articles: results?.articles || [],
    summary: results?.summary || "",
    mcqs: results?.mcqs || [],
  };

  return (
    <Tabs defaultValue="videos" className="w-full">
      <div className="flex items-center justify-between">
        <h2 className="text-balance text-xl font-semibold text-gray-900">
          Results for “{query?.trim() || "Photosynthesis"}”
        </h2>
      </div>

      <TabsList className="mt-4">
        <TabsTrigger value="videos">Videos</TabsTrigger>
        <TabsTrigger value="articles">Articles</TabsTrigger>
        <TabsTrigger value="summary">Summary</TabsTrigger>
        <TabsTrigger value="mcqs">MCQs</TabsTrigger>
      </TabsList>

      <TabsContent value="videos" className="mt-6">
        <GridCards>
          {safeResults.videos.map((v) => (
            <VideoCard key={v.id} item={v} />
          ))}
        </GridCards>
      </TabsContent>

      <TabsContent value="articles" className="mt-6">
        <GridCards>
          {safeResults.articles.map((a) => (
            <ArticleCard key={a.id} item={a} />
          ))}
        </GridCards>
      </TabsContent>

      <TabsContent value="summary" className="mt-6">
        <SummaryCard text={safeResults.summary} />
      </TabsContent>

      <TabsContent value="mcqs" className="mt-6">
        <MCQs questions={safeResults.mcqs} />
      </TabsContent>
    </Tabs>
  );
}

function GridCards({ children }) {
  return <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{children}</div>;
}

function VideoCard({ item }) {
  const [showPlayer, setShowPlayer] = React.useState(false);

  return (
    <Card className="overflow-hidden rounded-xl border-gray-200">
      <img src={item.thumbnail} alt={item.title} className="h-40 w-full object-cover" />
      <CardHeader>
        <CardTitle className="text-base text-gray-900">{item.title}</CardTitle>
      </CardHeader>
      <CardFooter className="flex items-center gap-2">
        <Button
          className="rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          onClick={() => setShowPlayer(true)}
        >
          Play
        </Button>

        <Button variant="outline" className="rounded-lg bg-transparent">Save</Button>

        {showPlayer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
            <div className="relative w-full max-w-3xl p-4 bg-white rounded-lg">
              <button
                className="absolute top-2 right-2 text-xl font-bold"
                onClick={() => setShowPlayer(false)}
              >
                ×
              </button>
              <iframe
                width="100%"
                height="480"
                src={`https://www.youtube.com/embed/${item.videoId}`}
                title={item.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}

function ArticleCard({ item }) {
  return (
    <Card className="overflow-hidden rounded-xl border-gray-200">
      <CardHeader>
        <CardTitle className="text-base text-gray-900">{item.title}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-gray-600">
        {item.source && <p>Source: {item.source}</p>}
      </CardContent>
      <CardFooter className="flex items-center gap-2">
        {/* Open article in a new tab */}
        <a href={item.url} target="_blank" rel="noopener noreferrer">
          <Button className="rounded-lg bg-blue-600 text-white hover:bg-blue-700">
            Read
          </Button>
        </a>

        {/* Optional save button */}
        <Button variant="outline" className="rounded-lg bg-transparent">
          Save
        </Button>
      </CardFooter>
    </Card>
  );
}
