"use client";

import { useStripe } from "../../hooks/useStripe";

export default function PortalButton() {
	const { handleCreateStripePortal } = useStripe();

	return (
		<button
			type="button"
			className="font-bold text-white"
			onClick={handleCreateStripePortal}
		>
			Portal
		</button>
	);
}
