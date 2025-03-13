"use client"; // Required for interactivity (e.g., dropdowns, drawer)

import Image from "next/image";
import logo from "@/assets/images/logo.svg"; // Replace with your logo path
import { Link, usePathname } from "@/i18n/routing";
interface NavbarProps {
	locale: "en" | "ar";
}

export default function Navbar({ locale }: NavbarProps) {
	const pathname = usePathname(); // Get the current path
	// List of routes where the footer should be hidden
	/*   const hiddenRoutes = ["/login", "/register", "/dashboard"];
  if (hiddenRoutes.includes(pathname)) return null; // ✅ Conditional return AFTER all hooks
 */
	// Function to check if a link is active
	const isActive = (href: string): boolean => {
		return pathname === href;
	};
	return (
		<div className="drawer z-50 sticky-top">
			{/* Drawer Toggle Button (Visible on Mobile) */}
			<input id="navbar-drawer" type="checkbox" className="drawer-toggle" />
			<div className="drawer-content flex flex-col ">
				{/* Navbar */}
				<nav className="navbar bg-gradient shadow-md p-3">
					{/* Logo on the Left */}
					<div className="flex-none lg:w-2/12 ">
						<Link href="/" locale="en">
							<Image src={logo} alt="Logo" width={90} height={0} />
						</Link>
					</div>

					{/* Navigation Links in the Middle (Visible on Desktop) */}
					<div className="flex-1 hidden lg:flex justify-center">
						<ul className="menu menu-horizontal px-1 gap-4 text-white">
							<li>
								<Link href="/" className={`hover-main hover-scale main-transition text-[16px] ${isActive("/") ? "active" : ""}`}>
									Home
								</Link>
							</li>
							<li>
								<Link href="/about" className={`hover-main hover-scale main-transition text-[16px] ${isActive("/about") ? "active" : ""}`}>
									About
								</Link>
							</li>
							<li>
								<Link href="/services" className={`hover-main hover-scale main-transition text-[16px] ${isActive("/services") ? "active" : ""}`}>
									Services
								</Link>
							</li>
							<li>
								<Link href="/contact" className={`hover-main hover-scale main-transition text-[16px] ${isActive("/contact") ? "active" : ""}`}>
									Contact
								</Link>
							</li>
						
						</ul>
					</div>

					{/* Favourite, Notification, Language Switcher, and Avatar Dropdown on the Right (Visible on Desktop) */}
					<div className="flex-none gap-0 ms-auto ">
						{/* Avatar Dropdown (Visible on Desktop) */}
						<div className="dropdown dropdown-end hidden lg:block">
							<div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar text-white">
								<div className="w-10 rounded-full">
									<Image alt="User Avatar" src={"https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"} width={40} height={40} />
								</div>
							</div>
							<ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
								<li>
									<a>Profile</a>
								</li>
								<li>
									<a>Settings</a>
								</li>
								<li>
									<a>Logout</a>
								</li>
							</ul>
						</div>

						{/* Notification Dropdown (Visible on All Screens) */}
						<div className="dropdown dropdown-end">
							<div tabIndex={0} role="button" className="btn btn-ghost btn-circle text-white">
								<div className="indicator">
									<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
										/>
									</svg>
									<span className="badge badge-sm indicator-item bg-red-500 text-white">3</span> {/* Notification count */}
								</div>
							</div>
							<ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
								<li>
									<a>Notification 1</a>
								</li>
								<li>
									<a>Notification 2</a>
								</li>
								<li>
									<a>Notification 3</a>
								</li>
							</ul>
						</div>

						{/* Favourite Icon (Visible on All Screens) */}
						<div className="dropdown dropdown-end">
							<div tabIndex={0} role="button" className="btn btn-ghost btn-circle text-white">
								<div className="indicator">
									<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
										/>
									</svg>
									<span className="badge badge-sm indicator-item bg-red-500 text-white">3</span> {/* Notification count */}
								</div>
							</div>
							<ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
								<li>
									<a>Notification 1</a>
								</li>
								<li>
									<a>Notification 2</a>
								</li>
								<li>
									<a>Notification 3</a>
								</li>
							</ul>
						</div>

						{/* Language Switcher (Visible on Desktop) */}
						<div className="dropdown dropdown-end hidden lg:block">
							<div tabIndex={0} role="button" className="btn btn-ghost text-white">
								<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
									/>
								</svg>
								<span className="ml-2"> {locale === "en" ? "العربية" : "English"}</span>
							</div>
							<ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
								<li>
									<Link href="/" locale="en">
										English
									</Link>
								</li>
								<li>
									<Link href="/" locale="ar">
										Arabic
									</Link>
								</li>
							</ul>
						</div>

						{/* Drawer Toggle Button (Visible on Mobile) */}
						<div className="flex-none lg:hidden text-white">
							<label htmlFor="navbar-drawer" className="btn btn-ghost">
								<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
								</svg>
							</label>
						</div>
					</div>
				</nav>
			</div>

			{/* Drawer Sidebar (Visible on Mobile) */}
			<aside className="drawer-side z-50">
				<label htmlFor="navbar-drawer" className="drawer-overlay bg-opacity-0"></label>
				{/* Logo in Drawer */}
				<Link href="/" locale="en" className="inline">
					<Image src={logo} alt="Logo" width={120} height={40} />
				</Link>

				<ul className="menu p-4 w-80 min-h-full bg-base-100 text-base-content">
					{/* Close (X) Icon */}
					<label htmlFor="navbar-drawer" className="btn btn-ghost btn-circle absolute ltr:right-2 rtl:left-2 top-2">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</label>

					<div className="mb-4">
						{/* Logo in Drawer */}
						<Link href="/" className="inline-block w-fit">
							<Image src={logo} alt="Logo" width={120} height={40} />
						</Link>
					</div>
					{/* Navigation Links in Drawer */}
					<li>
						<Link href="/" className={isActive("/") ? "active" : ""}>
							Home
						</Link>
					</li>
					<li>
						<Link href="/about" className={isActive("/about") ? "active" : ""}>
							About
						</Link>
					</li>
					<li>
						<Link href="/services" className={isActive("/services") ? "active" : ""}>
							Services
						</Link>
					</li>
					<li>
						<Link href="/contact" className={isActive("/contact") ? "active" : ""}>
							Contact
						</Link>
					</li>

					{/* Language Switcher in Drawer */}
					<li className="mt-4">
						<details>
							<summary> {locale === "en" ? "Language" : "اللغة"}</summary>
							<ul>
								<li>
									<Link href="/" locale="en">
										English
									</Link>
								</li>
								<li>
									<Link href="/" locale="ar">
										Arabic
									</Link>
								</li>
							</ul>
						</details>
					</li>

					{/* Avatar Dropdown in Drawer */}
					<li className="mt-4">
						<details>
							<summary>Account</summary>
							<ul>
								<li>
									<a>Profile</a>
								</li>
								<li>
									<a>Settings</a>
								</li>
								<li>
									<a>Logout</a>
								</li>
							</ul>
						</details>
					</li>
				</ul>
			</aside>
		</div>
	);
}
