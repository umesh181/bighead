"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import Image from "next/image";
import CreateNoteButton from "./create-note-button";
import { NoteCard } from "./note-card";

export default function NotesScreen() {
  const notes = useQuery(api.notes.getNotes);

  return (
    <main className="w-full space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">My Notes</h1>
        <CreateNoteButton />
      </div>

      {!notes && (
        <div className="grid grid-cols-3 gap-8">
          {new Array(8).fill("").map((_, i) => (
            <Card key={i} className="h-[200px] p-6 flex flex-col justify-between">
              <Skeleton className="h-[20px] rounded" />
              <Skeleton className="h-[20px] rounded" />
              <Skeleton className="h-[20px] rounded" />
              <Skeleton className="w-[80px] h-[40px] rounded" />
            </Card>
          ))}
        </div>
      )}

      {notes && notes.length === 0 && (
        <div className="py-12 flex flex-col justify-center items-center gap-8">
          <Image
            src="/silicon.gif"
            width="400"
            height="400"
            alt="Silicon Valley Meme"
          />
          <h2 className="text-2xl">You have no notes</h2>
          <CreateNoteButton />
        </div>
      )}

      {notes && notes.length > 0 && (
        <div className="grid grid-cols-3 gap-8">
          {notes.map((note) => <NoteCard key={note._id} note={note} />)}
        </div>
      )}
    </main>
  );
}