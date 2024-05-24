"use client";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import python from "highlight.js/lib/languages/python";
import ruby from "highlight.js/lib/languages/ruby";
import csharp from "highlight.js/lib/languages/csharp";
import java from "highlight.js/lib/languages/java";
import go from "highlight.js/lib/languages/go";
import rust from "highlight.js/lib/languages/rust";
import c from "highlight.js/lib/languages/c";
import cpp from "highlight.js/lib/languages/cpp";
import * as htmlToImage from "html-to-image";


import "highlight.js/styles/atom-one-dark.css";

import { useState, useEffect } from "react";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("python", python);
hljs.registerLanguage("ruby", ruby);
hljs.registerLanguage("csharp", csharp);
hljs.registerLanguage("java", java);
hljs.registerLanguage("go", go);
hljs.registerLanguage("rust", rust);
hljs.registerLanguage("c", c);
hljs.registerLanguage("cpp", cpp);

export default function Component() {
  const [language, setLanguage] = useState("javascript");
  const [theme, setTheme] = useState("dark");
  const [code, setCode] = useState(`function sayHello(name) {
    console.log(\`Hello, \${name}!\`);
  }`);
  const [padding, setPadding] = useState({
    top: 16,
    right: 24,
    bottom: 16,
    left: 24,
  });

  useEffect(() => {
    hljs.highlightAll();
  }, [language, theme]);

  const highlightedCode = hljs.highlight(code, {
    language: language,
  }).value;

  const onPaddingChange = (direction: string, value: number) => {
    if (value < 0 || value > 128) {
      toast.error("Padding must be between 0 and 128");
      return;
    }
    setPadding((prev) => ({
      ...prev,
      [direction]: value,
    }));
  };

  const onlanguagechange = (value: string) => {
    setLanguage(value);
    hljs.highlightAll();
  };

  const onThemeChange = (value:string) => {
    setTheme(value);
  };

  const onExportToPng = () => {
    const pre = document.querySelector("pre");

    htmlToImage
    // @ts-ignore
      .toPng(pre)
      .then((dataUrl) => {
        const a = document.createElement("a");
        a.href = dataUrl;
        a.download = "code.png";
        document.body.appendChild(a); // Append anchor to the document body
        a.click();
        document.body.removeChild(a); // Remove anchor from the document body
      })
      .catch((error) => {
        console.error("Error exporting to PNG:", error);
      });
  };

  return (
    <div className="flex h-screen w-full">
      <div className="hidden w-64 border-r bg-gray-100 p-6 dark:border-gray-800 dark:bg-gray-900 lg:block">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="language">
              Language
            </label>
            <Select
              defaultValue="javascript"
              value={language}
              onValueChange={onlanguagechange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="ruby">Ruby</SelectItem>
                <SelectItem value="csharp">C#</SelectItem>
                <SelectItem value="java">Java</SelectItem>
                <SelectItem value="go">Go</SelectItem>
                <SelectItem value="rust">Rust</SelectItem>
                <SelectItem value="c">C</SelectItem>
                <SelectItem value="cpp">C++</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="theme">
              Theme
            </label>
            <Select
              defaultValue="dark"
              value={theme}
              onValueChange={onThemeChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 mb-10">
            <label className="text-sm font-medium" htmlFor="padding">
              Padding
            </label>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="padding-top">Top</Label>
                <Input
                  className="w-full"
                  max="128"
                  defaultValue={padding.top}
                  onChange={(e) =>
                    onPaddingChange("top", parseInt(e.target.value))
                  }
                  id="padding-top"
                  min="0"
                  type="number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="padding-right">Right</Label>
                <Input
                  className="w-full"
                  max="128"
                  defaultValue={padding.right}
                  onChange={(e) =>
                    onPaddingChange("right", parseInt(e.target.value))
                  }
                  id="padding-right"
                  min="0"
                  type="number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="padding-bottom">Bottom</Label>
                <Input
                  className="w-full"
                  max="128"
                  defaultValue={padding.bottom}
                  onChange={(e) =>
                    onPaddingChange("bottom", parseInt(e.target.value))
                  }
                  id="padding-bottom"
                  min="0"
                  type="number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="padding-left">Left</Label>
                <Input
                  className="w-full"
                  max="128"
                  defaultValue={padding.left}
                  onChange={(e) =>
                    onPaddingChange("left", parseInt(e.target.value))
                  }
                  min="0"
                  id="padding-left"
                  type="number"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 p-6">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b pb-4 dark:border-gray-800">
            <h1 className="text-2xl font-bold">Code Snippet Editor</h1>
            <Button onClick={onExportToPng}>Export</Button>
          </div>

          <div className="space-y-2 mb-10">
            <label className="text-sm font-medium" htmlFor="code">
              Add Code
            </label>
            <Textarea
              placeholder="Enter code here..."
              className="w-full px-3 py-2 border rounded-md shadow-md"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>

          <div className="flex-1 overflow-auto bg-gray-100 px-4 py-4">
            <ResizablePanelGroup
              direction="horizontal"
              className=" max-w-7xl rounded-lg border"
            >
              <ResizablePanel defaultSize={128}>
                <pre
                  style={{
                    padding: `
              ${padding.top}px
              ${padding.right}px
              ${padding.bottom}px
              ${padding.left}px

              `,
                    background: theme === "light" ? "#FFFFFF" : "#1E1E1E",
                  }}
                  className={`bg-gray-800 h-auto w-auto rounded-md text-white shadow-md shadow-black/50 ${
                    theme === "light" ? "bg-gray-100" : "bg-gray-800"
                  }`}
                >
                  <p
                    className={cn(
                      "text-sm font-semibold  px-4 py-2  rounded-t-md",
                      theme === "light"
                        ? "bg-gray-300 text-gray-800"
                        : "bg-gray-800 text-gray-100"
                    )}
                  >
                    {language}
                  </p>
                  <code
                    className={cn(
                      "block px-4 py-4 whitespace-pre overflow-x-auto rounded-md ",
                      theme === "light"
                        ? "bg-gray-100 text-gray-800"
                        : "bg-gray-900 text-gray-100"
                    )}
                    dangerouslySetInnerHTML={{
                      __html: highlightedCode,
                    }}
                  />
                </pre>
              </ResizablePanel>
              <ResizableHandle withHandle />

              <ResizablePanel defaultSize={128}>{""}</ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </div>
      </div>
    </div>
  );
}
