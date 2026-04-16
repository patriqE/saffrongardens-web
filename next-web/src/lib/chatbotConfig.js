import { frontendChatbotSettings } from "@/lib/chatbotSettings";

export const chatbotEnabled = frontendChatbotSettings.enabled;

export const plannerOverrideLabel = "Chat with Planner";

export function getPrimaryChatLabel() {
  return chatbotEnabled ? "Chat" : plannerOverrideLabel;
}

export function getPrimaryChatCtaLabel() {
  return chatbotEnabled ? "Start Chat" : plannerOverrideLabel;
}
