import fs from "node:fs";
import path from "node:path";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/flat/avatar";
import ComponentPage from "~/components/page/ComponentPage";
import type { Route } from "./+types/avatar";

export async function loader({ request }: Route.LoaderArgs) {
	const code = await fs.promises.readFile(
		path.join(process.cwd(), "app/components/flat/avatar.tsx"),
		"utf-8",
	);
	return {
		code,
		dependencies: ["@radix-ui/react-avatar"],
	};
}

export default function Page({ loaderData }: Route.ComponentProps) {
	return (
		<ComponentPage name="Avatar" dependencies={loaderData.dependencies} code={loaderData.code}>
			<div className="flex items-center gap-4">
				<Avatar>
					<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>

				<Avatar>
					<AvatarImage src="https://github.com/vercel.png" alt="@vercel" />
					<AvatarFallback>VC</AvatarFallback>
				</Avatar>

				<Avatar>
					<AvatarFallback>JD</AvatarFallback>
				</Avatar>

				<Avatar>
					<AvatarFallback>
						<span className="sr-only">John Doe</span>
						JD
					</AvatarFallback>
				</Avatar>
			</div>
		</ComponentPage>
	);
}
