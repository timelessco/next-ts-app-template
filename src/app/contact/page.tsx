import BigTextBox from "@/components/bigtextbox";
import Footer from "@/components/footer";
import GoogleMapComponent from "@/components/googlemaps";

export default function Page() {
  return (
    <>
      <section className="canister lg:pt-[85px]">
        <BigTextBox text="We’d love to hear from you" />
      </section>
      <div className="relative mt-[88px] md:mt-[136px]">
        <GoogleMapComponent />
        <div className="p-8 lg:p-12 text-center lg:text-left bg-white lg:absolute  lg:w-[496px] lg:shadow-[0_0_1px_0_rgba(0,0,0,0.20),0_1px_2px_0_rgba(0,0,0,0.07),0_1px_5px_0_rgba(0,0,0,0] lg:rounded-[9px] lg:top-[50%] lg:-translate-y-2/4 lg:right-[10%]">
          <h2 className="uppercase tracking-[1.97] md:mb-2 text-[13px] sm:text-[15px] text-[rgba(7,18,44,0.55)] font-bold leading-[1.2] mt-[10px] md:mt-5">
            Address
          </h2>
          <h3 className="text-[22px] lg:text-[27px] text-[#07122C] tracking-[-0.05] leading-10 font-bold md:max-w-[50%] lg:max-w-[340px] mx-auto lg:mx-0 mb-5 md:mb-10">
            4th Floor, WorkEZ Helix, Velachery Rd, Velachery, Chennai, Tamil
            Nadu 600042
          </h3>
          <h2 className="uppercase tracking-[1.97] md:mb-2 text-[13px] sm:text-[15px] text-[rgba(7,18,44,0.55)] font-bold leading-[1.2]">
            Email
          </h2>
          <h3 className="text-[22px] lg:text-[27px] text-[#07122C] tracking-[-0.05] leading-10 font-bold md:max-w-[50%] lg:max-w-[340px] mx-auto lg:mx-0 mb-9 md:mb-12">
            hello@timeless.co
          </h3>
          <h2 className="uppercase tracking-[1.97] md:mb-2 text-[13px] sm:text-[15px] text-[rgba(7,18,44,0.55)] font-bold leading-[1.2]">
            Phone
          </h2>
          <h3 className="text-[22px] lg:text-[27px] text-[#07122C] tracking-[-0.05] leading-10 font-bold md:max-w-[50%] lg:max-w-[340px] mx-auto lg:mx-0 mb-9">
            +91 9688888222
          </h3>
        </div>
      </div>
      <Footer
        desc="Send us an email"
        href="mailto:hello@timeless.co"
        title="Let’s build something if you are convinced."
      />
    </>
  );
}
