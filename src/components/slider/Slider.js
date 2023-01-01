import React, { useEffect, useState } from "react";

import {CCarousel, CCarouselItem, CImage} from '@coreui/react'
import One from '../../assets/1.avif';
import Two from '../../assets/2.avif';
import Three from '../../assets/3.avif';
import Four from '../../assets/4.avif';



function Slider() {
    return(
        <div className="shadow-lg">
        <CCarousel controls>
  <CCarouselItem >
    <CImage className="d-block w-100" src={One} alt="slide 1" />
  </CCarouselItem>
  <CCarouselItem>
    <CImage className="d-block w-100" src={Two} alt="slide 2" />
  </CCarouselItem>
  <CCarouselItem>
    <CImage className="d-block w-100" src={Three} alt="slide 3" />
  </CCarouselItem>
  <CCarouselItem>
    <CImage className="d-block w-100" src={Four} alt="slide 4" />
  </CCarouselItem>
</CCarousel>
</div>
    )
}


export default Slider;