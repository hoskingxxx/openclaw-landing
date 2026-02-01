import { CodeBlock } from "./ui/CodeBlock";

interface VideoWithNotesProps {
  video: {
    id: string;
    platform: string;
    title: string;
    duration: string;
    notes: Array<{
      title: string;
      code: string;
    }>;
  };
}

export function VideoWithNotes({ video }: VideoWithNotesProps) {
  return (
    <div className="glass-card overflow-hidden">
      {/* Video Embed */}
      <div className="aspect-video">
        <iframe
          src={`https://www.youtube.com/embed/${video.id}`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>

      {/* Video Info */}
      <div className="p-6 border-b border-white/10">
        <h3 className="text-xl font-semibold text-text-primary mb-2">{video.title}</h3>
        <p className="text-sm text-text-tertiary">{video.duration}</p>
      </div>

      {/* Command Extraction Area - Core Retention Feature */}
      <div className="p-6">
        <h4 className="text-lg font-semibold text-text-primary mb-4">
          📝 Video Notes - One-Click Copy
        </h4>
        <p className="text-sm text-text-secondary mb-4">
          Key commands and configs extracted from the video, copy and use directly
        </p>

        <div className="space-y-4">
          {video.notes.map((note, index) => (
            <CodeBlock key={index} title={note.title} code={note.code} />
          ))}
        </div>

        <p className="text-xs text-text-tertiary mt-4">
          💡 Stay on this site to copy, no need to jump to YouTube
        </p>
      </div>
    </div>
  );
}
