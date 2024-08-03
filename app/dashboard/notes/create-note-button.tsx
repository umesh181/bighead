"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { btnIconStyles, btnStyles } from "@/styles/styles";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import CreateNoteForm from "./create-note-form";

export default function CreateNoteButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button className={btnStyles}>
          <PlusIcon className={btnIconStyles} /> Create Note
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a Note</DialogTitle>
          <DialogDescription>
            Type the title of your note.
          </DialogDescription>

          <CreateNoteForm
            onNoteCreated={() => {
              setIsOpen(false);
              toast({
                title: "Note created",
                description: "Your note has been created successfully",
              });
            }}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}