// Styles
import './SliderContainer.scss'
import { useEffect, useState } from 'react';


// Components
import PlacHolderData from './PlaceHolderData/PlaceHolderData.json'

const Card = (props) => {
    return (
        <li className='container__holder'>
            <img
                src={props.image}
                alt=''
                className='container__img'
            />
        </li>
    )
}

function Slider() {

    const [ moveClass, setMoveClass ] = useState('');
    const [ sliderItems, setSliderItems ] = useState(PlacHolderData);

    useEffect (() => {
        document.documentElement.style.setProperty('--num', sliderItems.length);
    }, [sliderItems])

    const handleAnimationEnd = () => {
        if(moveClass === 'prev') {
            shiftNext([...sliderItems])
        } else if (moveClass === 'next') {
            shiftPrev([...sliderItems])
        }
        setMoveClass('')
    }

    const shiftPrev = (copy) => {
        let lastCard = copy.pop();
        copy.splice(0, 0, lastCard);
        setSliderItems(copy);
    }

    const shiftNext = (copy) => {
        let firstCard = copy.shift();
        copy.splice(copy.length, 0, firstCard)
        setSliderItems(copy);
    }

    return (
        <section className='container'>
            <button 
                className='container__handle container__handle--left prev'
                onClick={() => setMoveClass('next')}
            >
                <div className='container__handle--text'>&#8249;</div>
            </button>
            <div className='container__imageHolder'>
                <ul onAnimationEnd={handleAnimationEnd} className={`${moveClass} container__slider`}>
                    {sliderItems.map ( (i) => 
                        <Card key={i.id} image={i.image}/>
                    )}
                </ul>
            </div>
            <button
                className='container__handle container__handle--right next'
                onClick={() => setMoveClass('prev')}
            >
                <div className='container__handle--text'>&#8250;</div>
            </button>
        </section>
    )
}

export default Slider;