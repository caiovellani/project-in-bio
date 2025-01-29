import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	async headers() {
		return [
			{
				source: "/(.*)", // Aplica para todas as rotas
				headers: [
					{
						key: "Cache-Control",
						value: "no-store", // Não armazena em cache
					},
				],
			},
		];
	},
	/* outras opções de configuração */
};

export default nextConfig;
