import Layout from "@/layout";
import HomepageHero from "@/components/HomepageHero";
import AddressForm from "@/components/form/AddressForm";

export default function Home() {
	return (
		<Layout>
			<HomepageHero>
				<AddressForm />
			</HomepageHero>
		</Layout>
	);
}
