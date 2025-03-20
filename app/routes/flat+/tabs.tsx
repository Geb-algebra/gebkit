import fs from "node:fs";
import path from "node:path";
import { Button } from "~/components/flat/button";
import { Input } from "~/components/flat/input";
import { Label } from "~/components/flat/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/flat/tabs";
import ComponentPage from "~/components/page/ComponentPage";
import type { Route } from "./+types/tabs";

export async function loader({ request }: Route.LoaderArgs) {
	const code = await fs.promises.readFile(
		path.join(process.cwd(), "app/components/flat/tabs.tsx"),
		"utf-8",
	);
	return {
		code,
		dependencies: ["@radix-ui/react-tabs"],
	};
}

export default function Page({ loaderData }: Route.ComponentProps) {
	return (
		<ComponentPage name="Tabs" dependencies={loaderData.dependencies} code={loaderData.code}>
			<div className="grid gap-8">
				{/* Basic Tabs */}
				<div className="space-y-2">
					<h4 className="text-sm font-medium">Basic Tabs</h4>
					<Tabs defaultValue="account" className="w-full max-w-md">
						<TabsList>
							<TabsTrigger value="account">Account</TabsTrigger>
							<TabsTrigger value="password">Password</TabsTrigger>
							<TabsTrigger value="settings">Settings</TabsTrigger>
						</TabsList>
						<TabsContent value="account" className="p-4 border rounded-lg mt-2">
							<div className="space-y-4">
								<h3 className="text-lg font-medium">Account</h3>
								<p className="text-sm text-muted-foreground">
									Make changes to your account settings here. Click save when you're done.
								</p>
								<div className="space-y-2">
									<div className="space-y-1">
										<Label htmlFor="name">Name</Label>
										<Input id="name" defaultValue="John Doe" />
									</div>
									<div className="space-y-1">
										<Label htmlFor="username">Username</Label>
										<Input id="username" defaultValue="@johndoe" />
									</div>
								</div>
								<div className="flex justify-end">
									<Button>Save Changes</Button>
								</div>
							</div>
						</TabsContent>
						<TabsContent value="password" className="p-4 border rounded-lg mt-2">
							<div className="space-y-4">
								<h3 className="text-lg font-medium">Password</h3>
								<p className="text-sm text-muted-foreground">
									Change your password here. After saving, you'll be logged out.
								</p>
								<div className="space-y-2">
									<div className="space-y-1">
										<Label htmlFor="current-password">Current Password</Label>
										<Input id="current-password" type="password" />
									</div>
									<div className="space-y-1">
										<Label htmlFor="new-password">New Password</Label>
										<Input id="new-password" type="password" />
									</div>
									<div className="space-y-1">
										<Label htmlFor="confirm-password">Confirm Password</Label>
										<Input id="confirm-password" type="password" />
									</div>
								</div>
								<div className="flex justify-end">
									<Button>Change Password</Button>
								</div>
							</div>
						</TabsContent>
						<TabsContent value="settings" className="p-4 border rounded-lg mt-2">
							<div className="space-y-4">
								<h3 className="text-lg font-medium">Settings</h3>
								<p className="text-sm text-muted-foreground">
									Manage your notification and display settings.
								</p>
								<div className="space-y-2">
									<div className="flex items-center justify-between">
										<div>
											<p className="font-medium">Email Notifications</p>
											<p className="text-sm text-muted-foreground">
												Receive emails about your account activity
											</p>
										</div>
										<Button variant="outline">Manage</Button>
									</div>
									<div className="flex items-center justify-between">
										<div>
											<p className="font-medium">Display Settings</p>
											<p className="text-sm text-muted-foreground">
												Customize the appearance of the app
											</p>
										</div>
										<Button variant="outline">Customize</Button>
									</div>
								</div>
							</div>
						</TabsContent>
					</Tabs>
				</div>

				{/* Alternate Style Tabs */}
				<div className="space-y-2">
					<h4 className="text-sm font-medium">Underline Style</h4>
					<Tabs defaultValue="tab1" className="w-full max-w-md">
						<TabsList className="grid grid-cols-3 mb-2">
							<TabsTrigger
								value="tab1"
								className="data-[state=active]:border-b-2 border-primary rounded-none"
							>
								Tab 1
							</TabsTrigger>
							<TabsTrigger
								value="tab2"
								className="data-[state=active]:border-b-2 border-primary rounded-none"
							>
								Tab 2
							</TabsTrigger>
							<TabsTrigger
								value="tab3"
								className="data-[state=active]:border-b-2 border-primary rounded-none"
							>
								Tab 3
							</TabsTrigger>
						</TabsList>
						<TabsContent value="tab1" className="p-4 border rounded-lg">
							<p>Content for tab 1</p>
						</TabsContent>
						<TabsContent value="tab2" className="p-4 border rounded-lg">
							<p>Content for tab 2</p>
						</TabsContent>
						<TabsContent value="tab3" className="p-4 border rounded-lg">
							<p>Content for tab 3</p>
						</TabsContent>
					</Tabs>
				</div>
			</div>
		</ComponentPage>
	);
}
