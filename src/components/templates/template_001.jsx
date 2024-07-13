const TemplateOne = () => {
  return `
  <style>
    /* Custom animations */
    .fade-in {
      animation: fadeIn 2s ease-in-out;
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

  </style>
<div class="min-h-screen bg-[#1d1d1d] fade-in">
  <!-- Navbar -->
  <nav class="flex justify-between items-center p-4">
    <div class="flex items-center">
      <a class="text-lg font-bold text-white" href="#home" title="Logo/Website Name">Divine</a>
    </div>
    <div class="flex md:gap-[5rem] gap-[2rem]" id="menu-links">
      <a href="#about" class="text-white hover:text-white/40 transition-all duration-200" title="About Section">About</a>
      <a href="#projects" class="text-white hover:text-white/40 transition-all duration-200" title="Projects Section">Projects</a>
      <a href="#contact" class="text-white hover:text-white/40 transition-all duration-200" title="Contact Section">Contact</a>
    </div>
  </nav>

  <!-- Main Content -->
  <div class="container mx-auto py-8">
    <!-- Header -->
    <div class="h-screen flex items-center" id="about">
      <div class="px-4">
        <h1 class="text-[4.5rem] md:text-[8rem] font-bold text-white" title="Photographer's Name">Hello, I'm John Doe.</h1>
        <p class="text-sm md:text-lg text-white/40 mb-4 w-[80%] md:w-[50%]" title="Photographer's Description">I'm a senior developer and solution architect, who has worked on multiple problems and created unique design solutions for users to have a seamless experience.</p>
      </div>
    </div>

    <!-- Main Section -->
    <main class="grid grid-cols-1 md:grid-cols-2 gap-6" id="projects">
      <div class="flex flex-col gap-4">
        <div class="w-[100%] bg-[#141414] rounded-[2rem] p-2 transition-all duration-200 md:hover:shadow-md">
          <div class="w-full relative">
            <a href="https://www.pexels.com/photo/an-artist-s-illustration-of-artificial-intelligence-ai-this-image-represents-the-boundaries-set-in-place-to-secure-safe-accountable-biotechnology-it-was-created-by-artist-khyati-treha-17484901/t" class="bg-[#1d1d1d] px-4 py-2 text-white absolute top-2 left-2 rounded-full md:hover:shadow-md transition-all duration-200" title="Link to Project One">Visit Project</a>
            <img class="w-full rounded-[1.5rem]" src="https://images.pexels.com/photos/17484901/pexels-photo-17484901/free-photo-of-an-artist-s-illustration-of-artificial-intelligence-ai-this-image-represents-the-boundaries-set-in-place-to-secure-safe-accountable-biotechnology-it-was-created-by-artist-khyati-treha.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Project One" title="Project One Image" />
          </div>
          <div class="p-6 flex-col flex md:flex-row md:items-center md:gap-12 gap-4">
            <a href="#about" class="text-2xl md:text-3xl text-white font-bold underline underline-offset-2" title="Project One Title">Project One</a>
            <p class="w-[80%] text-white/40 text-sm" title="Project One Description">Project Four is a cutting-edge fitness app that leverages AI to create personalized workout plans and nutrition guides.</p>  
          </div>
        </div>

        <div class="w-[100%] bg-[#141414] rounded-[2rem] p-2 transition-all duration-200 md:hover:shadow-md">
          <div class="w-full relative">
            <a href="https://www.pexels.com/photo/an-artist-s-illustration-of-artificial-intelligence-ai-this-image-depicts-a-look-inside-how-ai-microchips-are-designed-it-was-created-by-champ-panupong-techawongthawon-as-part-of-the-v-17483848/" class="bg-[#1d1d1d] px-4 py-2 text-white absolute top-2 left-2 rounded-full md:hover:shadow-md transition-all duration-200" title="Link to Project Two">Visit Project</a>
            <img class="w-full rounded-[1.5rem]" src="https://images.pexels.com/photos/17483848/pexels-photo-17483848/free-photo-of-an-artist-s-illustration-of-artificial-intelligence-ai-this-image-depicts-a-look-inside-how-ai-microchips-are-designed-it-was-created-by-champ-panupong-techawongthawon-as-part-of-the-v.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Project Two" title="Project Two Image" />
          </div>
          <div class="p-6 flex-col flex md:flex-row md:items-center md:gap-12 gap-4">
            <a href="https://www.pexels.com/photo/an-artist-s-illustration-of-artificial-intelligence-ai-this-image-represents-the-boundaries-set-in-place-to-secure-safe-accountable-biotechnology-it-was-created-by-artist-khyati-treha-17484901/" class="text-2xl md:text-3xl text-white font-bold underline underline-offset-2" title="Project Two Title">Project Three</a>
            <p class="w-[80%] text-white/40 text-sm" title="Project Two Description">Project Four is a cutting-edge fitness app that leverages AI to create personalized workout plans and nutrition guides.</p>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-4">
        <div class="w-[100%] bg-[#141414] rounded-[2rem] p-2 transition-all duration-200 md:hover:shadow-md order-last md:order-none">
          <div class="w-full relative">
            <a href="https://www.pexels.com/photo/an-artist-s-illustration-of-artificial-intelligence-ai-this-image-depicts-a-look-inside-how-ai-microchips-are-designed-it-was-created-by-champ-panupong-techawongthawon-as-part-of-the-v-17483848/" class="bg-[#1d1d1d] px-4 py-2 text-white absolute top-2 left-2 rounded-full md:hover:shadow-md transition-all duration-200" title="Link to Project Three">Visit Project</a>
            <img class="w-full rounded-[1.5rem]" src="https://images.pexels.com/photos/17483848/pexels-photo-17483848/free-photo-of-an-artist-s-illustration-of-artificial-intelligence-ai-this-image-depicts-a-look-inside-how-ai-microchips-are-designed-it-was-created-by-champ-panupong-techawongthawon-as-part-of-the-v.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Project Three" title="Project Three Image" />
          </div>
          <div class="p-6 flex-col flex md:flex-row md:items-center md:gap-12 gap-4">
            <a href="https://www.pexels.com/photo/an-artist-s-illustration-of-artificial-intelligence-ai-this-image-depicts-a-look-inside-how-ai-microchips-are-designed-it-was-created-by-champ-panupong-techawongthawon-as-part-of-the-v-17483848/" class="text-2xl md:text-3xl text-white font-bold underline underline-offset-2" title="Project Three Title">Project Two</a>
            <p class="w-[80%] text-white/40 text-sm" title="Project Three Description">Project Four is a cutting-edge fitness app that leverages AI to create personalized workout plans and nutrition guides.</p>
          </div>
        </div>

        <div class="w-[100%] bg-[#141414] rounded-[2rem] p-2 transition-all duration-200 md:hover:shadow-md">
          <div class="w-full relative">
            <a href="https://www.pexels.com/photo/an-artist-s-illustration-of-artificial-intelligence-ai-this-image-depicts-a-look-inside-how-ai-microchips-are-designed-it-was-created-by-champ-panupong-techawongthawon-as-part-of-the-v-17483848/" class="bg-[#1d1d1d] px-4 py-2 text-white absolute top-2 left-2 rounded-full md:hover:shadow-md transition-all duration-200" title="Link to Project Four">Visit Project</a>
            <img class="w-full rounded-[1.5rem]" src="https://images.pexels.com/photos/17484901/pexels-photo-17484901/free-photo-of-an-artist-s-illustration-of-artificial-intelligence-ai-this-image-represents-the-boundaries-set-in-place-to-secure-safe-accountable-biotechnology-it-was-created-by-artist-khyati-treha.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Project Four" title="Project Four Image" />
          </div>
          <div class="p-6 flex-col flex md:flex-row md:items-center md:gap-12 gap-4">
            <a href="https://www.pexels.com/photo/an-artist-s-illustration-of-artificial-intelligence-ai-this-image-depicts-a-look-inside-how-ai-microchips-are-designed-it-was-created-by-champ-panupong-techawongthawon-as-part-of-the-v-17483848/" class="text-2xl md:text-3xl text-white font-bold underline underline-offset-2" title="Project Four Title">Project Four</a>
            <p class="w-[80%] text-white/40 text-sm" title="Project Four Description">Project Four is a cutting-edge fitness app that leverages AI to create personalized workout plans and nutrition guides.</p>
          </div>
        </div>
      </div>
    </main>
  </div>

  <!-- Footer -->
  <footer class="p-4 mt-8 bg-[#1d1d1d]" id="contact">
    <div class="container mx-auto">
      <div class="text-center mb-4">
        <h1 class="text-[4.5rem] sm:text-[8rem] md:text-[10rem] lg:text-[13rem] font-bold text-white" title="Photographer's Name">John Doe.</h1>
      </div>
      <div class="flex flex-col md:flex-row justify-between items-center">
        <div class="flex gap-4 mb-4 md:mb-0">
          <a href="#" class="text-white hover:text-white/40 transition-all duration-200" title="Instagram Profile">Instagram</a>
          <a href="#" class="text-white hover:text-white/40 transition-all duration-200" title="Facebook Profile">Facebook</a>
          <a href="#" class="text-white hover:text-white/40 transition-all duration-200" title="Twitter Profile">Twitter</a>
          <a href="#" class="text-white hover:text-white/40 transition-all duration-200" title="Github Profile">Github</a>
        </div>
        <div class="flex gap-4">
          <a href="#about" class="text-white hover:text-white/40 transition-all duration-200" title="About Section">About</a>
          <a href="#projects" class="text-white hover:text-white/40 transition-all duration-200" title="Projects Section">Projects</a>
          <a href="#contact" class="text-white hover:text-white/40 transition-all duration-200" title="Contact Section">Contact</a>
        </div>
      </div>
    </div>
  </footer>
</div>

  `;
};

return TemplateOne();