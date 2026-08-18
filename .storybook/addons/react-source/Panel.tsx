import React, { useState } from "react";
import { useChannel } from "storybook/internal/manager-api";
import { AddonPanel } from "storybook/internal/components";
import { Source } from "@storybook/blocks";
import { SNIPPET_RENDERED } from "storybook/internal/docs-tools";
import { STORY_CHANGED } from "storybook/internal/core-events";
import { htmlToReact } from "./htmlToReact";

interface PanelProps {
  active: boolean;
}

export const Panel: React.FC<PanelProps> = ({ active }) => {
  const [activeTab, setActiveTab] = useState<"html" | "react">("react");
  const [htmlSource, setHtmlSource] = useState<string>("");
  useChannel({
    [SNIPPET_RENDERED]: ({ source }: { source: string }) => {
      setHtmlSource(source || "");
    },
    [STORY_CHANGED]: () => {
      setHtmlSource("");
    }
  });

  const hasScript = htmlSource.includes("<script");
  const reactSource = htmlSource && !hasScript ? htmlToReact(htmlSource) : "";
  const displayedCode = activeTab === "react" && !hasScript ? reactSource : htmlSource;
  const language = activeTab === "react" && !hasScript ? "tsx" : "html";

  return (
    <AddonPanel active={active}>
      <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            gap: 0,
            borderBottom: "1px solid #e4e4e7",
            padding: "0 12px",
            alignItems: "center",
            flexShrink: 0
          }}
        >
          {!hasScript && (
            <TabButton active={activeTab === "react"} onClick={() => setActiveTab("react")}>
              React
            </TabButton>
          )}
          <TabButton active={activeTab === "html" || hasScript} onClick={() => setActiveTab("html")}>
            Others (Vue, Angular, HTML)
          </TabButton>
        </div>
        <div style={{ flex: 1, overflow: "auto" }}>
          {displayedCode ? (
            <Source code={displayedCode} language={language} dark />
          ) : (
            <p style={{ padding: "1rem", color: "#71717a", fontSize: "13px" }}>
              No source available. Interact with a story to see its code.
            </p>
          )}
        </div>
      </div>
    </AddonPanel>
  );
};

const TabButton: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode }> = ({
  active,
  onClick,
  children
}) => (
  <button
    onClick={onClick}
    style={{
      padding: "8px 12px",
      fontSize: "12px",
      fontWeight: active ? 600 : 400,
      border: "none",
      borderBottom: active ? "2px solid #2563eb" : "2px solid transparent",
      background: "transparent",
      cursor: "pointer",
      color: active ? "#18181b" : "#71717a"
    }}
  >
    {children}
  </button>
);
