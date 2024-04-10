import React, { useState } from "react";
import Modal from "react-modal";
import { useSpring, animated } from "react-spring";

const ContactUs = () => {
  const [message, setMessage] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);

  const modalAnimation = useSpring({
    opacity: modalIsOpen ? 1 : 0,
    transform: modalIsOpen ? "translateY(0%)" : "translateY(-100%)",
  });

  const openModal = (profile) => {
    setSelectedProfile(profile);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedProfile(null);
    setModalIsOpen(false);
  };

  const handleSubmit = () => {
    console.log("Message submitted:", message);
    // Additional logic goes here...
    // Close the modal after handling the submission
    closeModal();
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
  };

  const buttonStyle = {
    backgroundColor: "#252525",
    color: "white",
    padding: "6px 0",
    width: "100px",
    borderRadius: "40px",
    cursor: "pointer",
    marginTop: "5px",
    fontSize: "12px",
  };

  const icons = {
    Github: (
      <img
        width="24"
        height="24"
        src="https://img.icons8.com/ios-glyphs/30/github.png"
        alt="github"
      />
    ),
    Facebook: (
      <img
        width="24"
        height="24"
        src="https://img.icons8.com/ios-glyphs/30/facebook-new.png"
        alt="facebook-new"
      />
    ),
    LinkedIn: (
      <img
        width="24"
        height="24"
        src="https://img.icons8.com/ios-filled/50/linkedin.png"
        alt="linkedin"
      />
    ),
    Twitter: (
      <img
        width="24"
        height="24"
        src="https://img.icons8.com/ios-filled/50/twitterx--v1.png"
        alt="twitterx--v1"
      />
    ),
  };

  const description = {
    Github:
      "Explore our projects and contributions on GitHub, where we spaghetti codes.",
    Facebook:
      "Stay connected and feel free to drop us a direct message for a quick chat or inquiries.",
    Twitter:
      "Follow us on Twitter for real-time thoughts, insights, and engaging discussions.",
    LinkedIn:
      "Discover our professional achievements and network with us on LinkedIn.",
  };

  const mockProfiles = [
    {
      name: "Ashley Pontay",
      image: "images/profiles/ashley.jpg",
      credentials: "Single ❤️",
      currentWork: "Nurse (Hanap)",
      history: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      contacts: [
        {
          type: "Github",
          link: "https://github.com/sirpontay?fbclid=IwAR2J7kziCdn_TrGI9Uc4m4fG4lr-37SaT4OcAMdTB-3HjUX_VqC9xNm-EXM",
        },
        { type: "LinkedIn", link: "https://www.linkedin.com/in/sirpontay/" },
        {
          type: "Twitter",
          link: "https://twitter.com/sirpontay?fbclid=IwAR2rhWqxecu23hzMRcnj-nVd6B4ajr3kjBuIcqwkifKXotHHzXSnGn8v9rA",
        },
        // Add more contacts as needed
      ],
    },
    {
      name: "Manuel Marin",
      image: "images/profiles/manuel.jpg",
      credentials: "BSCS-NS-3AB",
      currentWork: "MotoVlogger",
      history: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      contacts: [
        { type: "Github", link: "https://mnuel1.github.io/portfolio/" },
        { type: "Facebook", link: "https://m.me/ManuelMarine" },
        // Add more contacts as needed
      ],
    },
    {
      name: "Mark Nelson Mamerto",
      image: "images/profiles/mark.jpg",
      credentials: "BSCS-NS-3AB",
      currentWork: "Palamunin",
      history: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      contacts: [
        { type: "Github", link: "https://github.com/finnsatoshi03" },
        { type: "Facebook", link: "https://m.me/FabulousEggPie/" },
      ],
    },
    {
      name: "Ezekiel Billona",
      image: "images/profiles/ezekiel.jpg",
      credentials: "BSCS-NS-3AB",
      currentWork: "Crumperist",
      history: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      contacts: [
        {
          type: "Facebook",
          link: "https://m.me/e.billona?mibextid=LQQJ4d",
        },
        { type: "Github", link: "https://github.com/Ezekiele2" },
        // Add more contacts as needed
      ],
    },
    {
      name: "Jerry boy Tejada",
      image: "images/profiles/jerry.jpg",
      credentials: "BSCS-NS-3AB",
      currentWork: "Self Employed 😉",
      history: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      contacts: [
        { type: "Github", link: "https://github.com/jeeybii" },
        {
          type: "LinkedIn",
          link: "https://www.linkedin.com/in/jerry-boy-tejada-87a421283?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        },
        { type: "Facebook", link: "https://m.me/JerryboyTejada" },
        // Add more contacts as needed
      ],
    },
    // Add more profiles with unique contacts
  ];
  const images = [
    "background-2.jpg",
    "background-3.jpg",
    "background-1.jpg",
    "background-4.jpg",
    "background-5.jpg",
  ];

  return (
    <section className=" bg-black text-white200">
      <div style={containerStyle} className="container sm:m-auto mt-10">
        <div className="my-10 flex justify-between w-full">
          <div className="w-full uppercase">
            <div className="flex items-end justify-between">
              <div className="flex items-end lg:gap-10 sm:gap-5 gap-7">
                <h1 className="font-serif xl:text-[10rem] lg:text-[7rem] sm:text-[4rem] text-[3.5rem] xl:leading-[7rem] lg:leading-[5rem] sm:leading-[3rem] leading-[2.5rem]">
                  Let's
                </h1>
                <img
                  className="lg:w-32 sm:w-24 w-16"
                  src="images/cat.png"
                  alt="Cat"
                />
              </div>
              <p className="font-black uppercase tracking-[3px] xl:text-[9.5rem] lg:text-[7rem] sm:text-[4rem] text-[3.5rem] xl:leading-[8rem] lg:leading-[5rem] sm:leading-[3rem] leading-[2.5rem] lg:ml-28">
                Team
              </p>
            </div>
            <div className="flex items-end justify-between">
              <h1 className="font-serif xl:text-[10rem] lg:text-[7rem] sm:text-[4rem] text-[3.5rem] xl:leading-[8rem] lg:leading-[5rem] sm:leading-[3rem] leading-[2.5rem] lg:ml-28 sm:ml-20 ml-16 whitespace-nowrap">
                Get In
              </h1>
              <p className="font-black uppercase tracking-[3px] xl:text-[9.5rem] lg:text-[7rem] sm:text-[4rem] text-[3.5rem] xl:leading-[8rem] lg:leading-[5rem] sm:leading-[3rem] leading-[2.5rem] lg:ml-28">
                Zah
              </p>
            </div>
            <div className="flex justify-between">
              <h1 className="font-serif xl:text-[10rem] lg:text-[7rem] sm:text-[4rem] text-[3.5rem]  xl:leading-[8rem] lg:leading-[5rem] sm:leading-[3rem] leading-[2.5rem]">
                Touch
              </h1>
              <div className="grid xl:grid-cols-2 grid-rows-2 w-2/6 gap-4 lowercase">
                <p className="xl:text-xs lg:text-[10px] text-[8px] text-right">
                  Reach out to us! Whether you're looking for information, want
                  to explore collaboration opportunities, or just fancy a chat,
                  our virtual doors are wide open for you. Connect with us, and
                  let's create something incredible together!
                </p>
                <p className="xl:text-xs lg:text-[10px] text-[8px] text-right">
                  Learn more about the minds behind our projects and discover
                  the unique expertise each developer contributes to our
                  collective success.
                </p>
              </div>
            </div>
          </div>
        </div>
        {mockProfiles.map((profile, index) => (
          <div key={index}>
            <div className="w-full h-[24rem] rounded-3xl relative mt-10 bg-white200 text-black">
              <div className="">
                <img
                  src={`images/${images[index % images.length]}`}
                  className="w-full h-28 bg-green absolute rounded-t-3xl object-cover"
                />
                <div className="z-10 absolute">
                  <div className="w-[120px] h-[120px] bg-white200 rounded-full top-12 left-10 absolute  border-opacity-50 border-4 border-white200">
                    <img
                      src={profile.image}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>
                <div className="z-10 flex justify-between w-full absolute top-[7.7rem] pr-5 items-center">
                  <div className="relative left-[11rem]">
                    <h1 className="text-black font-bold text-xl leading-5 sm:w-full w-5/6">
                      {profile.name}
                    </h1>
                    <p className="text-sm opacity-60 ">{profile.credentials}</p>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1 justify-end">
                      <h2 className="text-xs opacity-60">Current Role</h2>
                      <img
                        width="15"
                        height="15"
                        src="https://img.icons8.com/material-outlined/24/lawyer.png"
                        alt="lawyer"
                      />
                    </div>
                    <p className="text-xs font-semibold px-2 py-1 mt-1 rounded-full bg-black bg-opacity-20">
                      {profile.currentWork}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 w-full h-full absolute left-10 top-[14rem]">
                  {profile.contacts.map((contact, index) => (
                    <div
                      key={index}
                      className="h-1/3 w-1/4 bg-green bg-opacity-20 rounded-xl py-3 px-5"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <div>{icons[contact.type]}</div>
                          <h1 className="text-md font-semibold">
                            {contact.type}
                          </h1>
                        </div>
                        <div className="flex lg:justify-between justify-center items-center">
                          <p className="text-xs w-2/3 hidden lg:block">
                            {description[contact.type]}
                          </p>
                          <img
                            className="lg:w-8 lg:h-8 w-12 h-12 hover:cursor-pointer"
                            src="https://img.icons8.com/ios/50/circled-chevron-right--v1.png"
                            alt="circled-chevron-right--v1"
                            onClick={() => window.open(contact.link, "_blank")}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ContactUs;
