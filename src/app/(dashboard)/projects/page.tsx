import Link from "next/link";
import ProjectCard from "@/src/components/projects/ProjectCard.tsx";
import { getUserSession } from "@/src/utils/auth.utils.ts";
import { encodeSlug } from "@/src/utils/general.utils.ts";
import { Project } from "@/src/types/types.ts";

const projects: Project[] = [
  {
    id: 1,
    name: "E-commerce Website",
    description: "A responsive e-commerce platform for selling vintage items.",
    coverImageUrl: "http://example.com/ecommerce.jpg",
    category: "Web Development",
    tags: ["web", "typescript", "react"],
    tasks: [
      {
        id: 1,
        name: "Design Landing Page",
        description: "Design a captivating and user-friendly landing page.",
        status: "closed",
        dueDate: "2023-09-15",
        createdAt: "2023-08-01",
        updatedAt: "2023-09-10",
      },
      {
        id: 2,
        name: "Integrate Payment Gateway",
        description: "Add secure payment options for users.",
        status: "in_progress",
        dueDate: "2023-11-01",
        createdAt: "2023-09-16",
        updatedAt: "2023-10-05",
      },
    ],
    createdAt: "2023-07-25",
    updatedAt: "2023-10-01",
  },
  {
    id: 2,
    name: "Fitness Mobile App",
    description:
      "A mobile application to help users track their fitness activities and goals.",
    coverImageUrl: "http://example.com/fitnessapp.jpg",
    category: "Mobile Development",
    tags: ["mobile", "flutter", "health"],
    tasks: [
      {
        id: 3,
        name: "Implement Step Counter",
        description:
          "Add a feature to count user's steps using device sensors.",
        status: "open",
        dueDate: "2023-11-15",
        createdAt: "2023-10-01",
        updatedAt: "2023-10-01",
      },
      {
        id: 4,
        name: "Design Workout Plans",
        description: "Design various workout plans and challenges for users.",
        status: "closed",
        dueDate: "2023-09-20",
        createdAt: "2023-08-20",
        updatedAt: "2023-09-18",
      },
    ],
    createdAt: "2023-08-01",
    updatedAt: "2023-10-02",
  },
];

export default async function ProjectsPage() {
  const session = await getUserSession();

  if (!session) return null;

  return (
    <div className="flex w-full gap-3">
      {projects.map((project) => (
        <Link href={`/projects/${encodeSlug(project.name)}`} key={project.id}>
          <ProjectCard project={project} />
        </Link>
      ))}
    </div>
  );
}
