// Premium Block Library for Web Builder
// This expands the basic block library with more advanced, premium components

export const blockLibrary = {
  // Navigation Components
  navigation: [
    {
      id: "navbar-premium",
      label: "Premium Navbar",
      category: "Navigation",
      premium: true,
      description: "Responsive navbar with dropdown menus",
      content: `
        <nav class="bg-white shadow-sm py-4 px-6 w-full">
          <div class="max-w-7xl mx-auto flex justify-between items-center">
            <div class="flex items-center">
              <span class="text-xl font-bold text-gray-800">Brand</span>
            </div>
            <div class="hidden md:flex space-x-8">
              <a href="#" class="text-gray-600 hover:text-gray-900">Home</a>
              <a href="#" class="text-gray-600 hover:text-gray-900">Features</a>
              <a href="#" class="text-gray-600 hover:text-gray-900">Pricing</a>
              <a href="#" class="text-gray-600 hover:text-gray-900">About</a>
            </div>
            <div class="hidden md:block">
              <button class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Get Started</button>
            </div>
            <div class="md:hidden">
              <button class="text-gray-600 hover:text-gray-900 focus:outline-none">
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </nav>
      `,
      thumbnail: "/assets/blocks/navbar-premium.jpg",
    },
    {
      id: "mega-menu",
      label: "Mega Menu",
      category: "Navigation",
      premium: true,
      description: "Advanced mega menu with multiple columns",
      content: `
        <div class="relative bg-white shadow-md">
          <div class="max-w-7xl mx-auto px-4 sm:px-6">
            <div class="flex justify-between items-center py-6 md:justify-start md:space-x-10">
              <div class="flex justify-start lg:w-0 lg:flex-1">
                <a href="#">
                  <span class="text-xl font-bold text-gray-800">Brand</span>
                </a>
              </div>
              <div class="-mr-2 -my-2 md:hidden">
                <button type="button" class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none">
                  <span class="sr-only">Open menu</span>
                  <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
              <nav class="hidden md:flex space-x-10">
                <div class="relative">
                  <button type="button" class="group bg-white rounded-md text-gray-500 inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none">
                    <span>Solutions</span>
                    <svg class="ml-2 h-5 w-5 text-gray-400 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
                <a href="#" class="text-base font-medium text-gray-500 hover:text-gray-900">Pricing</a>
                <a href="#" class="text-base font-medium text-gray-500 hover:text-gray-900">About</a>
                <a href="#" class="text-base font-medium text-gray-500 hover:text-gray-900">Contact</a>
              </nav>
              <div class="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                <a href="#" class="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">Sign in</a>
                <a href="#" class="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">Sign up</a>
              </div>
            </div>
          </div>
        </div>
      `,
      thumbnail: "/assets/blocks/mega-menu.jpg",
    },
  ],

  // Hero Sections
  heroes: [
    {
      id: "hero-split-image",
      label: "Hero with Image",
      category: "Heroes",
      premium: true,
      description: "Split hero section with image",
      content: `
        <section class="bg-white py-20">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex flex-col md:flex-row items-center">
              <div class="md:w-1/2 md:pr-10 mb-10 md:mb-0">
                <h1 class="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                  <span class="block xl:inline">Data to enrich your</span>
                  <span class="block text-indigo-600 xl:inline">online business</span>
                </h1>
                <p class="mt-3 max-w-md mx-auto md:mx-0 text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl">
                  Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.
                </p>
                <div class="mt-5 sm:mt-8 sm:flex sm:justify-start">
                  <div class="rounded-md shadow">
                    <a href="#" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                      Get started
                    </a>
                  </div>
                  <div class="mt-3 sm:mt-0 sm:ml-3">
                    <a href="#" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10">
                      Live demo
                    </a>
                  </div>
                </div>
              </div>
              <div class="md:w-1/2">
                <img class="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full rounded-lg shadow-lg" src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80" alt="">
              </div>
            </div>
          </div>
        </section>
      `,
      thumbnail: "/assets/blocks/hero-split-image.jpg",
    },
    {
      id: "hero-centered-gradient",
      label: "Gradient Hero",
      category: "Heroes",
      premium: true,
      description: "Centered hero with gradient background",
      content: `
        <section class="relative bg-gradient-to-r from-purple-600 to-indigo-600 py-20 px-6">
          <div class="max-w-5xl mx-auto text-center">
            <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight text-white sm:text-6xl">
              <span class="block">Take your business</span>
              <span class="block">to the next level</span>
            </h1>
            <p class="mt-6 max-w-lg mx-auto text-xl text-indigo-100">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas non finibus eros, eu molestie risus.
            </p>
            <div class="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
              <div class="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
                <a href="#" class="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-indigo-700 bg-white hover:bg-indigo-50 sm:px-8">
                  Get started
                </a>
                <a href="#" class="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-500 bg-opacity-60 hover:bg-opacity-70 sm:px-8">
                  Live demo
                </a>
              </div>
            </div>
          </div>
        </section>
      `,
      thumbnail: "/assets/blocks/hero-centered-gradient.jpg",
    },
  ],

  // Features
  features: [
    {
      id: "feature-cards",
      label: "Feature Cards",
      category: "Features",
      premium: true,
      description: "Feature cards with icons",
      content: `
        <section class="bg-white py-20 px-6">
          <div class="max-w-7xl mx-auto">
            <div class="text-center mb-16">
              <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Why choose our platform?
              </h2>
              <p class="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
                Everything you need to grow your business online.
              </p>
            </div>
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div class="bg-white p-8 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div class="w-12 h-12 bg-indigo-100 rounded-md flex items-center justify-center mb-5">
                  <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-3">Lightning Fast</h3>
                <p class="text-gray-600">Optimized for speed and performance, delivering a smooth experience for your visitors.</p>
              </div>
              <div class="bg-white p-8 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div class="w-12 h-12 bg-indigo-100 rounded-md flex items-center justify-center mb-5">
                  <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                  </svg>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-3">Secure by Default</h3>
                <p class="text-gray-600">Enterprise-grade security to protect your data and your customers' information.</p>
              </div>
              <div class="bg-white p-8 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div class="w-12 h-12 bg-indigo-100 rounded-md flex items-center justify-center mb-5">
                  <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path>
                  </svg>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-3">Responsive Design</h3>
                <p class="text-gray-600">Perfect display on all devices, from desktop computers to mobile phones.</p>
              </div>
            </div>
          </div>
        </section>
      `,
      thumbnail: "/assets/blocks/feature-cards.jpg",
    },
    {
      id: "feature-with-screenshots",
      label: "Features with Screenshots",
      category: "Features",
      premium: true,
      description: "Feature sections with screenshots",
      content: `
        <section class="bg-white py-24 px-6">
          <div class="max-w-7xl mx-auto">
            <div class="text-center mb-20">
              <h2 class="text-base font-semibold text-indigo-600 tracking-wide uppercase">Features</h2>
              <p class="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight">A better way to build websites</p>
              <p class="max-w-xl mt-5 mx-auto text-xl text-gray-500">Discover how our platform can help you create stunning websites without any coding knowledge.</p>
            </div>

            <div class="mt-16">
              <div class="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
                <div class="px-4 max-w-xl mx-auto sm:px-6 lg:py-16 lg:max-w-none lg:mx-0 lg:px-0">
                  <div>
                    <div>
                      <span class="h-12 w-12 rounded-md flex items-center justify-center bg-indigo-600">
                        <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"></path>
                        </svg>
                      </span>
                    </div>
                    <div class="mt-6">
                      <h2 class="text-3xl font-extrabold tracking-tight text-gray-900">
                        Intuitive drag-and-drop interface
                      </h2>
                      <p class="mt-4 text-lg text-gray-500">
                        Build beautiful websites with our intuitive drag-and-drop interface. No coding required. 
                        Simply drag elements onto your page, customize them, and publish your site in minutes.
                      </p>
                      <div class="mt-6">
                        <a href="#" class="inline-flex px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
                          Get started
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mt-12 sm:mt-16 lg:mt-0">
                  <div class="pl-4 -mr-48 sm:pl-6 md:-mr-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
                    <img class="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none" src="https://tailwindui.com/img/component-images/inbox-app-screenshot-1.jpg" alt="Inbox user interface">
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-24">
              <div class="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
                <div class="px-4 max-w-xl mx-auto sm:px-6 lg:py-32 lg:max-w-none lg:mx-0 lg:px-0 lg:col-start-2">
                  <div>
                    <div>
                      <span class="h-12 w-12 rounded-md flex items-center justify-center bg-indigo-600">
                        <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
                        </svg>
                      </span>
                    </div>
                    <div class="mt-6">
                      <h2 class="text-3xl font-extrabold tracking-tight text-gray-900">
                        Premium templates and components
                      </h2>
                      <p class="mt-4 text-lg text-gray-500">
                        Access hundreds of premium templates and components to jumpstart your website development. 
                        Customize them to match your brand and style with just a few clicks.
                      </p>
                      <div class="mt-6">
                        <a href="#" class="inline-flex px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
                          View templates
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mt-12 sm:mt-16 lg:mt-0 lg:col-start-1">
                  <div class="pr-4 -ml-48 sm:pr-6 md:-ml-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
                    <img class="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:right-0 lg:h-full lg:w-auto lg:max-w-none" src="https://tailwindui.com/img/component-images/inbox-app-screenshot-2.jpg" alt="Customer profile user interface">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      `,
      thumbnail: "/assets/blocks/feature-with-screenshots.jpg",
    },
  ],

  // CTA Sections
  cta: [
    {
      id: "cta-centered",
      label: "Centered CTA",
      category: "CTA",
      premium: true,
      description: "Call to action with centered text",
      content: `
        <section class="bg-indigo-700 py-16 px-6">
          <div class="max-w-4xl mx-auto text-center">
            <h2 class="text-3xl font-extrabold text-white sm:text-4xl">
              <span class="block">Ready to dive in?</span>
              <span class="block">Start your free trial today.</span>
            </h2>
            <p class="mt-4 text-lg leading-6 text-indigo-100">
              Join thousands of satisfied customers using our platform to build amazing websites.
            </p>
            <div class="mt-8 flex justify-center">
              <div class="inline-flex rounded-md shadow">
                <a href="#" class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50">
                  Get started
                </a>
              </div>
              <div class="ml-3 inline-flex">
                <a href="#" class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 bg-opacity-60 hover:bg-opacity-70">
                  Learn more
                </a>
              </div>
            </div>
          </div>
        </section>
      `,
      thumbnail: "/assets/blocks/cta-centered.jpg",
    },
  ],
}

export default blockLibrary

