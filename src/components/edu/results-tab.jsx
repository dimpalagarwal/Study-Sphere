import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { SummaryCard } from "./summary-card";
import { MCQs } from "./tab-mcqs";

export function ResultsTabs({ query, results }) {
  return (
    <Tabs defaultValue="videos" className="w-full">
      <div className="flex items-center justify-between">
        <h2 className="text-balance text-xl font-semibold text-gray-900">
          Results for “{query.trim() || "Photosynthesis"}”
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
          {results.videos.map((v) => (
            <VideoCard key={v.id} item={v} />
          ))}
        </GridCards>
      </TabsContent>

      <TabsContent value="articles" className="mt-6">
        <GridCards>
          {results.articles.map((a) => (
            <ArticleCard key={a.id} item={a} />
          ))}
        </GridCards>
      </TabsContent>

      <TabsContent value="summary" className="mt-6">
        <SummaryCard text={results.summary} />
      </TabsContent>

      <TabsContent value="mcqs" className="mt-6">
        <MCQs questions={results.mcqs} />
      </TabsContent>
    </Tabs>
  );
}

function GridCards({ children }) {
  return <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{children}</div>;
}

function VideoCard({ item }) {
  return (
    <Card className="overflow-hidden rounded-xl border-gray-200">
      <img
        src={item.thumbnail || "/placeholder.svg?height=160&width=320&query=video%20thumbnail"}
        alt={`Thumbnail for ${item.title}`}
        className="h-40 w-full object-cover"
      />
      <CardHeader>
        <CardTitle className="text-base text-gray-900">{item.title}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-gray-600">
        {item.duration && <p>Duration: {item.duration}</p>}
      </CardContent>
      <CardFooter className="flex items-center gap-2">
        <Button className="rounded-lg bg-blue-600 text-white hover:bg-blue-700">Play</Button>
        <Button variant="outline" className="rounded-lg bg-transparent">
          Save
        </Button>
      </CardFooter>
    </Card>
  );
}

function ArticleCard({ item }) {
  return (
    <Card className="overflow-hidden rounded-xl border-gray-200">
      <img
        src={item.thumbnail || "/placeholder.svg?height=160&width=320&query=article%20thumbnail"}
        alt={`Thumbnail for ${item.title}`}
        className="h-40 w-full object-cover"
      />
      <CardHeader>
        <CardTitle className="text-base text-gray-900">{item.title}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-gray-600">
        {item.source && <p>Source: {item.source}</p>}
      </CardContent>
      <CardFooter className="flex items-center gap-2">
        <Button className="rounded-lg bg-blue-600 text-white hover:bg-blue-700">Read</Button>
        <Button variant="outline" className="rounded-lg bg-transparent">
          Save
        </Button>
      </CardFooter>
    </Card>
  );
}
