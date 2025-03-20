import { zodResolver } from "@hookform/resolvers/zod";
import fs from "node:fs";
import path from "node:path";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "~/components/flat/button";
import { Checkbox } from "~/components/flat/checkbox";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "~/components/flat/form";
import { Input } from "~/components/flat/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/components/flat/select";
import ComponentPage from "~/components/page/ComponentPage";
import type { Route } from "./+types/form";

export async function loader({ request }: Route.LoaderArgs) {
	const code = await fs.promises.readFile(
		path.join(process.cwd(), "app/components/flat/form.tsx"),
		"utf-8",
	);
	return {
		code,
		dependencies: ["@hookform/resolvers", "react-hook-form", "zod"],
	};
}

const formSchema = z.object({
	username: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
	email: z.string().email({
		message: "Please enter a valid email address.",
	}),
	role: z.enum(["admin", "user", "guest"], {
		required_error: "Please select a role.",
	}),
	terms: z.boolean().refine((val) => val === true, {
		message: "You must agree to the terms and conditions.",
	}),
});

export default function Page({ loaderData }: Route.ComponentProps) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
			email: "",
			terms: false,
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
	}

	return (
		<ComponentPage name="Form" dependencies={loaderData.dependencies} code={loaderData.code}>
			<div className="w-full max-w-md mx-auto">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Username</FormLabel>
									<FormControl>
										<Input placeholder="Your username" {...field} />
									</FormControl>
									<FormDescription>This is your public display name.</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input type="email" placeholder="example@example.com" {...field} />
									</FormControl>
									<FormDescription>We'll never share your email with anyone else.</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="role"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Role</FormLabel>
									<Select onValueChange={field.onChange} defaultValue={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select a role" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="admin">Admin</SelectItem>
											<SelectItem value="user">User</SelectItem>
											<SelectItem value="guest">Guest</SelectItem>
										</SelectContent>
									</Select>
									<FormDescription>Select what type of user you are.</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="terms"
							render={({ field }) => (
								<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
									<FormControl>
										<Checkbox checked={field.value} onCheckedChange={field.onChange} />
									</FormControl>
									<div className="space-y-1 leading-none">
										<FormLabel>Accept terms and conditions</FormLabel>
										<FormDescription>
											You agree to our Terms of Service and Privacy Policy.
										</FormDescription>
									</div>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit" className="w-full">
							Submit
						</Button>
					</form>
				</Form>
			</div>
		</ComponentPage>
	);
}
