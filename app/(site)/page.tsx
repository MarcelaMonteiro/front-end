import Image from "next/image";
import Hero from "@/components/Hero";
import About from "./about/page";
import Services from "./services/page";
export default function Home() {
	return (
		<section>
			<main>
				<Hero></Hero>
			</main>
			<section>
				<About></About>
			</section>
			<section>
				<Services></Services>
			</section>
		</section>
	);
}
