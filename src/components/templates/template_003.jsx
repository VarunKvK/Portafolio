const TemplateThree=()=>{
    return (
        `
            <style>
     .fade-in {
      animation: fadeIn 2s ease-in-out;
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    </style>
        <div class="min-h-screen bg-[#FFFFFF] fade-in font-inter">
        <nav class="w-full flex justify-between items-center px-8 py-4 z-50">
          <div class="w-full flex justify-between items-center">
            <a class="text-md md:text-lg font-bold text-[#2E2E2E]">Pulse</a>
            <div class="space-x-6 md:space-x-40">
              <a href="#contact" class="text-md md:text-md text-[#2E2E2E]">
                Contact
              </a>
              <a href="#projects" class="text-md md:text-md text-[#2E2E2E]">
                Projects
              </a>
            </div>
          </div>
        </nav>

        <div class="px-8 mt-10">
          <div class="flex items-center gap-10 h-[45vh]">
            <div class="h-full w-full">
              <img
                src="https://images.unsplash.com/photo-1541356665065-22676f35dd40?q=80&w=1941&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                class="w-full h-full object-cover"
              />
            </div>
            <div class="h-full w-full">
              <img
                src="https://images.unsplash.com/photo-1491895200222-0fc4a4c35e18?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGFic3RyYWN0fGVufDB8MHwwfHx8MA%3D%3D"
                alt=""
                class="w-full h-full object-cover"
              />
            </div>
            <div class="h-full w-full">
              <img
                src="https://images.unsplash.com/photo-1516670428252-df97bba108d1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                class="w-full h-full object-cover"
              />
            </div>
            <div class="h-full w-full">
              <img
                src="https://images.unsplash.com/photo-1532799044142-bace80c88320?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTc5fHxhYnN0cmFjdHxlbnwwfDB8MHx8fDA%3D"
                alt=""
                class="w-full h-full object-cover"
              />
            </div>
          </div>

          <div class="md:flex justify-center items-center gap-4 w-full ">
            <h1 class="font-bold text-[5rem] lg:text-[9rem] md:text-[5.5rem] text-[#858585] hover:text-[#8c2eff] transition-all duration-300">
              Graphic
            </h1>
            <h1 class="text-right lg:text-left font-thin italic text-[5rem] lg:text-[9rem] md:text-[5.5rem] text-[#282F30] hover:text-[#4aff3d] transition-all duration-300">
              Designer
            </h1>
          </div>
        </div>

        <div class="h-[80vh] p-10 md:p-20 mt-20">
          <p class="text-[28px] md:text-[40px] lg:text-[52px] text-[#CFCFCF] w-[90%]">
            I’m
            <span class="text-[#282F30] transition-all duration-300 hover:text-[#fd0]">
              Joe
            </span>
            , your friendly neighborhood
            <span class="text-[#282F30] transition-all duration-300 hover:text-[#f63b3b]">
              graphic designer
            </span>
            . When I’m not obsessing over pantone swatches, you’ll find me
            binge-watching cat videos or photoshopping my face onto famous
            paintings
          </p>
        </div>
        <div class="md:h-[40vh] mt-[5rem] w-full px-8 md:px-0" id="projects">
          <div class="hidden md:px-[4rem] w-full md:grid gap-[5rem]">
            <a
              href="https://unsplash.com/photos/a-close-up-of-an-abstract-painting-with-colors-VS_kFx4yF5g"
              class="relative w-full border-b border-black hover:border-[#8c2eff] group"
            >
              <div class="text-[#282F30] hover:text-[#858585] transition-all duration-300 relative w-full">
                <h1 class="text-[50px] font-thin italic">Project One</h1>
                <div class="absolute top-0 left-0 w-full h-full text-[#282F30] bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center pointer-events-none">
                  <p class="text-lg w-[90%] md:w-[70%]">
                    The demo project description is displayed here and you just
                    have to click on the respective project you want to check
                    out
                  </p>
                </div>
              </div>
              <div class="absolute top-0 left-0 w-full h-full transition-all duration-500">
                <div class="absolute -top-10 right-10 w-[30%] md:w-[20%] lg:w-[10%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <img
                    src="https://images.unsplash.com/photo-1541356665065-22676f35dd40?q=80&w=1941&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt=""
                    class="rotate-[20deg] shadow-lg w-full h-full object-cover"
                  />
                </div>
              </div>
            </a>

            <a
              href="https://unsplash.com/photos/white-and-gray-optical-illusion-7JX0-bfiuxQ"
              class="relative w-full border-b border-black hover:border-[#8c2eff] group"
            >
              <div class="text-[#282F30] hover:text-[#858585] transition-all duration-300 relative w-full">
                <h1 class="text-[50px] font-thin italic">Project Two</h1>
                <div class="absolute top-0 left-0 w-full h-full text-[#282F30] bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center pointer-events-none">
                  <p class="text-lg w-[90%] md:w-[70%]">
                    The demo project description is displayed here and you just
                    have to click on the respective project you want to check
                    out
                  </p>
                </div>
              </div>
              <div class="absolute top-0 left-0 w-full h-full transition-all duration-500">
                <div class="absolute -top-10 right-10 w-[30%] md:w-[20%] lg:w-[10%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <img
                    src="https://images.unsplash.com/photo-1491895200222-0fc4a4c35e18?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGFic3RyYWN0fGVufDB8MHwwfHx8MA%3D%3D"
                    alt=""
                    class="rotate-[20deg] shadow-lg w-full h-full object-cover"
                  />
                </div>
              </div>
            </a>

            <a
              href="https://unsplash.com/photos/a-close-up-of-a-water-droplet-with-a-blue-background-kCrrUx7US04"
              class="relative w-full border-b border-black hover:border-[#8c2eff] group"
            >
              <div class="text-[#282F30] hover:text-[#858585] transition-all duration-300 relative w-full">
                <h1 class="text-[50px] font-thin italic">Project Three</h1>
                <div class="absolute top-0 left-0 w-full h-full text-[#282F30] bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center pointer-events-none">
                  <p class="text-lg w-[90%] md:w-[70%]">
                    The demo project description is displayed here and you just
                    have to click on the respective project you want to check
                    out
                  </p>
                </div>
              </div>
              <div class="absolute top-0 left-0 w-full h-full transition-all duration-500">
                <div class="absolute -top-10 right-10 w-[30%] md:w-[20%] lg:w-[10%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <img
                    src="https://images.unsplash.com/photo-1516670428252-df97bba108d1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt=""
                    class="rotate-[20deg] shadow-lg w-full h-full object-cover"
                  />
                </div>
              </div>
            </a>

            <a
              href="https://unsplash.com/photos/a-blurry-image-of-a-building-with-a-clock-on-it-nBy2abg-6UM"
              class="relative w-full border-b border-black hover:border-[#8c2eff] group"
            >
              <div class="text-[#282F30] hover:text-[#858585] transition-all duration-300 relative w-full">
                <h1 class="text-[50px] font-thin italic">Project Four</h1>
                <div class="absolute top-0 left-0 w-full h-full text-[#282F30] bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center pointer-events-none">
                  <p class="text-lg w-[90%] md:w-[70%]">
                    The demo project description is displayed here and you just
                    have to click on the respective project you want to check
                    out
                  </p>
                </div>
              </div>
              <div class="absolute top-0 left-0 w-full h-full transition-all duration-500">
                <div class="absolute -top-10 right-10 w-[30%] md:w-[20%] lg:w-[10%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <img
                    src="https://images.unsplash.com/photo-1532799044142-bace80c88320?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTc5fHxhYnN0cmFjdHxlbnwwfDB8MHx8fDA%3D"
                    alt=""
                    class="rotate-[20deg] shadow-lg w-full h-full object-cover"
                  />
                </div>
              </div>
            </a>
          </div>
          <div class="md:hidden flex flex-col gap-4 p-4">
            <div class="flex flex-col gap-[5rem]">
              <div class="relative w-full">
                <div class="relative w-full">
                  <a
                    href="https://unsplash.com/photos/a-close-up-of-an-abstract-painting-with-colors-VS_kFx4yF5g"
                    class="underline underline-offset-4 text-[2rem] font-thin italic text-[#282F30]"
                  >
                    Project One
                  </a>
                  <p class="text-md w-[90%] text-[#282F30]">
                    The demo project description is displayed here and you just
                    have to click on the respective project you want to check
                    out
                  </p>
                </div>
                <div class="w-full mt-4">
                  <img
                    src="https://images.unsplash.com/photo-1541356665065-22676f35dd40?q=80&w=1941&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt=""
                    class="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div class="relative w-full">
                <div class="relative w-full">
                  <a
                    href="https://unsplash.com/photos/white-and-gray-optical-illusion-7JX0-bfiuxQ"
                    class="underline underline-offset-4 text-[2rem] font-thin italic text-[#282F30]"
                  >
                    Project Two
                  </a>
                  <p class="text-md w-[90%] text-[#282F30]">
                    The demo project description is displayed here and you just
                    have to click on the respective project you want to check
                    out
                  </p>
                </div>
                <div class="w-full mt-4">
                  <img
                    src="https://images.unsplash.com/photo-1491895200222-0fc4a4c35e18?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGFic3RyYWN0fGVufDB8MHwwfHx8MA%3D%3D"
                    alt=""
                    class="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div class="relative w-full">
                <div class="relative w-full">
                  <a
                    href="https://unsplash.com/photos/a-close-up-of-a-water-droplet-with-a-blue-background-kCrrUx7US04"
                    class="underline underline-offset-4 text-[2rem] font-thin italic text-[#282F30]"
                  >
                    Project Three
                  </a>
                  <p class="text-md w-[90%] text-[#282F30]">
                    The demo project description is displayed here and you just
                    have to click on the respective project you want to check
                    out
                  </p>
                </div>
                <div class="w-full mt-4">
                  <img
                    src="https://images.unsplash.com/photo-1516670428252-df97bba108d1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt=""
                    class="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div class="relative w-full">
                <div class="relative w-full">
                  <a
                    href="https://unsplash.com/photos/a-blurry-image-of-a-building-with-a-clock-on-it-nBy2abg-6UM"
                    class="underline underline-offset-4 text-[2rem] font-thin italic text-[#282F30]"
                  >
                    Project Four
                  </a>
                  <p class="text-md w-[90%] text-[#282F30]">
                    The demo project description is displayed here and you just
                    have to click on the respective project you want to check
                    out
                  </p>
                </div>
                <div class="w-full mt-4">
                  <img
                    src="https://images.unsplash.com/photo-1532799044142-bace80c88320?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTc5fHxhYnN0cmFjdHxlbnwwfDB8MHx8fDA%3D"
                    alt=""
                    class="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex items-end h-[90vh] px-12 py-4">
          <div class="md:flex items-center justify-between w-full">
            <h1 class="text-[2.5rem] md:text-[5rem] font-bold">
              <span class="transition-all duration-300 text-[#282F30] hover:text-[#4aff3d]">
                L
              </span>
              <span class="transition-all duration-300 text-[#282F30] hover:text-[#8c2eff]">
                e
              </span>
              <span class="transition-all duration-300 text-[#282F30] hover:text-[#fd0]">
                t
              </span>
              <span class="transition-all duration-300 text-[#282F30] hover:text-[#f63b3b]">
                's
              </span>
              <br />
              <span class="transition-all duration-300 text-[#282F30] hover:text-[#4aff3d]">
                C
              </span>
              <span class="transition-all duration-300 text-[#282F30] hover:text-[#fd0]">
                o
              </span>
              <span class="transition-all duration-300 text-[#282F30] hover:text-[#f63b3b]">
                n
              </span>
              <span class="transition-all duration-300 text-[#282F30] hover:text-[#8c2eff]">
                n
              </span>
              <span class="transition-all duration-300 text-[#282F30] hover:text-[#f63b3b]">
                e
              </span>
              <span class="transition-all duration-300 text-[#282F30] hover:text-[#fd0]">
                c
              </span>
              <span class="transition-all duration-300 text-[#282F30] hover:text-[#4aff3d]">
                t
              </span>
              <span class="transition-all duration-300 text-[#282F30] hover:text-[#8c2eff]">
                !
              </span>
            </h1>
            <div class="text-[#282F30] flex flex-row md:flex-col font-normal italic gap-4">
              <span>Instagram</span>
              <span>Dribble</span>
              <span>LinkedIn</span>
              <span>Twitter</span>
            </div>
          </div>
        </div>
      </div>

        `
    )}

return TemplateThree