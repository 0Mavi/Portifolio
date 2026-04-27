import { createBrowserRouter } from "react-router-dom";
import NotFound from "./pages/404/page";
import Home from "./pages/Home/app";
import AppLayout from "./pages/layout/_layout";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/Projects/ProjectDetail";
import AboutMe from "./pages/About";


export const router = createBrowserRouter([
	{
		path: "/",
		element: <AppLayout />,
		errorElement: <NotFound />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/projects",
				element: <Projects />,
			},
			{
				path: "/projects/:slug",
				element: <ProjectDetail />,
			},
			{
				path: "/about",
				element: <AboutMe/>,
			}
			
		],
	},
]);