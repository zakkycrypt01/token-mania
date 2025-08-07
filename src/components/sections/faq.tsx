import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function FaqSection() {
  const faqs = [
    {
      question: "What is Neura AI?",
      answer: "It's a revolutionary new token on the Solana blockchain that combines decentralized AI with a gamified user experience. We're making AI accessible and rewarding for everyone."
    },
    {
      question: "How do I connect my Phantom Wallet?",
      answer: "Simply click the 'Connect Phantom Wallet' button at the top of the page. A prompt will appear in your Phantom Wallet extension. Approve the connection, and you're all set!"
    },
    {
      question: "What are Quests and Achievements?",
      answer: "Quests are tasks you can complete to earn XP and rewards, like training a model or providing data. Achievements are special badges you unlock for hitting milestones and contributing to the network."
    },
    {
      question: "What is the token's utility?",
      answer: "The token is central to our AI ecosystem. It will be used for running AI models, governance votes on new features, and accessing special community perks. The more you hold, the more influence you have in the network."
    },
    {
      question: "Is the presale secure?",
      answer: "Absolutely. Security is our top priority. All transactions are handled through secure smart contracts on the Solana blockchain, and your Phantom Wallet ensures you have full control over your funds at all times. Our contracts will be audited by a third-party firm."
    }
  ];

  return (
    <section id="faq" className="py-12 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary tracking-tighter">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-lg text-muted-foreground">
            Got questions? We've got answers. If you don't find what you're looking for, join our community channels!
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg text-left font-headline hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
