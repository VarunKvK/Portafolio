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
import Autoplay from "embla-carousel-autoplay";
import { v4 as uuidv4 } from 'uuid';

export default function CarouselDemo({ features }) {
  return (
    <div className="overflow-hidden">
      <Carousel
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
        className="w-full"
        key={uuidv4()}
      >
        <CarouselContent>
          {features.map((f, index) => (
            <CarouselItem key={index} className="w-full">
              <Card className="w-full">
                <CardContent className="w-full md:w-full bg-[#F1F1F1] dark:bg-[#15191a] border border-white/70 dark:border-[#282F30]/40 p-6 sm:p-8 flex flex-col justify-between gap-[90px] rounded-[30px]">
                  <div className="flex items-center gap-2">
                    <h1 className="text-lg sm:text-xl font-bold text-[#282F30] dark:text-[#f1f1f1]">
                      {f.featureTitle}
                    </h1>
                    <FontAwesomeIcon
                      icon={f.featureIcon}
                      className="text-lg sm:text-xl"
                    />
                  </div>
                  <p className="text-sm sm:text-base text-[#4D5657] dark:text-[#8c999b]">
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
