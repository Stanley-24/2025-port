import PropTypes from 'prop-types';

const MyServicesCard = ({icon: Icon, title, description}) => {
    return (
        <div className='flex flex-col gap-4 border border-white-shade/20 py-8 lg:py-10 px-4 lg:px-6 rounded-lg bg-main-dark-bg hover:border-b-goldmeat/90 group'>
            <span 
                className='flex justify-center items-center w-12 h-13 border-2 border-goldmeat/90 rounded-lg bg-dark-lite group-hover:brightness-130 duration-200 ease-in-out'
            >
                <Icon className="text-goldmeat  text-xl lg:text-2xl" />
            </span>

            <h3
                className='text-white-shade capitalize font-bold jetbrains-mono-bold text-base lg:text-lg tracking-wide'
            >
                {title}
            </h3>

            <p 
                className='text-white-shade/60 montserrat-regular text-sm lg:text-[0.95rem]'
            >
                {description}
            </p>
        </div>
    )
}

MyServicesCard.propTypes = {
    icon: PropTypes.elementType,
}

export default MyServicesCard;