import Navbar from "./components/edu/navbar";
import Footer from "./components/edu/footer";
import EducationApp from "./components/edu/education-app";

export default function Page() {
  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-4 py-10">
        <EducationApp />
      </main>
      <Footer />
    </>
  );
}
