import React from "react";
import { RiMenuAddLine } from "react-icons/ri";

const UI = ({ isplaying, SetIsplaying }) => {
  return (
    <div className="flex  flex-col h-[75%] w-screen justify-center items-center ">
      <div className="w-[90%]  h-[80%] flex flex-col  items-center mt-4">
        <div className="w-[200px] h-[200px] bg-amber-200  rounded-full ">
          <div className="w-[200px] h-[200px] bg-teal-400  rounded-full ml-7 mt-0 flex flex-col">
            <button
              onClick={() => {
                SetIsplaying(!isplaying);
              }}
            >
              <img
                className="w-[170px] h-[170px] rounded-full bg-slate-500"
                src="https://media.tenor.com/uP7Vrv4O_9EAAAAi/listening-to-music-%E3%83%95%E3%82%B8%E3%83%AD%E3%83%83%E3%82%AF.gif"
              ></img>
            </button>
          </div>
        </div>
        <div className="w-[400px] h-[400px] bg-slate-200 ">
          <div className=" h-[70px] flex space-x-[200px]  shadow-md hover:shadow-lg bg-slate-200py-2 rounded">
            <div className="text-xl  text-yellow-400">Walking The Wire</div>
            <div className="">
              <RiMenuAddLine className="mt-3 w-[30px] h-[27px]" />
            </div>
          </div>
          <div className="w-[270px] break-words h-[190px] text-justify bg-slate-200 rounded py-2 px-4 mt-3">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default UI;
