// // components/NoteCard.tsx
// "use client";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Doc } from "@/convex/_generated/dataModel";
// import Link from "next/link";

// export function NoteCard({ note }: { note: Doc<"notes"> }) {
//   return (
//     <Link href={`/dashboard/notes/${note._id}`}>
//       <Card className="cursor-pointer">
//         <CardHeader>
//           <CardTitle>{note.text.substring(0, 24)}...</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <p>{note.text.substring(0, 100)}...</p>
//         </CardContent>
//       </Card>
//     </Link>
//   );
// }
