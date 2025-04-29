import CheckoutForm from "@/components/forms/CheckoutForm";

const CheckoutPage = async({params}) => {
    const p = await params;
    const res = await fetch(`https://nextjs-car-doctor-sigma.vercel.app
/api/service/${p.id}`)
    const data = await res.json();
    return (
        <div className="mt-12">
            <CheckoutForm data={data} />
        </div>
    );
};

export default CheckoutPage;