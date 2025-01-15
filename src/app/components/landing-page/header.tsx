import { manageAuth } from "../../../actions/manage-auth";
import { auth } from "../../lib/auth";
import Button from "../ui/button";

export default async function Header() {
	const session = await auth();

	console.log(session);

	return (
		<div className="absolute top-0 left-0 right-0 max-w-7xl mx-auto flex items-center justify-between py-10">
			<div className="flex items-center gap-4">
				<img src="/logo.svg" alt="ProjectInBio Logo" />
				<h3 className="text-white text-2xl font-bold">ProjectInBio</h3>
			</div>
			<div className="flex items-center gap-4">
				{session && <Button>Miinha Página</Button>}
				<form action={manageAuth}>
					<Button>{session ? "Sair" : "Login"}</Button>
				</form>
			</div>
		</div>
	);
}
