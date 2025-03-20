import fs from "node:fs";
import path from "node:path";
import { AspectRatio } from "~/components/flat/aspect-ratio";
import ComponentPage from "~/components/page/ComponentPage";
import type { Route } from "./+types/aspect-ratio";

export async function loader({ request }: Route.LoaderArgs) {
	const code = await fs.promises.readFile(
		path.join(process.cwd(), "app/components/flat/aspect-ratio.tsx"),
		"utf-8",
	);
	return {
		code,
		dependencies: ["@radix-ui/react-aspect-ratio"],
	};
}

export default function Page({ loaderData }: Route.ComponentProps) {
	return (
		<ComponentPage
			name="Aspect Ratio"
			dependencies={loaderData.dependencies}
			code={loaderData.code}
		>
			<div className="grid gap-4">
				<AspectRatio ratio={16 / 9} className="bg-muted">
					<img
						src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
						alt="Landscape photograph of mountains with sunset"
						className="rounded-md object-cover w-full h-full"
					/>
				</AspectRatio>

				<AspectRatio ratio={1} className="bg-muted w-[200px]">
					<img
						src="https://images.unsplash.com/photo-1535025183041-0991a977e25b?w=300&dpr=2&q=80"
						alt="Abstract art with vibrant colors"
						className="rounded-md object-cover w-full h-full"
					/>
				</AspectRatio>
			</div>
		</ComponentPage>
	);
}
