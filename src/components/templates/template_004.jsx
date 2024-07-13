const TemplateFour = () => {
    const data = [
      {
        "name": "Project Case One",
        "description":
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel dictum enim. Sed nec consectetur purus. Donec vel sapien id lectus convallis auctor vitae vel felis.",
        "img_url":
          "https://images.unsplash.com/photo-1719858953565-f497ee4f4b0d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "url": "https://unsplash.com/photos/a-house-on-a-hill-with-lavender-growing-on-it-yfS9W9nQjCk"
      },
      {
        "name": "Project Case Two",
        "description":
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel dictum enim. Sed nec consectetur purus. Donec vel sapien id lectus convallis auctor vitae vel felis.",
        "img_url":
          "https://images.unsplash.com/photo-1719773341930-aeb0bb9ac6ef?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDI3fE04alZiTGJUUndzfHxlbnwwfHx8fHw%3D",
        "url": "https://unsplash.com/photos/a-black-and-white-photo-of-a-tall-building-h4eiti5OrrY"
      },
      {
        "name": "Project Case Three",
        "description":
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel dictum enim. Sed nec consectetur purus. Donec vel sapien id lectus convallis auctor vitae vel felis.",
        "img_url":
          "https://images.unsplash.com/photo-1719438646966-efb152b1b732?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDYwfE04alZiTGJUUndzfHxlbnwwfHx8fHw%3D",
        "url": "https://unsplash.com/photos/a-kitchen-with-a-stove-refrigerator-sink-and-stove-top-oven-LaoIUda0EFY"
      },
      {
        "name": "Project Case Four",
        "description":
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel dictum enim. Sed nec consectetur purus. Donec vel sapien id lectus convallis auctor vitae vel felis.",
        "img_url":
          "https://images.unsplash.com/photo-1719554873571-0fd6bf322bb1?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "url": "https://unsplash.com/photos/a-room-with-a-lot-of-tables-and-chairs-PeHuYdJDXw0"
      }
    ];
  
    const generateProjectHTML = (project) => `
      <a href="${project.url}" class="md:flex gap-16">
        <div class="relative md:h-[500px] md:w-[900px] h-[500px] w-auto">
          <img
            src="${project.img_url}"
            alt="${project.name}"
            class="object-cover w-full h-full"
          />
        </div>
        <div class="flex flex-col justify-between h-auto py-4">
          <h3 class="text-[3rem] md:text-[5rem] font-normal text-[#1e1e1e]">
            ${project.name}
          </h3>
          <p class="md:w-[70%] w-[80%] text-[1.2rem] text-[#1e1e1e]">
            ${project.description}
          </p>
        </div>
      </a>
    `;
  
    const projectsHTML = data.map(generateProjectHTML).join("");
  
    const templateHTML = `
        <style>
     .fade-in {
      animation: fadeIn 2s ease-in-out;
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    </style>
    <div class="w-full text-[#1e1e1e] bg-[#FFFFFF] font-outfit">
      <div class="px-8 py-4 flex items-center justify-between">
        <a href="#" class="text-xl" title="Logo/Website Name">
          Nova
        </a>
        <div class="flex items-center gap-[8rem]">
          <a href="#about" class="" title="Contact Section">
            About
          </a>
          <a href="#project" class="" title="Projects Section">
            Project
          </a>
        </div>
      </div>
      <div class="px-8 h-[92vh] flex items-end w-full">
        <div title="About Section" class="leading-tight w-full relative md:pb-10 md:-bottom-[4rem] md:flex justify-between items-end">
          <p class="md:text-[10rem] text-[4.5rem] text-left">Architect</p>
          <p class="w-[95%] text-sm md:w-[20%] md:pb-[2.5rem] pb-[1rem]" title="Description">
            I'm really good at building super intricate systems and designs that
            need some serious math skills and precise thinking.
          </p>
        </div>
      </div>
      <div class="flex flex-col gap-12 px-8 py-[10rem]" title="Projects Section">
          ${projectsHTML}
      </div>

      <div
        class="mt-[10rem] h-[80vh] flex gap-[10rem] flex-col justify-between max-w-8xl mx-auto w-full px-8 py-8"
      >
        <div class="flex justify-between w-full items-center">
          <a href="#" class="text-[5rem] font-semibold underline underline-offset-2">Nova</a>
        </div>
        <div
          class="flex flex-col md:flex-row justify-between md:items-end h-auto pb-4 gap-2"
        >
          <ul class="flex items-center gap-8">
            <li>
             <a href="#" class="" title="Instagram Link">
                Instagram
              </a>
            </li>
            <li>
            <a href="#" class="" title="Dribble Link">
                Dribble
              </a>
            </li>
            <li>
            <a href="#" class="" title="Twitter Link">
                Twitter
              </a>
            </li>
          </ul>
          <div class="">
            <p class="md:text-right text-left text-md">
               We can connect at <a href="mailto:@gmail.com" class="underline">nova@gmail.com</a>
            </p>
          </div>
        </div>
      </div>
    </div>
    `;
  
    return templateHTML;
  };
  
return TemplateFour;
  