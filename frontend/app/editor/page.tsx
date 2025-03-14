"use client";

import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import Showdown from "showdown"; // ✅ Correct import

export default function Home() {
  const [markdown, setMarkdown] = useState("# Hello Markdown");

const converter = new Showdown.Converter();

const html = converter.makeHtml(markdown);

  return (
    <div className="h-screen overflow-hidden flex">
      {/* Markdown Editor */}
      <div className="w-1/2 flex flex-col m-6">
        <Textarea
          className="flex-1 resize-none overflow-auto"
          placeholder="Start writing Markdown..."
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
        />
      </div>

      {/* HTML Preview */}
      <div className="w-1/2 flex flex-col m-6 border border-black/10 rounded-sm p-4 bg-white shadow">
        <div dangerouslySetInnerHTML={{ __html: html }} className="flex-1 overflow-auto" />
      </div>
    </div>
  );
}

