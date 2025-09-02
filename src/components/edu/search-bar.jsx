import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export function SearchBar({ onSearch, placeholder }) {
  const [value, setValue] = useState("");

  const submit = (e) => {
    e?.preventDefault();
    onSearch(value);
  };

  return (
    <form
      onSubmit={submit}
      className="flex w-full max-w-2xl mx-auto items-center gap-3"
    >
      <label htmlFor="topic-input" className="sr-only">
        Search topic
      </label>
      <Input
        id="topic-input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder || "Enter a topic…"} 
        className="h-12 flex-1 rounded-xl border-gray-300 hover:shadow-md focus:shadow-lg transition"
        aria-label="Enter a topic to search"
      />
      <Button
        type="submit"
        className="h-12 px-6 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
        aria-label="Search"
      >
        Search
      </Button>
    </form>
  );
}
