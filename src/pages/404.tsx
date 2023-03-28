// pages/404.js
import Link from "next/link";

const NotFound = () => (
	<div className="min-h-screen bg-white px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
		<div className="mx-auto max-w-max">
			<main className="sm:flex">
				<p className="mt-4 bg-[#ECB03F] bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
					404
				</p>
				<div className="sm:ml-6">
					<div className="sm:border-l sm:border-gray-200 sm:pl-6">
						<h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
							Page not found
						</h1>
						<p className="mt-1 text-base text-gray-500">
							Please check the URL in the address bar and try again.
						</p>
					</div>
					<div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
						<Link
							className="inline-flex items-center rounded-md  border-transparent  bg-[#ECB03F]  px-4 py-2 text-sm font-medium text-white shadow-sm outline-none transition-all hover:bg-[#c18f33] hover:bg-gradient-to-br focus-visible:ring-2 focus-visible:ring-yellow-400"
							href="/"
						>
							Go back home
						</Link>
					</div>
				</div>
			</main>
		</div>
	</div>
);

export default NotFound;
