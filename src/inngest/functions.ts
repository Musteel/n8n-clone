import prisma from "@/lib/db";
import { inngest } from "./client";
import { generateText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import * as Sentry from "@sentry/nextjs";

const googleAI = createGoogleGenerativeAI({});

export const execute = inngest.createFunction(
  { id: "execute-ai" },
  { event: "execute/ai" },
  async ({ event, step }) => {
    await step.sleep("pretend", "5s");

    Sentry.logger.info('User triggered test log', { log_source: 'sentry_test' })

    const { steps } = await step.ai.wrap("gemini-generate-text",
      generateText, {
      model: googleAI("gemini-2.5-flash"),
      system: "You are a helpful assistant that helps users by executing their prompts accurately and efficiently.",
      prompt: "What is 2 + 2?",
      experimental_telemetry: {
        isEnabled: true,
        recordInputs: true,
        recordOutputs: true,
      },
    });

    return { steps };
  },
);