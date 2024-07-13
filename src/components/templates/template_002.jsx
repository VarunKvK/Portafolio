const TemplateTwo = () => {
  return `
    <style>
     .fade-in {
      animation: fadeIn 2s ease-in-out;
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    </style>

<div class="min-h-screen bg-[#141D2E] fade-in">
  <!-- Navbar -->
  <nav class="w-full flex justify-between items-center p-4">
    <div class="w-full flex justify-between items-center">
      <a
        class="text-3xl font-regular text-[#006AFF] font-libre"
        href="#home"
        title="Logo/Website Name"
      >
        LenCart
      </a>
      <a
        href="#projects"
        class="text-[#006AFF] hover:underline hover:underline-[#006AFF] transition-all duration-200"
        title="Projects Section"
      >
        Projects
      </a>
      <a
        href="#contact"
        class="text-[#006AFF] hover:underline hover:underline-[#006AFF] transition-all duration-200"
        title="Contact Section"
      >
        Contact
      </a>
    </div>
  </nav>

  <!-- About Section -->
  <div class="px-6 py-8" id="home">
    <div
      class="h-[60vh] md:h-[50vh] md:flex grid items-center w-full relative"
      id="about"
      title="About Section"
    >
      <div class="px-4 w-full flex justify-center items-center">
        <h1
          class="text-[50px] text-center sm:text-[50px] md:text-[8rem] font-bold text-[#006Aff]"
          title="Photographer Title"
        >
          Photographer
        </h1>
      </div>
      <span
        class="text-center text-sm text-[#006AFF] font-regular md:hidden"
        title="Love for Camera and Creativity"
      >
        Love for
      </span>
      <div class="md:absolute flex items-center justify-between w-full"  title="Header">
        <span class="text-sm text-[#006AFF] font-regular">Camera</span>
        <span class="text-sm text-[#006AFF] font-regular md:hidden"> & </span>
        <span class="text-sm text-[#006AFF] font-regular">Creativity</span>
      </div>
    </div>
    <div class="flex flex-col justify-end h-[36vh]">
      <div class="grid gap-6 md:flex items-end justify-between w-full">
        <div class="flex justify-between md:justify-normal w-full items-end gap-8">
          <a
            href="#home"
            class="text-sm text-[#006AFF] font-regular"
            title="Instagram Link"
          >
            Instagram
          </a>
          <a
            href="#home"
            class="text-sm text-[#006AFF] font-regular"
            title="Unsplash Link"
          >
            Unsplash
          </a>
          <a
            href="#home"
            class="text-sm text-[#006AFF] font-regular"
            title="Pinterest Link"
          >
            Pinterest
          </a>
          <a
            href="#home"
            class="text-sm text-[#006AFF] font-regular"
            title="Twitter Link"
          >
            Twitter
          </a>
        </div>
        <div class="flex gap-2 relative md:w-[50%] md:justify-end">
          <p
            class="md:text-sm text-lgg text-[#006Aff] md:w-[50%] border-t border-[#006Aff] pt-2"
            title="Description"
          >
            I am a Photographer, focused on creating beautiful memories for
            people to remember and resonate. This is my passion and would
            love to help you too.
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- Projects Section -->
  <div class="mt-[5rem] w-full" id="projects">
    <div class="flex justify-center">
      <div class="relative">
        <h1
          class="text-[5rem] text-center md:text-[8rem] font-bold text-[#006Aff]"
          title="Projects Title"
        >
          Projects
        </h1>
        <div class="absolute md:top-0 -top-2">
          <p
            class="text-left text-sm text-[#006AFF] font-regular w-[10%]"
            title="Projects Subtitle"
          >
            Some Selected
          </p>
        </div>
      </div>
    </div>
    <div class="my-10">
      <div class="px-8 py-4 md:grid-cols-2 md:grid flex flex-wrap justify-center md:gap-2 gap-10">
        <a
          href="https://unsplash.com/photos/yellow-and-white-balloons-on-orange-surface-PGdW_bHDbpI"
          class="relative transition-all duration-200 md:w-auto md:h-auto"
          title="Project One Image"
        >
          <img
            src="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Yellow and White Balloons"
            class="md:w-full md:h-full object-cover transition-all duration-200"
          />
          <div class="bg-[#fff] md:bg-[#006AFF] md:text-[#fff] z-10 text-[#006AFF] p-4 gap-8 relative md:absolute md:bottom-[0rem] flex flex-col items-center justify-center md:w-full md:h-full md:hover:scale-105 md:scale-1 md:opacity-0 md:hover:opacity-100 transition-all duration-200">
            <h1 class="md:text-[3rem] text-[2rem] font-bold md:text-center" title="Project One Title">
              Project One
            </h1>
            <p class="md:w-[60%] text-[1rem] md:text-center" title="Project One Description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Aperiam, fuga!
            </p>
          </div>
        </a>
        <a
          href="https://unsplash.com/photos/a-mountain-range-with-rocks-in-the-foreground-and-mountains-in-the-background-KBn3vqsFkDo"
          class="relative transition-all duration-200 md:w-auto md:h-auto"
          title="Project Two Image"
        >
          <img
            src="https://images.unsplash.com/photo-1717729124904-13a800c62b06?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Blue and Teal Abstract Painting"
            class="md:w-full md:h-full object-cover transition-all duration-200"
          />
          <div class="bg-[#fff] md:bg-[#006AFF] md:text-[#fff] z-10 text-[#006AFF] p-4 gap-8 relative md:absolute md:bottom-[0rem] flex flex-col items-center justify-center md:w-full md:h-full md:hover:scale-105 md:scale-1 md:opacity-0 md:hover:opacity-100 transition-all duration-200">
            <h1 class="md:text-[3rem] text-[2rem] font-bold md:text-center" title="Project Two Title">
              Project Two
            </h1>
            <p class="md:w-[60%] text-[1rem] md:text-center" title="Project Two Description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Aperiam, fuga!
            </p>
          </div>
        </a>
        <a
          href="https://unsplash.com/photos/a-close-up-of-water-droplets-on-a-window-pVoEPpLw818"
          class="relative md:w-auto md:h-auto transition-all duration-200"
          title="Project Three Image"
        >
          <img
            src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Water Droplets on Window"
            class="md:w-full md:h-full object-cover transition-all duration-200"
          />
          <div class="bg-[#fff] md:bg-[#006AFF] md:text-[#fff] z-10 text-[#006AFF] p-4 gap-8 relative md:absolute md:bottom-[0rem] flex flex-col items-center justify-center md:w-full md:h-full md:hover:scale-105 md:scale-1 md:opacity-0 md:hover:opacity-100 transition-all duration-200 z-100">
            <h1 class="md:text-[3rem] text-[2rem] font-bold md:text-center" title="Project Three Title">
              Project Three
            </h1>
            <p class="md:w-[60%] text-[1rem] md:text-center" title="Project Three Description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Aperiam, fuga!
            </p>
          </div>
        </a>
        <a
          href="https://unsplash.com/photos/a-close-up-of-a-blue-and-yellow-lgiquid-F573ZRbKOEw"
          class="relative md:w-auto md:h-auto transition-all duration-200"
          title="Project Four Image"
        >
          <img
            src="https://images.unsplash.com/photo-1550684848-86a5d8727436?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Blue and Yellow Liquid"
            class="md:w-full md:h-full object-cover transition-all duration-200"
          />
          <div class="bg-[#fff] md:bg-[#006AFF] md:text-[#fff] z-10 text-[#006AFF] p-4 gap-8 relative md:absolute md:bottom-[0rem] flex flex-col items-center justify-center md:w-full md:h-full md:hover:scale-105 md:scale-1 md:opacity-0 md:hover:opacity-100 transition-all duration-200 z-100">
            <h1 class="md:text-[3rem] text-[2rem] font-bold md:text-center" title="Project Four Title">
              Project Four
            </h1>
            <p class="md:w-[60%] text-[1rem] md:text-center" title="Project Four Description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Aperiam, fuga!
            </p>
          </div>
        </a>
      </div>
    </div>
  </div>

  <!-- Contact Section -->
  <div class="flex flex-col items-end h-auto py-10 px-4" id="contact">
    <div class="md:flex justify-evenly gap-20 items-end w-full mt-[10rem]">
      <div class="md:flex justify-between w-full md:border-none border-b border-[#006AFF] mb-8 md:mb-0">
        <p
          class="text-md md:text-sm text-[#006AFF] font-regular md:w-[40%] text-[1rem] w-[80%] mb-4 md:mb-0"
          title="Contact Description"
        >
          Feel free to contact me on my socials. It would be a pleasure to
          help you!
        </p>
        <p
          class="text-md md:text-sm text-right text-[#006AFF] font-regular md:w-[20%] mb-4 md:mb-0"
          title="Contact Email"
        >
          Even contact me at <a
            href="mailto:lescraft@gmail.com"
            class="underline underline-offset-2"
            title="Email Link"
          >
            lescraft@gmail.com
          </a>
        </p>
      </div>
      <div class="flex flex-col gap-4 md:flex-row justify-between w-full">
        <div class="flex gap-4 items-end md:gap-8">
          <a href="#home" class="text-sm text-[#006AFF] font-regular" title="Instagram Link">Instagram</a>
          <a href="#home" class="text-sm text-[#006AFF] font-regular" title="Unsplash Link">Unsplash</a>
          <a href="#home" class="text-sm text-[#006AFF] font-regular" title="Pinterest Link">Pinterest</a>
          <a href="#home" class="text-sm text-[#006AFF] font-regular" title="Twitter Link">Twitter</a>
        </div>
        <div class="">
          <p
            class="text-right md:text-left text-sm text-[#006AFF] font-regular"
            title="Footer Text"
          >
            © 2022 Portafolio. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
`;
};

return TemplateTwo();
