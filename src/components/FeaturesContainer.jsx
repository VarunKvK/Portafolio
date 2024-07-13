import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FeaturesContainer = ({featureTitle,featureDescription,featureIcon}) => {
  return (
    <div className="bg-[#F1F1F1] border border-white/70 dark:bg-[#15191a] dark:border-[#282F30]/40 px-[40px] py-[50px] flex flex-col gap-[80px] rounded-[30px]">
      <div className="flex items-center gap-2">
        <h1 className="text-[#282F30] dark:text-[#f1f1f1] text-[24px] font-bold">{featureTitle}</h1>
        <FontAwesomeIcon icon={featureIcon} className="w-[24px] text-[24px]"/>
      </div>
      <p className="text-[#4D5657] dark:text-[#8c999b] w-[90%] text-[15px]">
        {featureDescription}
      </p>
    </div>
  );
};

export default FeaturesContainer;
