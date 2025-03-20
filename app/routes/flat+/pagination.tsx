import fs from "node:fs";
import path from "node:path";
import React from "react";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "~/components/flat/pagination";
import ComponentPage from "~/components/page/ComponentPage";
import type { Route } from "./+types/pagination";

export async function loader({ request }: Route.LoaderArgs) {
	const code = await fs.promises.readFile(
		path.join(process.cwd(), "app/components/flat/pagination.tsx"),
		"utf-8",
	);
	return {
		code,
		dependencies: [],
	};
}

export default function Page({ loaderData }: Route.ComponentProps) {
	const [currentPage, setCurrentPage] = React.useState(1);
	const totalPages = 10;

	const handlePageChange = (page: number) => {
		if (page > 0 && page <= totalPages) {
			setCurrentPage(page);
		}
	};

	return (
		<ComponentPage name="Pagination" dependencies={loaderData.dependencies} code={loaderData.code}>
			<div className="flex flex-col gap-8 items-center">
				<div>
					<h4 className="mb-2 text-center text-sm font-medium">Default Pagination</h4>
					<Pagination>
						<PaginationContent>
							<PaginationItem>
								<PaginationPrevious href="#" />
							</PaginationItem>
							<PaginationItem>
								<PaginationLink href="#">1</PaginationLink>
							</PaginationItem>
							<PaginationItem>
								<PaginationLink href="#" isActive>
									2
								</PaginationLink>
							</PaginationItem>
							<PaginationItem>
								<PaginationLink href="#">3</PaginationLink>
							</PaginationItem>
							<PaginationItem>
								<PaginationEllipsis />
							</PaginationItem>
							<PaginationItem>
								<PaginationNext href="#" />
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				</div>

				<div>
					<h4 className="mb-2 text-center text-sm font-medium">
						Interactive Pagination (Current Page: {currentPage})
					</h4>
					<Pagination>
						<PaginationContent>
							<PaginationItem>
								<PaginationPrevious
									href="#"
									onClick={(e) => {
										e.preventDefault();
										handlePageChange(currentPage - 1);
									}}
								/>
							</PaginationItem>
							{Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
								let page = i + 1;

								// If current page is > 3, we adjust the range of pages shown
								if (currentPage > 3 && currentPage <= totalPages - 2) {
									page = currentPage - 2 + i;
								} else if (currentPage > totalPages - 2) {
									page = totalPages - 4 + i;
								}

								if (page <= totalPages) {
									return (
										<PaginationItem key={`page-${page}`}>
											<PaginationLink
												href="#"
												isActive={page === currentPage}
												onClick={(e) => {
													e.preventDefault();
													handlePageChange(page);
												}}
											>
												{page}
											</PaginationLink>
										</PaginationItem>
									);
								}
								return null;
							})}
							{totalPages > 5 && currentPage < totalPages - 2 && (
								<PaginationItem>
									<PaginationEllipsis />
								</PaginationItem>
							)}
							{totalPages > 5 && currentPage < totalPages - 2 && (
								<PaginationItem>
									<PaginationLink
										href="#"
										onClick={(e) => {
											e.preventDefault();
											handlePageChange(totalPages);
										}}
									>
										{totalPages}
									</PaginationLink>
								</PaginationItem>
							)}
							<PaginationItem>
								<PaginationNext
									href="#"
									onClick={(e) => {
										e.preventDefault();
										handlePageChange(currentPage + 1);
									}}
								/>
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				</div>
			</div>
		</ComponentPage>
	);
}
