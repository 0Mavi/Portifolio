import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import CustomCursor from "../../components/CustomCursor";


export default function AppLayout() {
	return (
		<div className="flex flex-col w-full min-h-screen antialiased bg-background">
			<CustomCursor />
			<div className=" z-50">
				<Header />
			</div>
			<div className="flex flex-col w-full">
			
				<Outlet />
			</div>
			<div className="flex flex-col w-full antialiased">
				<Footer />
			</div>
			
		</div>
	);
}