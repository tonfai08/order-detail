import Header from "@/components/Header";

const AboutPage = () => {
  return (
    <main className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-3xl font-bold text-blue-600">
          Welcome to the About Page
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          This is the about page of our website.
        </p>
      </div>
    </main>
  );
};

export default AboutPage;
