import ProjectCard from "@/app/components/commons/project-card";
import TotalVisits from "@/app/components/commons/total-visits";
import Link from "next/link";

import { notFound } from "next/navigation";
import { auth } from "../../lib/auth";
import NewProject from "./new-project";
import {
	getProfileData,
	getProfileProjects,
} from "../../server/get-profile-data";
import { getDownloadURL } from "../../lib/firebase";
import UserCard from "../../components/commons/user-card/user-card";

export default async function ProfilePage({
	params,
}: {
	params: { profileId: string };
}) {
	const { profileId } = await params;

	const profileData = await getProfileData(profileId);

	if (!profileData) return notFound();

	const projects = await getProfileProjects(profileId);

	const session = await auth();
	const isOwner = profileData.userId === session?.user?.id;

	//TODO: Adicionar page view

	// Se o usuário não estiver mais no trial, não deixar ver o projeto; Direcionar para o upgrade;

	return (
		<div className="relative h-screen flex p-20 overflow-hidden">
			<div className="fixed top-0 left-0 w-full flex justify-center items-center gap-1 py-2 bg-background-tertiary">
				<span>Você está usando a versão trial.</span>
				<Link href={`/${profileId}/upgrade`}>
					<button type="button" className="text-accent-green font-bold">
						Faça o upgrade agora!
					</button>
				</Link>
			</div>
			<div className="w-1/2 flex justify-center h-min">
				<UserCard profileData={profileData} isOwner={isOwner} />
			</div>
			<div className="w-full flex justify-center content-start gap-4 flex-wrap overflow-y-auto">
				{projects.map(async (project) => {
					return (
						<ProjectCard
							key={project.id}
							project={project}
							isOwner={isOwner}
							img={(await getDownloadURL(project.imagePath)) || ""}
						/>
					);
				})}

				{isOwner && <NewProject profileId={profileId} />}
			</div>
			<div className="absolute bottom-4 right-0 left-0 w-min mx-auto">
				<TotalVisits />
			</div>
		</div>
	);
}
