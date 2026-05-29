import { FacebookLogo, GoogleLogo, InstagramLogo } from "phosphor-react-native";
import { ComponentType } from "react";
import { channelColor } from "../tokens";

export type ChannelKey = "google" | "instagram" | "facebook";

const LOGO: Record<ChannelKey, ComponentType<{ size: number; color: string; weight?: any }>> = {
  google: GoogleLogo,
  instagram: InstagramLogo,
  facebook: FacebookLogo,
};

export const CHANNEL_LABEL: Record<ChannelKey, string> = {
  google: "Google Ads",
  instagram: "Instagram",
  facebook: "Facebook",
};

export const channelTint = (key: ChannelKey) => channelColor[key];

/** A channel's brand logo glyph, tinted to the channel color. Tokens only. */
export default function ChannelGlyph({
  channel,
  size = 24,
  weight = "fill",
  color,
}: {
  channel: ChannelKey;
  size?: number;
  weight?: "regular" | "bold" | "fill" | "duotone";
  color?: string;
}) {
  const Logo = LOGO[channel];
  return <Logo size={size} color={color ?? channelColor[channel]} weight={weight} />;
}
