import { demoKnowledgeBase, fallbackResponses } from '../data/demoResponses';

let serviceIdCounter = 0;

/**
 * Simulates a frontend AI chat service with realistic response latency.
 * Structured to cleanly connect to a real backend or API endpoint in production.
 */
export async function sendAIMessage(userQuery) {
  // Simulated processing delay (600ms)
  await new Promise((resolve) => setTimeout(resolve, 600));

  const cleanQuery = (userQuery || '').toLowerCase().trim();

  // Search knowledge base
  const match = demoKnowledgeBase.find((entry) =>
    entry.keywords.some((keyword) => cleanQuery.includes(keyword))
  );

  const responseText = match
    ? match.response
    : fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];

  serviceIdCounter += 1;

  return {
    id: `msg-${serviceIdCounter}-${Math.random().toString(36).substring(2, 7)}`,
    text: responseText,
    sender: 'robot',
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };
}
