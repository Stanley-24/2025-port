const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="mt-20 w-full py-12 bg-dkcharles">
            <div className="container flex flex-col gap-3 items-center">
                <p className="text-white-shade/60 capitalize text-sm lg:text-base">
                    © all rights reserved {currentYear}
                </p>
            </div>
        </footer>
    )
}

export default Footer;