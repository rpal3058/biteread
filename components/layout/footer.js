import Link from "next/link";
const Footer = () => {
  return (
    <footer className="text-center bg-white-900  text-gray-400 border border-grey">
      <div className="text-center p-4">
        © 2021 Copyright:
        <Link className="text-whitehite" href="https://tailwind-elements.com/">
          Rwiju
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
