import { frontendChatbotSettings } from "@/lib/chatbotSettings";

export const chatbotEnabled = frontendChatbotSettings.enabled;

export const plannerOverrideLabel = "Talk to Planner";

export function getPrimaryChatLabel() {
  return chatbotEnabled ? "Chat" : plannerOverrideLabel;
}

export function getPrimaryChatCtaLabel() {
  return chatbotEnabled ? "Start A Quick Chat" : plannerOverrideLabel;
}
