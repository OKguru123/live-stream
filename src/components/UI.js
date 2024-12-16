import React from "react";
import { RiMenuAddLine } from "react-icons/ri";

const UI = () => {
  return (
    <div className="flex  flex-col h-[75%] w-screen justify-center items-center ">
      <div className="w-[90%]  h-[80%] flex flex-col  items-center mt-4">
        <div className="w-[200px] h-[200px] bg-amber-200  rounded-full ">
          <div className="w-[200px] h-[200px] bg-teal-400  rounded-full ml-7 mt-0 flex flex-col">
            <img
              className="w-[170px] h-[170px] rounded-full "
              src="https://media.istockphoto.com/id/1362706206/photo/contemporary-art-collage-retro-style-young-man-fashionable-hipster-playing-guitar-isolated.jpg?s=1024x1024&w=is&k=20&c=iFKoFMTUVpfqXiiJ75IWtkd3ysNVDwEtl3BSEiicibw="
            ></img>
          </div>
        </div>
        <div className="w-[400px] h-[400px] bg-white ">
          <div className=" h-[70px] flex space-x-[200px]  shadow-md hover:shadow-lg bg-white py-2 rounded">
            <div className="text-xl  text-yellow-400">Music Lover !</div>
            <div className="">
              <RiMenuAddLine className="mt-3 w-[30px] h-[27px]" />
            </div>
          </div>
          <div className="w-[270px] break-words h-[190px] text-justify bg-white rounded py-2 px-4 mt-3">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            .{" "}
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default UI;
