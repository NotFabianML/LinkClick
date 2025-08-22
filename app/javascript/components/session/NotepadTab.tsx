import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useI18n } from "../../contexts/I18nContext";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";

import { FileText } from "lucide-react";

const markdownComponents = {
  code({ node, inline, className, children, ...props }: any) {
    const match = /language-(\w+)/.exec(className || "");
    return !inline && match ? (
      <SyntaxHighlighter
        style={vscDarkPlus}
        language={match[1]}
        PreTag="div"
        {...props}
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
};

type SaveStatus = "unsaved" | "saving" | "saved";

interface NotepadTabProps {
  initialContent: string;
  sessionId: number;
}

const NotepadTab = ({ initialContent, sessionId }: NotepadTabProps) => {
  const i18n = useI18n();
  const [content, setContent] = useState(initialContent);
  const [viewMode, setViewMode] = useState<"edit" | "preview">("edit");
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("saved");

  // --- Autosave (Debounce) ---
  useEffect(() => {
    if (content === initialContent) return;

    setSaveStatus("unsaved");
    const handler = setTimeout(() => {
      saveNotepad();
    }, 2000);

    return () => {
      clearTimeout(handler);
    };
  }, [content, initialContent]);

  const saveNotepad = useCallback(async () => {
    setSaveStatus("saving");
    const csrfToken = document.querySelector<HTMLMetaElement>(
      "meta[name='csrf-token']"
    )?.content;
    const locale =
      (window as any).sharedProps?.locale_data?.current_locale || "en";

    try {
      await axios.patch(
        `/${locale}/sessions/${sessionId}/notepad`,
        { content: content },
        { headers: { "X-CSRF-Token": csrfToken } }
      );
      setSaveStatus("saved");
    } catch (error) {
      console.error("Error saving notepad:", error);
      setSaveStatus("unsaved"); // Revert to unsaved on error
    }
  }, [content, sessionId]);

  const renderSaveStatus = () => {
    switch (saveStatus) {
      case "unsaved":
        return <Badge variant="outline">Unsaved changes</Badge>;
      case "saving":
        return <Badge variant="secondary">Saving...</Badge>;
      case "saved":
        return (
          <Badge
            variant="secondary"
            className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
          >
            Saved
          </Badge>
        );
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          <h3 className="font-semibold">{i18n.sidebar.notepad_tab.title}</h3>
          {renderSaveStatus()}
        </div>
        <div className="flex items-center gap-1 bg-muted p-1 rounded-md">
          <Button
            onClick={() => setViewMode("edit")}
            variant={viewMode === "edit" ? "secondary" : "ghost"}
            size="sm"
            className="px-3 h-8"
          >
            {i18n.sidebar.notepad_tab.edit_button}
          </Button>
          <Button
            onClick={() => setViewMode("preview")}
            variant={viewMode === "preview" ? "secondary" : "ghost"}
            size="sm"
            className="px-3 h-8"
          >
            {i18n.sidebar.notepad_tab.preview_button}
          </Button>
        </div>
      </div>

      {viewMode === "edit" ? (
        <Textarea
          placeholder={i18n.sidebar.notepad_tab.placeholder}
          className="flex-1 resize-none border-0 bg-muted/30 focus:bg-background transition-colors"
          value={content}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setContent(e.target.value)
          }
        />
      ) : (
        <div className="prose prose-sm dark:prose-invert flex-1 overflow-y-auto rounded-md bg-muted/30 p-4">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={markdownComponents}
          >
            {content || "Nothing to preview yet."}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default NotepadTab;
