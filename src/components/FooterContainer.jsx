import Image from "next/image";
import Logo from "../../public/Images/Logo.svg";
import Link from "next/link";

const FooterContainer = () => {
  return (
    <footer className="bg-[#282F30] dark:bg-[#f1f1f1]  rounded-[30px] p-[38px] relative mb-10 mt-[300px]">
        <div className="w-full grid grid-cols-2 mb-12">
          <div className="flex flex-col justify-start gap-2">
            <Image src={Logo} width={30} height={30} alt="PortafolioLogo" />
            <p className="md:text-md text-sm text-[#808687]">
              Portfolio created from Forms
            </p>
          </div>
          <div className="flex flex-col gap-2 items-end">
            <ul className="flex flex-col gap-2">
              <p className="text-md text-[#808687]">Links</p>
              <li>
                <Link href="/" className="text-[#f1f1f1] dark:text-[#282F30]">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/create" className="text-[#f1f1f1] dark:text-[#282F30]">
                  Create
                </Link>
              </li>
              <li>
                <Link href="/templates" className="text-[#f1f1f1] dark:text-[#282F30]">
                  Templates
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-[#f1f1f1] dark:text-[#282F30]">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/feedback" className="text-[#f1f1f1] dark:text-[#282F30]">
                  Feedback
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <h1 className="lg:text-[180px] md:text-[120px] text-[50px] font-bold text-[#f1f1f1] dark:text-[#282F30] text-center">
            ./Portafolio
          </h1>
        </div>
        <div className="w-full mt-4 text-sm text-center text-[#f1f1f1] dark:text-[#282F30]">
          &copy; {new Date().getFullYear()} Portafolio. All rights reserved.
        </div>
      </footer>
  )
}

export default FooterContainer