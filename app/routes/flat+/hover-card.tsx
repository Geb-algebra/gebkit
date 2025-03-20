import { CalendarIcon } from "lucide-react";
import fs from "node:fs";
import path from "node:path";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/flat/avatar";
import { Button } from "~/components/flat/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "~/components/flat/hover-card";
import ComponentPage from "~/components/page/ComponentPage";
import type { Route } from "./+types/hover-card";

export async function loader({ request }: Route.LoaderArgs) {
	const code = await fs.promises.readFile(
		path.join(process.cwd(), "app/components/flat/hover-card.tsx"),
		"utf-8",
	);
	return {
		code,
		dependencies: ["@radix-ui/react-hover-card"],
	};
}

export default function Page({ loaderData }: Route.ComponentProps) {
	return (
		<ComponentPage name="Hover Card" dependencies={loaderData.dependencies} code={loaderData.code}>
			<div className="flex justify-center py-10">
				<HoverCard>
					<HoverCardTrigger asChild>
						<Button variant="link">@nextjs</Button>
					</HoverCardTrigger>
					<HoverCardContent className="w-80">
						<div className="flex justify-between space-x-4">
							<Avatar>
								<AvatarImage src="https://github.com/vercel.png" alt="Vercel" />
								<AvatarFallback>VC</AvatarFallback>
							</Avatar>
							<div className="space-y-1">
								<h4 className="text-sm font-semibold">@nextjs</h4>
								<p className="text-sm">The React Framework – created and maintained by @vercel.</p>
								<div className="flex items-center pt-2">
									<CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
									<span className="text-xs text-muted-foreground">Joined December 2021</span>
								</div>
							</div>
						</div>
					</HoverCardContent>
				</HoverCard>
			</div>
		</ComponentPage>
	);
}
