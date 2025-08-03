import { CheckCircle, CircleDashed, Loader } from "lucide-react";

export default function RoadmapSection() {
  const roadmapItems = [
    {
      title: "Phase 1: Liftoff",
      description: "Website launch, presale event, smart contract audit, and initial community building.",
      status: "completed"
    },
    {
      title: "Phase 2: Orbit",
      description: "Token launch on Raydium, initial CEX listings, and expansion of the gamification platform with more quests and leaderboards.",
      status: "in-progress"
    },
    {
      title: "Phase 3: To the Moon!",
      description: "Launch of advanced mini-games, community governance DAO, and partnerships with other meme projects.",
      status: "upcoming"
    },
    {
      title: "Phase 4: Beyond",
      description: "Exploring cross-chain bridges, NFT integrations, and building the ultimate Memeverse. The community will decide!",
      status: "upcoming"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'in-progress':
        return <Loader className="h-6 w-6 text-primary animate-spin" />;
      case 'upcoming':
        return <CircleDashed className="h-6 w-6 text-muted-foreground" />;
      default:
        return null;
    }
  };

  return (
    <section id="roadmap" className="py-12 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary tracking-tighter">
            Our Adventure Map
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-lg text-muted-foreground">
            Follow our journey as we complete milestones and push the boundaries of what a meme token can be.
          </p>
        </div>

        <div className="relative max-w-2xl mx-auto">
          <div className="absolute left-3 top-3 bottom-3 w-1 bg-border rounded-full" />
          <div className="space-y-12">
            {roadmapItems.map((item, index) => (
              <div key={index} className="relative flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-background rounded-full flex items-center justify-center absolute left-0 top-1.5 transform -translate-x-1/2">
                   {getStatusIcon(item.status)}
                </div>
                <div className="ml-10">
                  <h3 className="text-xl font-bold font-headline">{item.title}</h3>
                  <p className="mt-2 text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
