"use client";
import FooterContainer from "@/components/FooterContainer";
import TemplatesContainer from "@/components/TemplatesContainer";
import Loader from "@/components/smallerComponents/Loader";
import { useEffect, useState } from "react";

const Templates = () => {
  const [template, setTemplate] = useState([]);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [userId,setuserId]=useState()

  useEffect(() => {
    const fetchTemplate = async () => {
      setProgress(80);
      try {
        const result = await fetch("/api/templateFetcher");
        if (result.ok) {
          const template_data = await result.json();
          setTemplate(template_data);
        } else {
          console.error("Failed to fetch templates");
          setProgress(0);
        }
      } catch (error) {
        console.error("Error fetching templates", error);
        setProgress(0); 
      } finally {
        setLoading(false); 
      }
    };

    const fetchuserId= async()=>{
      try{
        const resultId=await fetch("/api/usersData");
        if(resultId.ok){
          const userId=await resultId.json();
          setuserId(userId)
        }
      }catch (error) {
        console.error("Error fetching data", error)
      }
    }

    fetchTemplate();
    fetchuserId();
  }, []);

  return (
    <div className="max-w-6xl mx-auto pt-8">
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-7xl text-[#282F30] dark:text-[#f1f1f1] w-full text-center">
          Templates
        </h1>
        <p className="text-md text-[#4D5657] dark:text-[#4D5657] text-center">
          A small showroom of portfolio
        </p>
      </div>
      {loading && <Loader progress={progress} />}
      {!loading && (
        <div className="flex flex-col md:grid md:grid-cols-2 gap-10 max-w-6xl mx-auto w-full h-full mt-8 px-4">
          {template.map((data, index) => (
            <TemplatesContainer template_data={data} key={index} id={userId}/>
          ))}
        </div>
      )}
      <div className="mt-20 mb-10">
        <h1 className="text-2xl text-[#4D5657] dark:text-[#4D5657] text-center">
          More Coming Soon...
        </h1>
      </div>
      <FooterContainer/>
    </div>
  );
};

export default Templates;
