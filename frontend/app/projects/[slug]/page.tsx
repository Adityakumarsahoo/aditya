import React from "react";
import { notFound } from "next/navigation";
import { getProjectBySlug, getAllProjectSlugs, Project } from "@/lib/projects-data";
import { API_BASE_URL } from "@/lib/api-config";
import ProjectDetailsClient from "./ProjectDetailsClient";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  
  let project: Project | null = null;
  
  try {
    const res = await fetch(`${API_BASE_URL}/api/portfolio`, { next: { revalidate: 10 } });
    if (res.ok) {
      const data = await res.json();
      if (data && data.projects) {
        project = data.projects.find((p: any) => p.slug === slug) || null;
      }
    }
  } catch (err) {
    console.error("Failed to fetch dynamic project on server:", err);
  }

  if (!project) {
    project = getProjectBySlug(slug);
  }
  if (!project) notFound();

  return <ProjectDetailsClient initialProject={project} slug={slug} />;
}

// Generate static params for SSG
export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

// Generate page metadata (recommended for SEO)
export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return { title: "Project not found" };
  }

  return {
    title: `${project.title} — Aditya Kumar`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [
        {
          url: project.image,
          alt: project.title,
        },
      ],
    },
  };
}