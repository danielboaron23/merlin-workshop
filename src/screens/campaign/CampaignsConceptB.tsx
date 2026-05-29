import { useState } from "react";
import { ChannelKey } from "../../design-system";
import ChannelCampaignFlow from "./ChannelCampaignFlow";
import ChannelDashboard from "./ChannelDashboard";
import ChannelHub from "./ChannelHub";
import { CHANNEL_ORDER, ChannelDraft, DEFAULT_CHANNEL_DRAFT } from "./channelDraft";

type View_ = "hub" | "flow" | "dashboard";

/**
 * Concept B root for the Campaigns tab: channel hub → unified flow → multi-channel
 * dashboard. (docs/PRD-campaigns-concept-b.md)
 */
export default function CampaignsConceptB() {
  const [view, setView] = useState<View_>("hub");
  const [draft, setDraft] = useState<ChannelDraft>(DEFAULT_CHANNEL_DRAFT);
  const [launched, setLaunched] = useState(false);

  const toggle = (c: ChannelKey) =>
    setDraft((d) => {
      const has = d.channels.includes(c);
      const channels = has ? d.channels.filter((x) => x !== c) : [...d.channels, c];
      // keep canonical order
      return { ...d, channels: CHANNEL_ORDER.filter((x) => channels.includes(x)) };
    });

  if (view === "flow") {
    return (
      <ChannelCampaignFlow
        draft={draft}
        setDraft={setDraft}
        onClose={() => setView(launched ? "dashboard" : "hub")}
        onLaunched={() => { setLaunched(true); setView("dashboard"); }}
      />
    );
  }

  if (view === "dashboard" && launched) {
    return (
      <ChannelDashboard
        draft={draft}
        onEdit={() => setView("flow")}
        onEnd={() => { setLaunched(false); setDraft(DEFAULT_CHANNEL_DRAFT); setView("hub"); }}
      />
    );
  }

  return <ChannelHub selected={draft.channels} onToggle={toggle} onContinue={() => setView("flow")} />;
}
