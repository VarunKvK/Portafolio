import React, { useEffect, useState } from 'react';

const Architect_Code_Dynamic_004 = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch('/api/userData', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      const data = await response.json();
      setUserData(data);
    };

    fetchUserData();
  }, []);
  
  const renderProjects = userData.portfolioInfo.projects.map(project => (
    <a href={project.url} className="grid gap-[4rem] grid-cols-2 w-full" key={project.name}>
      <div className="w-auto relative aspect-w-16 aspect-h-9">
        <img src={project.project_image_url} alt={project.name} className="object-cover w-full h-full" />
      </div>
      <div className="flex flex-col justify-between h-auto py-4">
        <h1 className="text-[4rem]">{project.name}</h1>
        <p className="text-md text-[#1d1b1d]/50">{project.description}</p>
      </div>
    </a>
  ));

  const renderSocialLinks = userData.portfolioInfo.socials.map(link => (
    <li className="list-none" key={link.social_name}>
      <a href={link.url} className="text-md">{link.social_name}</a>
    </li>
  ));

  return (
    <div className="max-w-8xl w-full bg-[#FFFFFF] text-[#1e1e1e] mx-auto font-outfit">
      <div className="px-8 py-4 flex justify-between items-center">
        <div>
          <a href="#" className="text-lg">{userData.portfolioInfo.bio.websiteName}</a>
        </div>
        <nav className="flex items-center gap-[8rem]">
          <a href="#about" className="text-md">About</a>
          <a href="#projects" className="text-md">Projects</a>
        </nav>
      </div>

      <div className="px-8 max-w-8xl mx-auto w-full h-auto">
        <div className="lg:h-[72vh] md:h-[80vh] sm:h-[65vh] h-[44vh] w-full flex items-end">
          <div className="grid gap-1 grid-row-2 lg:flex flex-nowrap items-center justify-between">
            <p className="text-[5rem] lg:text-[6rem]">{userData.portfolioInfo.bio.username}</p>
            <p className="text-sm lg:w-[30%] md:w-[40%] w-auto">{userData.portfolioInfo.bio.bio}</p>
          </div>
        </div>
      </div>

      {/* Projects Container */}
      <div id="projects-container" className="mt-[10rem] flex flex-col gap-8 max-w-8xl px-8 mx-auto">
        {renderProjects}
      </div>

      {/* Footer Section */}
      <div className="mt-[10rem] h-[80vh] flex gap-[10rem] flex-col justify-between max-w-8xl mx-auto w-full px-8 py-8">
        <div className="flex justify-between w-full items-center">
          <a href="#" className="text-[5rem] font-semibold underline underline-offset-2">{userData.portfolioInfo.bio.websiteName}</a>
        </div>
        <div className="flex flex-col md:flex-row justify-between md:items-end h-auto pb-4 gap-2">
          <ul id="social-links-container" className="flex items-center gap-8">
            {renderSocialLinks}
          </ul>
          <div>
            <p className="md:text-right text-left text-md">
              We can connect at <a href={`mailto:${userData.email}`} className="underline">{userData.email}</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Architect_Code_Dynamic_004;
