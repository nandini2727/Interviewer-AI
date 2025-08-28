import { useContext, useState } from "react";
import Header from "../components/Layouts/Header";
import Modal from 'react-modal';
import Login from "./Auth/Login"
import SignUp from "./Auth/Signup"
import { RxCross1 } from "react-icons/rx";
import { UserContext } from "../context/userContext";
import { Link } from "react-router-dom";
import HERO_IMG from "../assets/DashBoardPage.png"
import { BiSolidCustomize } from "react-icons/bi";
import { FcFaq, FcSearch, FcViewDetails } from "react-icons/fc";
import { RiQuestionAnswerFill } from "react-icons/ri";
import { BsGraphUpArrow } from "react-icons/bs";
import HERO_IMG_MOBILE from "../assets/dashboard_mobile.png"
import Footer from "../components/Layouts/Footer";

const LandingPage = () => {
  const {user} = useContext(UserContext)
  const [openAuthModal,setOpenAuthModal]=useState(false);
  const [currentPage,setCurrentPage]=useState("")

  const handleOpenAuthModal=(authModal,openAuth)=>{
    setCurrentPage(authModal)
    setOpenAuthModal(openAuth)
  }
  return (
    <>
      
      <Header openModal={handleOpenAuthModal} />
      <section className="py-16 md:py-32 bg-gray-50 dark:bg-gray-900 sm:pt-16">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="px-6 text-lg text-gray-600 dark:text-gray-300">
              Master every interview with precision and AI guidance
            </h1>
            <p className="mt-5 text-4xl font-bold leading-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
              Crack Every Interview with{" "}
              <span className="relative inline-flex sm:inline">
                <span className="bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] blur-lg filter opacity-30 absolute inset-0 w-full h-full"></span>
                <span className="relative">Precision</span>
              </span>
            </p>

            <div className="px-8 sm:flex sm:justify-center sm:space-x-5 mt-9">
              {user ? (
                <Link
                  to="/dashboard"
                  className="inline-flex items-center justify-center w-full px-8 py-3 text-lg font-bold 
                            text-white bg-gray-900 hover:bg-gray-700 
                            sm:w-auto rounded-xl 
                            dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-300"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <button
                  onClick={() => handleOpenAuthModal("signup", true)}
                  className="inline-flex items-center cursor-pointer justify-center w-full px-8 py-3 text-lg font-bold 
                            text-white bg-gray-900 hover:bg-gray-700 
                            sm:w-auto rounded-xl 
                            dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-300"
                >
                  Get Started
                </button>
              )}
            </div>

            <p className="mt-8 text-base text-gray-500 dark:text-gray-400">
              Start preparing smarter with AI — completely free.
            </p>
          </div>
        </div>
      </section>

      <section className="py-10 bg-white dark:bg-gray-800 sm:py-16 lg:py-20">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold leading-tight text-gray-900 dark:text-white sm:text-4xl xl:text-5xl font-pj">
              Make every step user-centric
            </h2>
            <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-300 sm:mt-8 font-pj">
              Get role-specific questions. Expand answers when you need them, dive
              deeper into concepts and organize everything your way.
            </p>
          </div>


        <div className="grid grid-cols-1 mt-18 text-center sm:mt-16 sm:grid-cols-2 sm:gap-x-12 gap-y-12 md:grid-cols-3 md:gap-0 ">
            <div className="md:p-8 lg:p-14">
                <FcFaq size={50} className="mx-auto"/>
                <h3 className="mt-12 text-xl font-bold  dark:text-gray-100 text-gray-900 font-pj">AI Q&A</h3>
                <p className="mt-5 text-base dark:text-gray-400 text-gray-600 font-pj" >Get AI-generated answers and explanations for any interview question.</p>
            </div>

            <div className="md:p-8 lg:p-14 md:border-l md:border-gray-200 dark:border-gray-700">
                 <FcViewDetails size={50} className="mx-auto"/>
                <h3 className="mt-12 text-xl font-bold dark:text-gray-100 text-gray-900 font-pj">Resume Review</h3>
                <p className="mt-5 text-base dark:text-gray-400 text-gray-600 font-pj">AI analyzes your resume and suggests improvements to stand out</p>
            </div>

            <div className="md:p-8 lg:p-14 md:border-l md:border-gray-200 dark:border-gray-700">
                <BiSolidCustomize  size={50} className="mx-auto text-blue-400"/>
                <h3 className="mt-12 text-xl font-bold dark:text-gray-100 text-gray-900 font-pj">Custom Question Sets </h3>
                <p className="mt-5 text-base dark:text-gray-400 text-gray-600 font-pj">Create personalized interview question lists for your target role.</p>
            </div>

            <div className="md:p-8 lg:p-14 md:border-t md:border-gray-200 dark:border-gray-700">
                <FcSearch  size={50} className="mx-auto " />
                <h3 className="mt-12 text-xl font-bold dark:text-gray-100 text-gray-900 font-pj">Job Role Insights </h3>
                <p className="mt-5 text-base dark:text-gray-400 text-gray-600 font-pj">Explore in-demand skills, responsibilities, and trends for specific roles.</p>
            </div>

            <div className="md:p-8 lg:p-14 md:border-l md:border-gray-200 dark:border-gray-700 md:border-t">
                <RiQuestionAnswerFill  size={50} className="mx-auto text-blue-400"  />
                <h3 className="mt-12 text-xl font-bold dark:text-gray-100 text-gray-900 font-pj">Answer Improvement</h3>
                <p className="mt-5 text-base dark:text-gray-400 text-gray-600 font-pj">AI suggests better phrasing and structure for your interview answers.</p>
            </div>

            <div className="md:p-8 lg:p-14 md:border-l md:border-gray-200 dark:border-gray-700 md:border-t">
                <BsGraphUpArrow size={50} className="mx-auto text-green-600"/>
                <h3 className="mt-12 text-xl font-bold dark:text-gray-100 text-gray-900 font-pj">Confidence Booster</h3>
                <p className="mt-5 text-base dark:text-gray-400 text-gray-600 font-pj">Practice sessions designed to improve clarity, tone, and delivery.</p>
            </div>
        </div>
    </div>
      </section>
      <Footer/>
    <Modal
      isOpen={openAuthModal}
      onRequestClose = {()=>{
        setOpenAuthModal(false);
      }}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.75)'
          
        },
        content:{
          position: 'absolute',
          top: '50%', 
          left: '50%',
          transform : "translate(-50%, -50%)",
          borderRadius:20,
           height:"fit-content",
           width:"fit-content",
          padding:0,
          border:"0px"
        }
         }}
          >
           <div className="relative">
            <RxCross1
              size={20}
              onClick={() => {
                setOpenAuthModal(false);
              }}
              className="absolute m-5 top-2 right-2 cursor-pointer dark:text-gray-200 dark:hover:text-white text-gray-700 hover:text-black"
            />
            {currentPage === 'login' && <Login setCurrentPage={setCurrentPage} />}
            {currentPage === 'signup' && <SignUp setCurrentPage={setCurrentPage} />}
          </div>
          </Modal>

    </>
  )
}

export default LandingPage
