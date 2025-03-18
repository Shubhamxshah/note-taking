"use client";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";
import { z } from "zod";
import axios from "axios";
import { useUser } from "./hooks/md-context";

const Backend_url = process.env.Backend_url || "http://localhost:8080";

const formSchema = z.object({
  file: z
    .any()
    .refine((file) => file?.length === 1, "file is required")
    .refine(
      (file) =>
        file?.[0]?.type === "text/markdown" || file?.[0]?.name.endsWith(".md"),
      "only markdown (.md) files are allowed.",
    ),
});

export default function Home() {
  const router = useRouter();
  const {setMarkdown} = useUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: null,
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast("extracting text from file, please wait");

    const formData = new FormData(); // formdata is used to send files 
    formData.append("file", data.file[0]); // data.file[0] is the first file since data.file is a filelist (if multiple do a loop and append all)

    console.log(data);
    axios
      .post(`${Backend_url}/note/extract_md`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response)
        toast("file uploaded successfully");
        setMarkdown(response.data.content);
        router.push("/editor");
      })
      .catch(() => {
        toast("error uploading file");
      });
  }

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
        <div className="w-full max-w-sm  flex  justify-center items-center gap-1.5 border-dotted border-4 border-blue-600 m-8 h-64 bg-pink-200">
          <Toaster />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-2/3 space-y-6"
            >
              <FormField
                control={form.control}
                name="file"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-violet-500 font-bold ">
                      Upload markdown file to start
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="shadcn"
                        type="file"
                        accept=".md"
                        onChange={(event) => field.onChange(event.target.files)}
                      />
                    </FormControl>
                    <FormDescription className="text-violet-500">
                      (should end with .md extension)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="mx-auto w-32 flex justify-center"
                type="submit"
              >
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
