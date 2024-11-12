/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import dynamic from "next/dynamic";
//@ts-ignore
import { EditorProps } from "@tinymce/tinymce-react";
import React from "react";

const TinyMCEEditor = dynamic<EditorProps>(
  () => import("@tinymce/tinymce-react").then((mod) => mod.Editor as any),
  { ssr: false }
);

interface TextEditorProps {
  value: string;
  onEditorChange: (newContent: string) => void;
}

export default function TextEditor({ value, onEditorChange }: TextEditorProps) {
  return (
    <TinyMCEEditor
      apiKey="jt0v5659cglsubkyawg7wq3x0hwi19j23mhfmmtsl8ofyirj"
      onEditorChange={onEditorChange}
      value={value}
      init={{
        menubar: false,
        height: 200,
        plugins: [
          "anchor",
          "autolink",
          "charmap",
          "codesample",
          "emoticons",
          "image",
          "link",
          "lists",
          "media",
          "searchreplace",
          "table",
          "visualblocks",
          "wordcount",
          "checklist",
          "mediaembed",
          "casechange",
          "export",
          "formatpainter",
          "pageembed",
          "a11ychecker",
          "tinymcespellchecker",
          "permanentpen",
          "powerpaste",
          "advtable",
          "advcode",
          "editimage",
          "advtemplate",
          "ai",
          "mentions",
          "tinycomments",
          "tableofcontents",
          "footnotes",
          "mergetags",
          "autocorrect",
          "typography",
          "inlinecss",
          "markdown",
          // Early access to document converters
          "importword",
          "exportword",
          "exportpdf",
        ],
        toolbar:
          "undo redo | bold italic underline strikethrough | align lineheight | checklist numlist bullist",
        tinycomments_mode: "embedded",
        tinycomments_author: "Author name",
        mergetags_list: [
          { value: "First.Name", title: "First Name" },
          { value: "Email", title: "Email" },
        ],

        exportpdf_converter_options: {
          format: "Letter",
          margin_top: "1in",
          margin_right: "1in",
          margin_bottom: "1in",
          margin_left: "1in",
        },
        exportword_converter_options: { document: { size: "Letter" } },
        importword_converter_options: {
          formatting: {
            styles: "inline",
            resets: "inline",
            defaults: "inline",
          },
        },
      }}
      initialValue="Welcome to TinyMCE!"
    />
  );
}
