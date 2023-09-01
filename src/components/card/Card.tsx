import React, { useState } from 'react';

import CustomCheck from '../customCheck/CustomCheck';
import "./card.scss"
export interface CardProps {
  completed:boolean,
  disc:string,
  endDate:string,
  gTag:string,
  pTag:string,
  startDate:string,
  title:string,
}
export const Card: React.FC<CardProps> = ({completed, disc,endDate,gTag,pTag,startDate,title}) => {
  const [isChecked, setIsChecked] = useState<boolean>(completed);
  return (
    <div className='cardColor'>
      <div className='card'>

        <p className='textCheck'>
          <CustomCheck checked={isChecked} onChange={setIsChecked}></CustomCheck>
          {title}
        </p>
        <div className='dateBlock'>
          <p className='date'>{startDate}</p>
          <p className='date'> {endDate}</p>
        </div>
        <p className='task'>{title}</p>
        <div className='imgTags'>


          <div className='tagBlock'>
            <div className='purpleTag'>{pTag}</div>
            <div className='grayTag'>{gTag}</div>
          </div>
          <img src='https://funik.ru/wp-content/uploads/2018/10/17478da42271207e1d86.jpg' className='img'></img>
        </div>
      </div>


    </div>
  );
}


