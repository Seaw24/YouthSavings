import React from 'react'
import '../../../index.css';
import defaultImg from '../image/favicon2.jpg';
import ProcessBar from '../../../components/ProcessBar'
import { CardContainer, CardBody, CardItem } from '../../../components/ui/3d-card';
import { NavLink } from 'react-router-dom';
import { BackgroundGradient } from '../../../components/ui/background-gradient';

type SavingCardProps = {
    className?: string,
    title: string,
    icon: any,
    img?: string,
    current?: number,
    total?: number
}
const SavingCard = ({
    className = 'aspect-[8/10.3] w-[clamp(7rem,18vw,18rem)] ]   ',
    title,
    icon: Icon,  // Renamed to Icon (with capital I) as it's a component
    img = defaultImg,
    current = 4, // Default current value
    total = 9 // Default total value
}:SavingCardProps) => {
    const combinedClasses = `card ${className}`.trim();

    return (
        <NavLink to={`/savings/${title}`}>
        <BackgroundGradient on3d ={true} >
        <CardContainer className={combinedClasses} >
            <CardBody className="w-full h-full">
                <div className="relative w-full h-full">
                    <CardItem
                        className='absolute ~top-2/5 left-0 right-0 ~text-xs/2xl font-montserrat font-bold flex justify-around w-full'
                    >
                        <Icon className="size-[1.8em] border rounded-full ~p-1/2 border-highlight bg-black" />
                        <div className='bg-black border border-highlight rounded-md ~p-1/3'>
                            {title} 
                        </div>
                    </CardItem>

                    <CardItem
                        className="absolute ~top-12/28 left-0 right-0 mx-auto w-8/12"
                    >
                        <ProcessBar funda={current} total={total} />
                    </CardItem>

                    <CardItem
                      
                        className="absolute bottom-1 flex justify-center w-full "
                    >
                        <img src={img} alt="Card Image" className='size-8/12'/>
                    </CardItem>
                </div>
            </CardBody>
        </CardContainer>
        </BackgroundGradient>
        </NavLink>
    );
}

export default SavingCard
