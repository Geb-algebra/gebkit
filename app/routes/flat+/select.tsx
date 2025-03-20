import fs from "node:fs";
import path from "node:path";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/components/flat/select";
import ComponentPage from "~/components/page/ComponentPage";
import type { Route } from "./+types/select";

export async function loader({ request }: Route.LoaderArgs) {
	const code = await fs.promises.readFile(
		path.join(process.cwd(), "app/components/flat/select.tsx"),
		"utf-8",
	);
	return {
		code,
		dependencies: ["@radix-ui/react-select", "lucide-react"],
	};
}

export default function Page({ loaderData }: Route.ComponentProps) {
	return (
		<ComponentPage name="Select" dependencies={loaderData.dependencies} code={loaderData.code}>
			<div className="grid gap-4">
				<Select>
					<SelectTrigger>
						<SelectValue placeholder="Select a fruit" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="apple">Apple</SelectItem>
						<SelectItem value="banana">Banana</SelectItem>
						<SelectItem value="orange">Orange</SelectItem>
					</SelectContent>
				</Select>
				<Select disabled>
					<SelectTrigger>
						<SelectValue placeholder="Select a fruit" />
					</SelectTrigger>
				</Select>
			</div>
		</ComponentPage>
	);
}
