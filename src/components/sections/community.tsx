import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import Link from "next/link";
import type { SVGProps } from "react";

function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function DiscordIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M20.317 4.36981C18.824 3.79441 17.252 3.34561 15.608 3.01801C15.422 3.32401 15.253 3.71961 15.099 4.03881C13.237 3.74361 11.411 3.74361 9.54901 4.03881C9.39501 3.71961 9.22501 3.32401 9.04001 3.01801C7.39601 3.34561 5.82401 3.79441 4.33101 4.36981C1.67401 9.17641 1.07701 13.7272 1.88901 18.1056C3.64901 19.1668 5.46101 19.8408 7.32901 20.3232C7.68901 19.8644 8.01701 19.3784 8.32901 18.8664C7.47101 18.5208 6.64901 18.1292 5.86901 17.684C6.01301 17.5856 6.15101 17.4812 6.28901 17.3708C10.435 19.1432 14.213 19.1432 18.357 17.3708C18.495 17.4812 18.633 17.5856 18.777 17.684C17.997 18.1292 17.175 18.5208 16.317 18.8664C16.629 19.3784 16.957 19.8644 17.317 20.3232C19.185 19.8408 20.997 19.1668 22.757 18.1056C23.641 13.0336 22.735 8.44121 20.317 4.36981ZM12.015 15.1236C10.747 15.1236 9.69101 14.052 9.69101 12.7636C9.69101 11.4752 10.733 10.4036 12.015 10.4036C13.297 10.4036 14.353 11.4752 14.339 12.7636C14.339 14.052 13.297 15.1236 12.015 15.1236ZM16.383 15.1236C15.115 15.1236 14.059 14.052 14.059 12.7636C14.059 11.4752 15.101 10.4036 16.383 10.4036C17.665 10.4036 18.721 11.4752 18.707 12.7636C18.707 14.052 17.665 15.1236 16.383 15.1236Z" />
    </svg>
  );
}

export default function CommunitySection() {
  return (
    <section id="community" className="py-12 md:py-24 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary tracking-tighter">
            Join the Neural Network
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-lg text-muted-foreground">
            Connect with us, share ideas, and be part of the mission to build the future of AI.
          </p>
          <div className="mt-8 flex justify-center gap-4 md:gap-6">
            <Button size="lg" asChild className="bg-sky-500 hover:bg-sky-600 text-white">
              <Link href="#" target="_blank" rel="noopener noreferrer">
                <TwitterIcon className="mr-2 h-5 w-5" />
                Twitter / X
              </Link>
            </Button>
            <Button size="lg" asChild className="bg-blue-500 hover:bg-blue-600 text-white">
              <Link href="#" target="_blank" rel="noopener noreferrer">
                <Send className="mr-2 h-5 w-5" />
                Telegram
              </Link>
            </Button>
            <Button size="lg" asChild className="bg-indigo-500 hover:bg-indigo-600 text-white">
              <Link href="#" target="_blank" rel="noopener noreferrer">
                <DiscordIcon className="mr-2 h-5 w-5" />
                Discord
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
