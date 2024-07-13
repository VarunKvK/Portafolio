'use client'
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Autoplay from "embla-carousel-autoplay"
import { v4 as uuidv4 } from 'uuid';


export default function CarouselDemo({ features }) {
  return (
    <div className="w-full sm:max-w-2xl max-w-md">
      <Carousel plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]} className="" key={uuidv4()}>
        <CarouselContent>
          {features.map((f, index) => (
            <CarouselItem  key={index}>
              <Card>
                <CardContent className="bg-[#F1F1F1] dark:bg-[#15191a] border border-white/70 dark:border-[#282F30]/40 px-[40px] py-[50px] flex flex-col justify-between gap-[80px] rounded-[30px]">
                  <div className="flex items-center gap-1">
                    <h1 className="text-[25px] font-bold text-[#282F30] dark:text-[#f1f1f1]">
                      {f.featureTitle}
                    </h1>
                    <FontAwesomeIcon
                      icon={f.featureIcon}
                      className="text-[24px]"
                    />
                  </div>
                  <p className="text-[#4D5657] dark:text-[#8c999b] w-[70%] text-[15px]">
                    {f.featureDescription}
                  </p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
