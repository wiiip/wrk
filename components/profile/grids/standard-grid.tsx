import type { Media, Project } from "@/db/schema";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { AsyncImage } from "@/components/ui/async-image";

interface StandardGridProps {
  projects: Array<{
    project: Project;
    featuredImage: Media | null;
    allImages: Media[];
  }>;
  username: string;
}

export function StandardGrid({ projects, username }: StandardGridProps) {
  return (
    <div className="border-border grid grid-cols-1 border-t border-l lg:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => (
        <Link
          key={project.project.id}
          href={`/${username}/${project.project.slug}`}
          className="group hover:bg-accent/30 border-border space-y-2 border-r border-b p-4 transition-colors"
        >
          <AsyncImage
            src={project.featuredImage?.url || ""}
            alt={project.project.title}
            placeholder="shimmer"
            width={project.featuredImage?.width}
            height={project.featuredImage?.height}
          />
          <h3 className="text-muted-foreground group-hover:text-foreground line-clamp-1 flex items-center justify-between gap-2 text-sm leading-0 tracking-tight transition-all duration-500">
            <span className="block">{project.project.title}</span>
            <ArrowUpRight
              className="text-muted-foreground group-hover:text-foreground transition-all"
              size={14}
            />
          </h3>
        </Link>
      ))}
    </div>
  );
}
