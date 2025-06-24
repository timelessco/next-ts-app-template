"use client";

export default function Offline() {
	return (
		<div className="min-h-dvh bg-black px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
			<div className="mx-auto max-w-max">
				<main className="sm:flex">
					<p className="bg-[#171717] bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
						Offline
					</p>
					<div className="mt-4 sm:mt-0 sm:ml-6">
						<div className="sm:border-l sm:border-gray-200 sm:pl-6">
							<h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
								Check your internet.
							</h1>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}
