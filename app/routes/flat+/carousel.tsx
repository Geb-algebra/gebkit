import fs from "node:fs";
import path from "node:path";
import { Card, CardContent } from "~/components/flat/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "~/components/flat/carousel";
import ComponentPage from "~/components/page/ComponentPage";
import type { Route } from "./+types/carousel";

export async function loader({ request }: Route.LoaderArgs) {
	const code = await fs.promises.readFile(
		path.join(process.cwd(), "app/components/flat/carousel.tsx"),
		"utf-8",
	);
	return {
		code,
		dependencies: ["embla-carousel-react"],
	};
}

export default function Page({ loaderData }: Route.ComponentProps) {
	return (
		<ComponentPage name="Carousel" dependencies={loaderData.dependencies} code={loaderData.code}>
			<div className="w-full max-w-xl mx-auto">
				<Carousel>
					<CarouselContent>
						{Array.from({ length: 5 }).map((_, index) => (
							<CarouselItem key={`slide-${index}`}>
								<div className="p-1">
									<Card>
										<CardContent className="flex aspect-square items-center justify-center p-6">
											<span className="text-4xl font-semibold">{index + 1}</span>
										</CardContent>
									</Card>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious />
					<CarouselNext />
				</Carousel>

				<h3 className="mt-8 mb-4 text-lg font-medium">Multiple Items</h3>
				<Carousel
					opts={{
						align: "start",
						loop: true,
					}}
					className="w-full"
				>
					<CarouselContent className="-ml-1">
						{Array.from({ length: 10 }).map((_, index) => (
							<CarouselItem key={`multi-slide-${index}`} className="pl-1 md:basis-1/2 lg:basis-1/3">
								<div className="p-1">
									<Card>
										<CardContent className="flex aspect-square items-center justify-center p-6">
											<span className="text-2xl font-semibold">{index + 1}</span>
										</CardContent>
									</Card>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious />
					<CarouselNext />
				</Carousel>
			</div>
		</ComponentPage>
	);
}
