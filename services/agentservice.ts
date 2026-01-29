import { ChatMessage } from "../types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function* streamAgentResponse(prompt: string, history: ChatMessage[]) {
  const response = await fetch(`${API_URL}/api/agent`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt, history }),
  });

  if (!response.body) throw new Error("No response body");

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    yield decoder.decode(value, { stream: true });
  }
}
