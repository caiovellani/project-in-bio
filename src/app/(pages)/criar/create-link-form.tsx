"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Button from "../../components/ui/button";
import TextInput from "../../components/ui/text-input";
import { sanitizeLink } from "../../lib/utils";
import { verifyLink } from "../../actions/verify-link";
import { createLink } from "../../actions/create-link";
import { useRouter, useSearchParams } from "next/navigation";

export default function CreateLinkForm() {
	const router = useRouter();

	const searchParams = useSearchParams();

	const [link, setLink] = useState(
		sanitizeLink(searchParams.get("link") || ""),
	);
	const [error, setError] = useState("");

	function handleLinkChange(e: ChangeEvent<HTMLInputElement>) {
		setLink(sanitizeLink(e.target.value));
	}

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		// when a user doesn't write anything
		if (link.length === 0) return setError("Escolha um link primeiro!");

		// when a user write a existent link
		const isLinkTaken = await verifyLink(link);

		if (isLinkTaken)
			return setError("Desculpe, esse link já está sendo utilizado1");

		// create a link
		const isLinkCreated = await createLink(link);
		if (!isLinkCreated)
			return setError("Erro ao criar o perfil. Tente novamente.");

		router.push(`/${link}`);
	}

	return (
		<>
			<form
				onSubmit={handleSubmit}
				className="w-full flex items-center gap-2"
				action=""
			>
				<span className="text-white">projectinbio.com/</span>
				<TextInput value={link} onChange={handleLinkChange} />
				<Button className="w-[126px]">Criar</Button>
			</form>
			<div className="">
				<span className="text-accent-pink">{error}</span>
			</div>
		</>
	);
}
