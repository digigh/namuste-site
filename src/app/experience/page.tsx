import type { Metadata } from "next";
import ExperiencePage from "@/components/experience/ExperiencePage";

export const metadata: Metadata = {
  title: "Namusté — Every Conversation, An Intelligent Possibility",
  description:
    "A preview of the next-generation Namusté AI experience: an immersive, cinematic look at Namusté's voice and chat workforce for professionals and enterprises.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <ExperiencePage />;
}
