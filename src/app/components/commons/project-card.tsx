"use client";

import Link from "next/link";
import type { ProjectData } from "../../server/get-profile-data";

export default function ProjectCard({
	project,
	isOwner,
	img,
}: { project: ProjectData; isOwner: boolean; img: string | undefined }) {
	const projectUrl = project.projectUrl;
	const formattedUrl = projectUrl.startsWith("http")
		? projectUrl
		: `https://${projectUrl}`;

	function handleClick() {
		console.log("clicked"); // TODO: Implement analytics
	}

	return (
		<Link href={formattedUrl} target="_blank" onClick={handleClick}>
			<div className="w-[340px] h-[132px] flex gap-5 bg-background-secondary p-3 rounded-[20px] border border-transparent hover:border-border-secondary">
				<div className="size-24 rounded-md overflow-hidden flex-shrink-0">
					<img
						src={img}
						alt="Projeto 01"
						className="w-full h-full object-cover"
					/>
				</div>
				<div className="flex flex-col gap-2">
					{isOwner && (
						<span className="uppercase text-xs font-bold text-accent-green">
							{project.totalVisits || 0} Cliques
						</span>
					)}
					<div className="flex flex-col">
						<span className="text-white font-bold">{project.projectName}</span>
						<span className="text-content-body text-sm">
							{project.projectDescription}
						</span>
					</div>
				</div>
			</div>
		</Link>
	);
}
