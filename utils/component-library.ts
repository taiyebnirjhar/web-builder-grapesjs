import type { ComponentTemplate, ComponentCategory } from "../types/editor"

// Define component categories
export const componentCategories: ComponentCategory[] = [
  { id: "hero", label: "Hero Sections" },
  { id: "navigation", label: "Navigation" },
  { id: "features", label: "Features" },
  { id: "testimonials", label: "Testimonials" },
  { id: "pricing", label: "Pricing" },
  { id: "cta", label: "Call to Action" },
  { id: "forms", label: "Forms" },
  { id: "footer", label: "Footer" },
  { id: "ecommerce", label: "E-Commerce" },
  { id: "blog", label: "Blog" },
  { id: "portfolio", label: "Portfolio" },
  { id: "team", label: "Team" },
  { id: "stats", label: "Statistics" },
  { id: "faq", label: "FAQ" },
  { id: "gallery", label: "Gallery" },
  { id: "contact", label: "Contact" },
  { id: "cards", label: "Cards" },
  { id: "sections", label: "Sections" },
  { id: "layouts", label: "Layouts" },
]

// Create component templates
export const componentTemplates: ComponentTemplate[] = [
  // Hero Sections
  {
    id: "hero-centered",
    label: "Centered Hero",
    category: "hero",
    content: `
      <section class="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-20">
        <div class="container mx-auto px-4 text-center">
          <h1 class="text-5xl font-bold mb-6">Build Beautiful Websites</h1>
          <p class="text-xl mb-10 max-w-3xl mx-auto">Create stunning, responsive websites with our premium drag-and-drop builder. No coding required.</p>
          <div class="flex justify-center gap-4">
            <button class="bg-white text-purple-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition">Get Started</button>
            <button class="border border-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition">Learn More</button>
          </div>
        </div>
      </section>
    `,
    thumbnail: "/placeholder.svg?height=100&width=200",
  },
  {
    id: "hero-split",
    label: "Split Hero",
    category: "hero",
    content: `
      <section class="bg-white py-20">
        <div class="container mx-auto px-4">
          <div class="flex flex-col md:flex-row items-center">
            <div class="md:w-1/2 mb-10 md:mb-0 md:pr-10">
              <h1 class="text-4xl font-bold mb-6 text-gray-900">Transform Your Online Presence</h1>
              <p class="text-lg mb-8 text-gray-600">Our premium website builder gives you the tools to create professional websites that convert visitors into customers.</p>
              <div class="flex gap-4">
                <button class="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition">Start Building</button>
                <button class="border border-gray-300 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition">Watch Demo</button>
              </div>
            </div>
            <div class="md:w-1/2">
              <img src="/placeholder.svg?height=400&width=600" alt="Website Builder" class="rounded-lg shadow-xl" />
            </div>
          </div>
        </div>
      </section>
    `,
    thumbnail: "/placeholder.svg?height=100&width=200",
  },

  // Navigation
  {
    id: "nav-simple",
    label: "Simple Navbar",
    category: "navigation",
    content: `
      <nav class="bg-white shadow-sm py-4">
        <div class="container mx-auto px-4">
          <div class="flex justify-between items-center">
            <div class="flex items-center">
              <img src="/placeholder.svg?height=40&width=40" alt="Logo" class="h-10 w-auto mr-4" />
              <span class="text-xl font-bold text-gray-900">WebBuilder</span>
            </div>
            <div class="hidden md:flex items-center space-x-8">
              <a href="#" class="text-gray-600 hover:text-purple-600 transition">Home</a>
              <a href="#" class="text-gray-600 hover:text-purple-600 transition">Features</a>
              <a href="#" class="text-gray-600 hover:text-purple-600 transition">Pricing</a>
              <a href="#" class="text-gray-600 hover:text-purple-600 transition">About</a>
              <a href="#" class="text-gray-600 hover:text-purple-600 transition">Contact</a>
            </div>
            <div class="hidden md:flex items-center space-x-4">
              <a href="#" class="text-gray-600 hover:text-purple-600 transition">Login</a>
              <a href="#" class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">Sign Up</a>
            </div>
            <button class="md:hidden text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    `,
    thumbnail: "/placeholder.svg?height=100&width=200",
  },
  {
    id: "nav-transparent",
    label: "Transparent Navbar",
    category: "navigation",
    content: `
      <nav class="absolute top-0 left-0 right-0 z-10 py-6">
        <div class="container mx-auto px-4">
          <div class="flex justify-between items-center">
            <div class="flex items-center">
              <img src="/placeholder.svg?height=40&width=40" alt="Logo" class="h-10 w-auto mr-4" />
              <span class="text-xl font-bold text-white">WebBuilder</span>
            </div>
            <div class="hidden md:flex items-center space-x-8">
              <a href="#" class="text-white hover:text-purple-200 transition">Home</a>
              <a href="#" class="text-white hover:text-purple-200 transition">Features</a>
              <a href="#" class="text-white hover:text-purple-200 transition">Pricing</a>
              <a href="#" class="text-white hover:text-purple-200 transition">About</a>
              <a href="#" class="text-white hover:text-purple-200 transition">Contact</a>
            </div>
            <div class="hidden md:flex items-center space-x-4">
              <a href="#" class="text-white hover:text-purple-200 transition">Login</a>
              <a href="#" class="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition">Sign Up</a>
            </div>
            <button class="md:hidden text-white">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    `,
    thumbnail: "/placeholder.svg?height=100&width=200",
  },

  // Features
  {
    id: "features-grid",
    label: "Features Grid",
    category: "features",
    content: `
      <section class="py-20 bg-gray-50">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-3xl font-bold mb-4 text-gray-900">Powerful Features</h2>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto">Everything you need to build stunning websites that impress your visitors and drive conversions.</p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div class="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
              <div class="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 class="text-xl font-bold mb-3 text-gray-900">Drag & Drop Editor</h3>
              <p class="text-gray-600">Build your website visually with our intuitive drag and drop interface. No coding required.</p>
            </div>
            <div class="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
              <div class="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 class="text-xl font-bold mb-3 text-gray-900">Responsive Design</h3>
              <p class="text-gray-600">All websites are fully responsive and look great on any device, from desktop to mobile.</p>
            </div>
            <div class="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
              <div class="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 class="text-xl font-bold mb-3 text-gray-900">Performance Optimized</h3>
              <p class="text-gray-600">Lightning-fast websites that load quickly and provide a smooth user experience.</p>
            </div>
            <div class="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
              <div class="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
              <h3 class="text-xl font-bold mb-3 text-gray-900">Premium Templates</h3>
              <p class="text-gray-600">Start with professionally designed templates that you can customize to fit your brand.</p>
            </div>
            <div class="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
              <div class="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                </svg>
              </div>
              <h3 class="text-xl font-bold mb-3 text-gray-900">SEO Friendly</h3>
              <p class="text-gray-600">Built-in SEO tools to help your website rank higher in search engine results.</p>
            </div>
            <div class="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
              <div class="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 class="text-xl font-bold mb-3 text-gray-900">Secure & Reliable</h3>
              <p class="text-gray-600">Enterprise-grade security and reliability to keep your website safe and online.</p>
            </div>
          </div>
        </div>
      </section>
    `,
    thumbnail: "/placeholder.svg?height=100&width=200",
  },

  // Testimonials
  {
    id: "testimonials-carousel",
    label: "Testimonials Carousel",
    category: "testimonials",
    content: `
      <section class="py-20 bg-white">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-3xl font-bold mb-4 text-gray-900">What Our Customers Say</h2>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto">Thousands of businesses trust our platform to build their online presence.</p>
          </div>
          <div class="max-w-5xl mx-auto">
            <div class="bg-gray-50 p-10 rounded-2xl shadow-sm">
              <div class="flex flex-col md:flex-row items-center">
                <div class="md:w-1/3 mb-6 md:mb-0 md:pr-10">
                  <img src="/placeholder.svg?height=150&width=150" alt="Customer" class="w-32 h-32 rounded-full mx-auto" />
                </div>
                <div class="md:w-2/3">
                  <svg class="h-10 w-10 text-purple-600 mb-4" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                  <p class="text-xl mb-6 text-gray-600">WebBuilder has completely transformed our online presence. The drag-and-drop interface made it easy to create a stunning website that perfectly represents our brand. The customer support team has been exceptional throughout the process.</p>
                  <div>
                    <h4 class="text-lg font-bold text-gray-900">Sarah Johnson</h4>
                    <p class="text-gray-600">CEO, TechStart Inc.</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex justify-center mt-8">
              <button class="w-3 h-3 rounded-full bg-purple-600 mx-1"></button>
              <button class="w-3 h-3 rounded-full bg-gray-300 mx-1"></button>
              <button class="w-3 h-3 rounded-full bg-gray-300 mx-1"></button>
            </div>
          </div>
        </div>
      </section>
    `,
    thumbnail: "/placeholder.svg?height=100&width=200",
  },

  // Pricing
  {
    id: "pricing-cards",
    label: "Pricing Cards",
    category: "pricing",
    content: `
      <section class="py-20 bg-gray-50">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-3xl font-bold mb-4 text-gray-900">Simple, Transparent Pricing</h2>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto">Choose the plan that's right for your business. All plans include a 14-day free trial.</p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div class="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition">
              <div class="p-8">
                <h3 class="text-xl font-bold mb-4 text-gray-900">Starter</h3>
                <div class="flex items-baseline mb-6">
                  <span class="text-4xl font-bold text-gray-900">$29</span>
                  <span class="text-gray-600 ml-2">/month</span>
                </div>
                <p class="text-gray-600 mb-6">Perfect for small businesses and freelancers just getting started.</p>
                <ul class="space-y-3 mb-8">
                  <li class="flex items-center text-gray-600">
                    <svg class="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>1 Website</span>
                  </li>
                  <li class="flex items-center text-gray-600">
                    <svg class="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>5GB Storage</span>
                  </li>
                  <li class="flex items-center text-gray-600">
                    <svg class="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>10,000 Monthly Visitors</span>
                  </li>
                  <li class="flex items-center text-gray-600">
                    <svg class="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Basic Support</span>
                  </li>
                </ul>
                <button class="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition">Get Started</button>
              </div>
            </div>
            <div class="bg-white rounded-xl shadow-lg overflow-hidden transform scale-105 z-10 border-2 border-purple-600">
              <div class="bg-purple-600 text-white py-2 text-center font-medium">
                Most Popular
              </div>
              <div class="p-8">
                <h3 class="text-xl font-bold mb-4 text-gray-900">Professional</h3>
                <div class="flex items-baseline mb-6">
                  <span class="text-4xl font-bold text-gray-900">$79</span>
                  <span class="text-gray-600 ml-2">/month</span>
                </div>
                <p class="text-gray-600 mb-6">Ideal for growing businesses that need more features and resources.</p>
                <ul class="space-y-3 mb-8">
                  <li class="flex items-center text-gray-600">
                    <svg class="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>5 Websites</span>
                  </li>
                  <li class="flex items-center text-gray-600">
                    <svg class="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>20GB Storage</span>
                  </li>
                  <li class="flex items-center text-gray-600">
                    <svg class="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>50,000 Monthly Visitors</span>
                  </li>
                  <li class="flex items-center text-gray-600">
                    <svg class="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Priority Support</span>
                  </li>
                  <li class="flex items-center text-gray-600">
                    <svg class="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Advanced Analytics</span>
                  </li>
                </ul>
                <button class="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition">Get Started</button>
              </div>
            </div>
            <div class="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition">
              <div class="p-8">
                <h3 class="text-xl font-bold mb-4 text-gray-900">Enterprise</h3>
                <div class="flex items-baseline mb-6">
                  <span class="text-4xl font-bold text-gray-900">$199</span>
                  <span class="text-gray-600 ml-2">/month</span>
                </div>
                <p class="text-gray-600 mb-6">For large organizations that need maximum power and flexibility.</p>
                <ul class="space-y-3 mb-8">
                  <li class="flex items-center text-gray-600">
                    <svg class="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Unlimited Websites</span>
                  </li>
                  <li class="flex items-center text-gray-600">
                    <svg class="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>100GB Storage</span>
                  </li>
                  <li class="flex items-center text-gray-600">
                    <svg class="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Unlimited Monthly Visitors</span>
                  </li>
                  <li class="flex items-center text-gray-600">
                    <svg class="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>24/7 Premium Support</span>
                  </li>
                  <li class="flex items-center text-gray-600">
                    <svg class="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Custom Branding</span>
                  </li>
                </ul>
                <button class="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition">Contact Sales</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    `,
    thumbnail: "/placeholder.svg?height=100&width=200",
  },

  // Forms
  {
    id: "contact-form",
    label: "Contact Form",
    category: "forms",
    content: `
      <section class="py-20 bg-white">
        <div class="container mx-auto px-4">
          <div class="max-w-3xl mx-auto">
            <div class="text-center mb-12">
              <h2 class="text-3xl font-bold mb-4 text-gray-900">Get in Touch</h2>
              <p class="text-xl text-gray-600">Have questions? We're here to help. Fill out the form below and we'll get back to you as soon as possible.</p>
            </div>
            <form class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="first-name" class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input type="text" id="first-name" name="first-name" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500" />
                </div>
                <div>
                  <label for="last-name" class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input type="text" id="last-name" name="last-name" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500" />
                </div>
              </div>
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input type="email" id="email" name="email" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500" />
              </div>
              <div>
                <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input type="tel" id="phone" name="phone" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500" />
              </div>
              <div>
                <label for="subject" class="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input type="text" id="subject" name="subject" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500" />
              </div>
              <div>
                <label for="message" class="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea id="message" name="message" rows="5" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"></textarea>
              </div>
              <div class="flex items-center">
                <input id="privacy" name="privacy" type="checkbox" class="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded" />
                <label for="privacy" class="ml-2 block text-sm text-gray-700">
                  I agree to the <a href="#" class="text-purple-600 hover:text-purple-500">Privacy Policy</a>
                </label>
              </div>
              <div>
                <button type="submit" class="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-purple-700 transition">Send Message</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    `,
    thumbnail: "/placeholder.svg?height=100&width=200",
  },

  // Footer
  {
    id: "footer-columns",
    label: "Footer with Columns",
    category: "footer",
    content: `
      <footer class="bg-gray-900 text-white py-12">
        <div class="container mx-auto px-4">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            <div class="lg:col-span-2">
              <img src="/placeholder.svg?height=40&width=150" alt="Logo" class="h-10 w-auto mb-4" />
              <p class="text-gray-400 mb-4">Create stunning websites with our premium drag-and-drop builder. No coding required.</p>
              <div class="flex space-x-4">
                <a href="#" class="text-gray-400 hover:text-white transition">
                  <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" />
                  </svg>
                </a>
                <a href="#" class="text-gray-400 hover:text-white transition">
                  <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" class="text-gray-400 hover:text-white transition">
                  <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd" />
                  </svg>
                </a>
                <a href="#" class="text-gray-400 hover:text-white transition">
                  <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 class="text-lg font-semibold mb-4">Product</h3>
              <ul class="space-y-2">
                <li><a href="#" class="text-gray-400 hover:text-white transition">Features</a></li>
                <li><a href="#" class="text-gray-400 hover:text-white transition">Pricing</a></li>
                <li><a href="#" class="text-gray-400 hover:text-white transition">Templates</a></li>
                <li><a href="#" class="text-gray-400 hover:text-white transition">Integrations</a></li>
                <li><a href="#" class="text-gray-400 hover:text-white transition">Enterprise</a></li>
              </ul>
            </div>
            <div>
              <h3 class="text-lg font-semibold mb-4">Resources</h3>
              <ul class="space-y-2">
                <li><a href="#" class="text-gray-400 hover:text-white transition">Documentation</a></li>
                <li><a href="#" class="text-gray-400 hover:text-white transition">Tutorials</a></li>
                <li><a href="#" class="text-gray-400 hover:text-white transition">Blog</a></li>
                <li><a href="#" class="text-gray-400 hover:text-white transition">Support Center</a></li>
                <li><a href="#" class="text-gray-400 hover:text-white transition">Webinars</a></li>
              </ul>
            </div>
            <div>
              <h3 class="text-lg font-semibold mb-4">Company</h3>
              <ul class="space-y-2">
                <li><a href="#" class="text-gray-400 hover:text-white transition">About Us</a></li>
                <li><a href="#" class="text-gray-400 hover:text-white transition">Careers</a></li>
                <li><a href="#" class="text-gray-400 hover:text-white transition">Contact Us</a></li>
                <li><a href="#" class="text-gray-400 hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" class="text-gray-400 hover:text-white transition">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div class="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p class="text-gray-400 text-sm">© 2023 WebBuilder. All rights reserved.</p>
            <div class="mt-4 md:mt-0">
              <a href="#" class="text-gray-400 hover:text-white text-sm transition mr-4">Privacy Policy</a>
              <a href="#" class="text-gray-400 hover:text-white text-sm transition mr-4">Terms of Service</a>
              <a href="#" class="text-gray-400 hover:text-white text-sm transition">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    `,
    thumbnail: "/placeholder.svg?height=100&width=200",
  },
]

