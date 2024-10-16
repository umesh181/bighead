/* eslint-disable react/jsx-key */
"use client";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import { useState } from "react";
import { SearchForm } from "./search-form";
export default function SearchPage() {
  const [results, setResults] =
    useState<typeof api.search.searchAction._returnType>(null);
  return (
    <main className="w-full space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Search</h1>
      </div>
      <SearchForm setResults={setResults} />
      <ul className="flex flex-col gap-4">
        {results?.map((result) => {
          if (result.type === "notes") {
            return (
              <Link href={`/dashboard/notes/noteId${result.record._id}`}>
                <li className="hover:bg-slate-700 bg-slate-800 rounded p-4 whitespace-pre-line">
                  type: Note {result.score}
                  {result.record.plainTextContent.substring(0, 200) + "..."}
                </li>
              </Link>
            );
          } else {
            return (
              <Link href={`/dashboard/documents/${result.record._id}`}>
                <li className="hover:bg-slate-700 bg-slate-800 rounded p-4 whitespace-pre-line">
                  type: Document {result.score}
                  {result.record.title}
                  {result.record.description}
                </li>
              </Link>
            );
          }
        })}
      </ul>
    </main>
  );
}