import fs from "node:fs";
import path from "node:path";
import { Button } from "~/components/flat/button";
import { Checkbox } from "~/components/flat/checkbox";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "~/components/flat/table";
import ComponentPage from "~/components/page/ComponentPage";
import type { Route } from "./+types/table";

export async function loader({ request }: Route.LoaderArgs) {
	const code = await fs.promises.readFile(
		path.join(process.cwd(), "app/components/flat/table.tsx"),
		"utf-8",
	);
	return {
		code,
		dependencies: [],
	};
}

// Example invoice data
const invoices = [
	{
		id: "#INV001",
		paymentStatus: "Paid",
		totalAmount: "$250.00",
		paymentMethod: "Credit Card",
	},
	{
		id: "#INV002",
		paymentStatus: "Pending",
		totalAmount: "$150.00",
		paymentMethod: "PayPal",
	},
	{
		id: "#INV003",
		paymentStatus: "Unpaid",
		totalAmount: "$350.00",
		paymentMethod: "Bank Transfer",
	},
	{
		id: "#INV004",
		paymentStatus: "Paid",
		totalAmount: "$450.00",
		paymentMethod: "Credit Card",
	},
	{
		id: "#INV005",
		paymentStatus: "Paid",
		totalAmount: "$550.00",
		paymentMethod: "PayPal",
	},
];

// Example user data
const users = [
	{
		id: "1",
		name: "John Doe",
		email: "john@example.com",
		role: "Admin",
		status: "Active",
	},
	{
		id: "2",
		name: "Jane Smith",
		email: "jane@example.com",
		role: "User",
		status: "Active",
	},
	{
		id: "3",
		name: "Bob Johnson",
		email: "bob@example.com",
		role: "User",
		status: "Inactive",
	},
	{
		id: "4",
		name: "Alice Williams",
		email: "alice@example.com",
		role: "Manager",
		status: "Active",
	},
];

export default function Page({ loaderData }: Route.ComponentProps) {
	return (
		<ComponentPage name="Table" dependencies={loaderData.dependencies} code={loaderData.code}>
			<div className="grid gap-8">
				{/* Simple Table */}
				<div className="space-y-2">
					<h4 className="text-sm font-medium">Simple Table</h4>
					<div className="rounded-md border">
						<Table>
							<TableCaption>A list of your recent invoices.</TableCaption>
							<TableHeader>
								<TableRow>
									<TableHead className="w-[100px]">Invoice</TableHead>
									<TableHead>Status</TableHead>
									<TableHead>Method</TableHead>
									<TableHead className="text-right">Amount</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{invoices.map((invoice) => (
									<TableRow key={invoice.id}>
										<TableCell className="font-medium">{invoice.id}</TableCell>
										<TableCell>{invoice.paymentStatus}</TableCell>
										<TableCell>{invoice.paymentMethod}</TableCell>
										<TableCell className="text-right">{invoice.totalAmount}</TableCell>
									</TableRow>
								))}
							</TableBody>
							<TableFooter>
								<TableRow>
									<TableCell colSpan={3}>Total</TableCell>
									<TableCell className="text-right">$1,750.00</TableCell>
								</TableRow>
							</TableFooter>
						</Table>
					</div>
				</div>

				{/* Interactive Table */}
				<div className="space-y-2">
					<h4 className="text-sm font-medium">Interactive Table</h4>
					<div className="rounded-md border">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead className="w-[50px]">
										<Checkbox />
									</TableHead>
									<TableHead>Name</TableHead>
									<TableHead>Email</TableHead>
									<TableHead>Role</TableHead>
									<TableHead>Status</TableHead>
									<TableHead className="text-right">Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{users.map((user) => (
									<TableRow key={user.id}>
										<TableCell>
											<Checkbox />
										</TableCell>
										<TableCell className="font-medium">{user.name}</TableCell>
										<TableCell>{user.email}</TableCell>
										<TableCell>{user.role}</TableCell>
										<TableCell>
											<div
												className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
													user.status === "Active"
														? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
														: "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
												}`}
											>
												{user.status}
											</div>
										</TableCell>
										<TableCell className="text-right">
											<Button size="sm" variant="ghost">
												Edit
											</Button>
											<Button
												size="sm"
												variant="ghost"
												className="text-red-600 hover:text-red-800 hover:bg-red-100"
											>
												Delete
											</Button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				</div>

				{/* Striped Table */}
				<div className="space-y-2">
					<h4 className="text-sm font-medium">Striped Table</h4>
					<div className="rounded-md border">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>ID</TableHead>
									<TableHead>Name</TableHead>
									<TableHead>Email</TableHead>
									<TableHead>Role</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{users.map((user, index) => (
									<TableRow key={user.id} className={index % 2 === 0 ? "bg-muted/50" : ""}>
										<TableCell>{user.id}</TableCell>
										<TableCell>{user.name}</TableCell>
										<TableCell>{user.email}</TableCell>
										<TableCell>{user.role}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				</div>
			</div>
		</ComponentPage>
	);
}
