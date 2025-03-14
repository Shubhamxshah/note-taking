"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <h1 className="text-4xl text-violet-500 text-center mx-auto py-10 bg-pink-200">
        <strong>Note Taking Markdown to Html</strong>
      </h1>

      <div className="flex justify-center">
        <div className="grid w-full max-w-sm items-center gap-1.5 border-dotted border-4 border-blue-600 p-8 m-8 h-64 bg-pink-200 cursor-pointer">
          <button
            type="button"
            onClick={() => router.push("/editor")}
            className="text-violet-500 font-bold text-2xl cursor-pointer"
          >
            Start with a blank template
          </button>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 border-dotted border-4 border-blue-600 p-8 m-8 h-64 bg-pink-200">
          <Label
            htmlFor="picture"
            className="text-2xl font-bold text-violet-500 cursor-pointer"
          >
            {" "}
            Upload a markdown file
          </Label>
          <Input id="picture" type="file" accept=".md" className="cursor-pointer" />
        </div>
      </div>
    </>
  );
}
