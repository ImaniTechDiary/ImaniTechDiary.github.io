import { useEffect } from "react";

interface ProjectDetailLink {
  label: string;
  url: string;
}

export interface ProjectModalContent {
  title: string;
  description: string;
  summary?: string;
  features?: string[];
  links?: ProjectDetailLink[];
  videoUrl?: string;
}

interface ProjectEnvelopeModalProps {
  isOpen: boolean;
  project: ProjectModalContent | null;
  onClose: () => void;
}

const toEmbedUrl = (url?: string): string | null => {
  if (!url) {
    return null;
  }

  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes("youtube.com")) {
      const id = parsed.searchParams.get("v");
      return id ? `https://www.youtube.com/embed/${id}` : url;
    }

    if (parsed.hostname.includes("youtu.be")) {
      const id = parsed.pathname.replace("/", "");
      return id ? `https://www.youtube.com/embed/${id}` : url;
    }

    return url;
  } catch {
    return url;
  }
};

const ProjectEnvelopeModal = ({ isOpen, project, onClose }: ProjectEnvelopeModalProps) => {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) {
    return null;
  }

  const embedUrl = toEmbedUrl(project.videoUrl);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
      <button
        type="button"
        aria-label="Close modal"
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
      />

      <section
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} details`}
        className="relative w-full max-w-3xl"
      >
        {/* Heart seal */}
        <div className="pointer-events-none absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2">
          <svg
            viewBox="0 0 100 90"
            className="h-20 w-20 drop-shadow-md"
            aria-hidden="true"
          >
            <path
              d="M50 84C50 84 8 59 8 31C8 17 19 8 32 8C41 8 47 13 50 20C53 13 59 8 68 8C81 8 92 17 92 31C92 59 50 84 50 84Z"
              className="fill-rose-300"
            />
          </svg>
        </div>

        <div className="relative z-10 overflow-hidden rounded-2xl border-2 border-rose-300 bg-[#fff8ef] shadow-2xl">
          {/* Envelope flap */}
          <div className="absolute left-0 right-0 top-0 h-24 bg-gradient-to-b from-rose-200 via-rose-100 to-transparent [clip-path:polygon(0_0,100%_0,50%_100%)]" />

          <div className="relative max-h-[82vh] overflow-y-auto px-5 pb-6 pt-16 md:px-8 md:pt-20">
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full border border-rose-300 bg-white px-3 py-1 text-xs font-mono text-foreground hover:bg-rose-50"
            >
              Close
            </button>

            <p className="text-xs font-mono uppercase tracking-[0.2em] text-rose-500">Project Notes</p>
            <h3 className="mt-2 text-2xl font-serif font-bold text-foreground">{project.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {project.summary || project.description}
            </p>

            {project.features?.length ? (
              <div className="mt-6">
                <h4 className="text-sm font-semibold font-mono uppercase tracking-wide text-foreground">Features</h4>
                <ul className="mt-2 space-y-2 text-sm text-foreground/90">
                  {project.features.map((feature) => (
                    <li key={feature} className="rounded-md bg-rose-50 px-3 py-2">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {project.links?.length ? (
              <div className="mt-6">
                <h4 className="text-sm font-semibold font-mono uppercase tracking-wide text-foreground">Links</h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  {project.links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-rose-300 bg-white px-3 py-1.5 text-xs font-mono text-foreground hover:bg-rose-50"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            ) : null}

            {embedUrl ? (
              <div className="mt-6">
                <h4 className="text-sm font-semibold font-mono uppercase tracking-wide text-foreground">Walkthrough Video</h4>
                <div className="mt-2 overflow-hidden rounded-lg border-2 border-rose-200 bg-black">
                  <iframe
                    src={embedUrl}
                    title={`${project.title} walkthrough`}
                    className="h-56 w-full md:h-80"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectEnvelopeModal;
