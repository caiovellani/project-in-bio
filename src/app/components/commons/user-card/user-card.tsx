import { Github, Instagram, Linkedin, Plus, Twitter } from "lucide-react";
import Button from "../../ui/button";
import EditSocialLinks from "./edit-social-links";
import Link from "next/link";
import type { ProfileData } from "../../../server/get-profile-data";
import AddCustomLink from "./add-custom-link";
import EditUserCard from "./edit-user-card";
import { getDownloadURL } from "../../../lib/firebase";

export default async function UserCard({
	profileData,
	isOwner,
}: {
	profileData?: ProfileData;
	isOwner?: boolean;
}) {
	const icons = [Github, Instagram, Linkedin, Twitter, Plus];

	return (
		<div className="w-[348px] flex flex-col gap-5 items-center p-5 border border-white border-opacity-10 bg-[#121212] rounded-3xl text-white">
			<div className="size-48">
				<img
					src={
						(await getDownloadURL(profileData?.imagePath || "")) ||
						"http://github.com/caiovellani.png"
					}
					alt="Foto do Github Profile"
					className="rounded-full object-cover w-full h-full"
				/>
			</div>
			<div className="flex flex-col gap-2 w-full">
				<div className="flex items-center gap-2">
					<h3 className="text-3xl font-bold min-w-0 overflow-hidden">
						{profileData?.name || "Caio Vellani"}
					</h3>
					{isOwner && <EditUserCard profileData={profileData} />}
				</div>
				<p className="opacity-40">
					{profileData?.description || '"Eu faço programas"'}
				</p>
			</div>
			<div className="flex flex-col gap-2 w-full">
				<span className="uppercase text-xs font-medium">Links</span>
				<div className="flex gap-3">
					{profileData?.socialMedias?.github && (
						<Link
							href={profileData?.socialMedias?.github}
							target="_blank"
							className="p-3 rounded-xl bg-[#1E1E1E] hover:bg-[#2E2E2E]"
						>
							<Github />
						</Link>
					)}

					{profileData?.socialMedias?.instagram && (
						<Link
							href={profileData?.socialMedias?.instagram}
							target="_blank"
							className="p-3 rounded-xl bg-[#1E1E1E] hover:bg-[#2E2E2E]"
						>
							<Instagram />
						</Link>
					)}

					{profileData?.socialMedias?.linkedin && (
						<Link
							href={profileData?.socialMedias?.linkedin}
							target="_blank"
							className="p-3 rounded-xl bg-[#1E1E1E] hover:bg-[#2E2E2E]"
						>
							<Linkedin />
						</Link>
					)}

					{profileData?.socialMedias?.twitter && (
						<Link
							href={profileData?.socialMedias?.twitter}
							target="_blank"
							className="p-3 rounded-xl bg-[#1E1E1E] hover:bg-[#2E2E2E]"
						>
							<Twitter />
						</Link>
					)}
					{!profileData &&
						icons.map((Icon, index) => (
							<button
								key={index}
								type="button"
								className="p-3 rounded-xl bg-[#1E1E1E] hover:bg-[#2E2E2E] focus:outline-none focus:ring-2 focus:ring-purple-600"
							>
								<Icon />
							</button>
						))}

					{isOwner && (
						<EditSocialLinks socialMedias={profileData?.socialMedias} />
					)}
				</div>
			</div>
			<div className="flex flex-col  gap-3 w-full min-h-[172px]">
				<div className="w-full flex flex-col items-center gap-3">
					{profileData?.link1 && (
						<Link
							href={profileData?.link1.url}
							target="_blank"
							className="w-full"
						>
							<Button className="w-full">{profileData?.link1.title}</Button>
						</Link>
					)}
					{profileData?.link2 && (
						<Link
							href={profileData?.link2.url}
							target="_blank"
							className="w-full"
						>
							<Button className="w-full">{profileData?.link2.title}</Button>
						</Link>
					)}
					{profileData?.link3 && (
						<Link
							href={profileData?.link3.url}
							target="_blank"
							className="w-full"
						>
							<Button className="w-full">{profileData?.link3.title}</Button>
						</Link>
					)}
					{!profileData && (
						<button
							type="button"
							className="p-3 rounded-xl bg-[#1E1E1E] hover:[#2E2E2E] focus:outline-none focus:ring-2 focus:ring-purple-600"
						>
							<Plus />
						</button>
					)}
					{isOwner && <AddCustomLink />}
				</div>
			</div>
		</div>
	);
}
