import Layout from '../components/layout/Layout';

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="bg-blue-700 text-white rounded-lg mb-12 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h1 className="text-4xl font-bold mb-4">About Jurchen Technology</h1>
              <p className="text-lg mb-6">
                Leading the way in solar energy solutions for a sustainable future.
              </p>
            </div>
            <div className="h-64 md:h-auto">
              <img 
                src="/images/about-hero.jpg" 
                alt="Solar panels installation" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80';
                }}
              />
            </div>
          </div>
        </div>

        {/* Our Story */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-gray-700 mb-4">
            Jurchen Technology was founded in 2008 by Michael Jurchen whose first products were clips for PV modules and DC cable harnesses. Jurchen Technology has developed into a major global player in the solar industry.
            </p>
            <p className="text-gray-700 mb-4">
            To create added value for customers in the future, Jurchen Technology has its own development department, which continuously develops existing products and brings innovative solutions to market.
            </p>
            <p className="text-gray-700">
            Jurchen Technology is the only manufacturer on the market to offer solar mounting systems and DC cabling from one source. Active globally, Jurchen offers its customers know-how from the start of the project development to the acceptance of solar construction work. Jurchen has technical know-how supplied to over 500 solar projects in 6 continents, with over 3.6 GW of substructure and 4.2 GW of DC cabling.
            </p>
          </div>
        </section>

        {/* Our Mission & Vision */}
        <section className="mb-16 bg-gray-50 p-8 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-gray-700">
                To accelerate the world's transition to sustainable energy through innovative solar products that are reliable, efficient, and accessible to all. We strive to make clean energy solutions a reality for homes and businesses while reducing carbon footprints.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
              <p className="text-gray-700">
                A world powered by renewable energy, where every home and business can harness the power of the sun. We envision a future where our solar solutions contribute significantly to reducing global carbon emissions and fostering a healthier planet.
              </p>
            </div>
          </div>
        </section>

        {/* Our Achievements */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                number: '10+',
                text: 'Years of Experience',
                description: 'A decade of excellence in solar solutions'
              },
              {
                number: '500+',
                text: 'Projects Completed',
                description: 'Across residential and commercial sectors'
              },
              {
                number: '50+',
                text: 'Solar Products',
                description: 'Innovative solutions for diverse needs'
              },
              {
                number: '100K+',
                text: 'Happy Customers',
                description: 'Satisfied clients across the country'
              }
            ].map((achievement, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg text-center">
                <span className="text-4xl font-bold text-blue-700 block mb-2">{achievement.number}</span>
                <h3 className="text-xl font-semibold mb-2">{achievement.text}</h3>
                <p className="text-gray-600">{achievement.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Our Values */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow border-t-4 border-blue-500">
              <h3 className="text-xl font-semibold mb-3">Innovation</h3>
              <p className="text-gray-700">
                We constantly push the boundaries of solar technology to develop more efficient, durable, and user-friendly products.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow border-t-4 border-green-500">
              <h3 className="text-xl font-semibold mb-3">Sustainability</h3>
              <p className="text-gray-700">
                Our commitment to the environment is at the heart of everything we do, from product design to packaging and operations.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow border-t-4 border-yellow-500">
              <h3 className="text-xl font-semibold mb-3">Quality</h3>
              <p className="text-gray-700">
                We never compromise on the quality of our products, ensuring reliability and longevity for all our solar solutions.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow border-t-4 border-red-500">
              <h3 className="text-xl font-semibold mb-3">Customer-First</h3>
              <p className="text-gray-700">
                Our customers' needs drive our decisions, from product development to after-sales support and service.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow border-t-4 border-purple-500">
              <h3 className="text-xl font-semibold mb-3">Integrity</h3>
              <p className="text-gray-700">
                We operate with honesty and transparency, building trust with our customers, partners, and employees.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow border-t-4 border-indigo-500">
              <h3 className="text-xl font-semibold mb-3">Accessibility</h3>
              <p className="text-gray-700">
                We strive to make solar energy solutions accessible to everyone, regardless of scale or budget.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-700 text-white p-8 rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-4">Join Us in Creating a Sustainable Future</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Discover how our solar products can help you reduce your carbon footprint while saving on energy costs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="/products" 
              className="px-6 py-3 bg-white text-blue-700 rounded-md hover:bg-gray-100 transition font-medium"
            >
              Explore Our Products
            </a>
            <a 
              href="/contact" 
              className="px-6 py-3 border-2 border-white text-white rounded-md hover:bg-blue-800 transition font-medium"
            >
              Contact Us
            </a>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default About; 