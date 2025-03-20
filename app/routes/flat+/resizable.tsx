import fs from "node:fs";
import path from "node:path";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "~/components/flat/resizable";
import ComponentPage from "~/components/page/ComponentPage";
import type { Route } from "./+types/resizable";

export async function loader({ request }: Route.LoaderArgs) {
	const code = await fs.promises.readFile(
		path.join(process.cwd(), "app/components/flat/resizable.tsx"),
		"utf-8",
	);
	return {
		code,
		dependencies: ["react-resizable-panels"],
	};
}

export default function Page({ loaderData }: Route.ComponentProps) {
	return (
		<ComponentPage name="Resizable" dependencies={loaderData.dependencies} code={loaderData.code}>
			<div className="grid gap-8">
				{/* Horizontal resizing */}
				<div className="border rounded-lg">
					<ResizablePanelGroup direction="horizontal" className="min-h-[200px]">
						<ResizablePanel defaultSize={25}>
							<div className="flex h-full items-center justify-center p-6 bg-muted/20">
								<span className="font-semibold">Sidebar</span>
							</div>
						</ResizablePanel>
						<ResizableHandle withHandle />
						<ResizablePanel defaultSize={75}>
							<div className="flex h-full items-center justify-center p-6">
								<span className="font-semibold">Content</span>
							</div>
						</ResizablePanel>
					</ResizablePanelGroup>
				</div>

				{/* Vertical resizing */}
				<div className="border rounded-lg">
					<ResizablePanelGroup direction="vertical" className="min-h-[400px]">
						<ResizablePanel defaultSize={25}>
							<div className="flex h-full items-center justify-center p-6 bg-muted/20">
								<span className="font-semibold">Header</span>
							</div>
						</ResizablePanel>
						<ResizableHandle withHandle />
						<ResizablePanel defaultSize={60}>
							<div className="flex h-full items-center justify-center p-6">
								<span className="font-semibold">Content</span>
							</div>
						</ResizablePanel>
						<ResizableHandle withHandle />
						<ResizablePanel defaultSize={15}>
							<div className="flex h-full items-center justify-center p-6 bg-muted/20">
								<span className="font-semibold">Footer</span>
							</div>
						</ResizablePanel>
					</ResizablePanelGroup>
				</div>

				{/* Grid-like layout */}
				<div className="border rounded-lg">
					<ResizablePanelGroup direction="horizontal" className="min-h-[300px]">
						<ResizablePanel defaultSize={20}>
							<div className="flex h-full items-center justify-center p-6 bg-muted/20">
								<span className="font-semibold">Navigation</span>
							</div>
						</ResizablePanel>
						<ResizableHandle withHandle />
						<ResizablePanel defaultSize={60}>
							<ResizablePanelGroup direction="vertical">
								<ResizablePanel defaultSize={70}>
									<div className="flex h-full items-center justify-center p-6">
										<span className="font-semibold">Main Content</span>
									</div>
								</ResizablePanel>
								<ResizableHandle withHandle />
								<ResizablePanel defaultSize={30}>
									<div className="flex h-full items-center justify-center p-6 bg-muted/20">
										<span className="font-semibold">Details</span>
									</div>
								</ResizablePanel>
							</ResizablePanelGroup>
						</ResizablePanel>
						<ResizableHandle withHandle />
						<ResizablePanel defaultSize={20}>
							<div className="flex h-full items-center justify-center p-6 bg-muted/20">
								<span className="font-semibold">Inspector</span>
							</div>
						</ResizablePanel>
					</ResizablePanelGroup>
				</div>
			</div>
		</ComponentPage>
	);
}
