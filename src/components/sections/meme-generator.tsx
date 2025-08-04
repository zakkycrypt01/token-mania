
'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { generateMeme } from '@/ai/flows/generate-meme-flow';
import { useToast } from '@/hooks/use-toast';
import { Download } from 'lucide-react';

export default function MemeGeneratorSection() {
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!prompt) {
      toast({
        title: 'Error',
        description: 'Please enter a prompt for the meme.',
        variant: 'destructive',
      });
      return;
    }
    setIsGenerating(true);
    setGeneratedImage(null);
    try {
      const result = await generateMeme({ prompt });
      if (result.imageUrl) {
        setGeneratedImage(result.imageUrl);
      } else {
        throw new Error('Image generation failed to return a URL.');
      }
    } catch (error) {
      console.error('Failed to generate meme:', error);
      toast({
        title: 'Meme Generation Failed',
        description: 'Could not generate meme. The model might be busy, please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = 'neural-ai-meme.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };


  return (
    <section id="meme-generator" className="py-12 md:py-24 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
                <h2 className="text-3xl md:text-5xl font-bold font-headline tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-primary to-purple-400">
                    AI Meme Generator
                </h2>
                <p className="text-lg text-muted-foreground">
                    Unleash your creativity! Describe a meme, and our AI will bring it to life. The funnier, the better. Let's see what you've got!
                </p>
                <Card className="shadow-lg bg-background/50 border-primary/20 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl">Create a Meme</CardTitle>
                        <CardDescription>Enter a descriptive prompt below.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Input
                        id="meme-prompt"
                        placeholder="e.g., 'A cat in a tiny business suit looking stressed at a computer'"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        disabled={isGenerating}
                        />
                    </CardContent>
                    <CardFooter>
                        <Button size="lg" className="w-full" disabled={isGenerating} onClick={handleGenerate}>
                        {isGenerating ? 'Generating...' : 'Generate Meme'}
                        </Button>
                    </CardFooter>
                </Card>
            </div>
            <div className="relative aspect-square">
            {isGenerating && (
                <Skeleton className="w-full h-full rounded-xl" />
            )}
            {generatedImage && !isGenerating && (
              <>
                <Image
                    src={generatedImage}
                    alt="Generated Meme"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-xl shadow-lg glow-shadow"
                />
                <Button onClick={handleDownload} size="icon" className="absolute top-4 right-4 z-10">
                    <Download />
                </Button>
              </>
            )}
            {!generatedImage && !isGenerating && (
                <div className="w-full h-full rounded-xl bg-muted/30 border-2 border-dashed border-primary/20 flex items-center justify-center">
                    <p className="text-muted-foreground text-center p-8">Your generated meme will appear here.</p>
                </div>
            )}
            </div>
        </div>
      </div>
    </section>
  );
}
