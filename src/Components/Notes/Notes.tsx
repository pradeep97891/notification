import React, { useState, useEffect } from "react";
import "./Notes.scss";
import { ClockTime, SearchIcon, XIcon } from "../../Components/Icon/Icon";
import {
  useLazyGetContactListQuery,
  useLazyGetMailerQuery,
} from "../../Service/Notes/Notes";
import {baseUrl, getMethodAfterLogin} from '../../properties'


 const Notes=(props: any)=> {
  const [showModal, setShowModal] = useState(false);
  const [sendValue, setsendValue] = useState("all");
  const [searchValue, setsearchValue] = useState([""]);
  const [msgList, setmsgList] = useState([] as any);
  const [message, setMessage] = useState("");
  const [listService, listData] = useLazyGetContactListQuery();

  const [groupList, setgroupList] = useState([
    { name: "Super admin", id: 1 },
    { name: "Field sales", id: 2 },
    { name: "Group sales", id: 3 },
    { name: "Group desk", id: 4 },
    { name: "Finance user", id: 5 },
    { name: "RM Group anlayst", id: 6 },
  ]);
  const [userList, setuserList] = useState([
    { name: "Pradeep", user_id: 1 },
    { name: "Karthick", user_id: 2 },
    { name: "Vignesh", user_id: 3 },
    { name: "Ashwin", user_id: 4 },
    { name: "Logesh", user_id: 5 },
    { name: "Bothraj", user_id: 6 },
  ]);

  useEffect(() => {
    getMethodAfterLogin(`${baseUrl}/contact/?project=1`).then(res=>{
      if(res && res.status){
          console.log(res)
      }
  })
   

  }, []);
  useEffect(() => {
    if (props) {
      setShowModal(props.show);
    }
  }, [props]);

  const handleChange = () => {
    // Here, we invoke the callback with the new value
    props.onChange(!showModal);
  };

  const handleInput = (e: { target: { value: any } }, type: string) => {
    if (type === "search") {
      setsearchValue(e.target.value);
    } else {
      setMessage(e.target.value);
    }
  };

  const handleSend = (e: { target: { value: any } }) => {
    setsendValue(e.target.value);
  };

  const addMsg = () => {
    setMessage("");
    setmsgList([]);
    let messageList = [
      {
        name: "",
        message: message,
      },
    ];
    setmsgList(messageList);
  };

  const onIconClick = () => {
    const input = document.getElementById("file-input");

    if (input) {
      input.click();
    }
  };


  return (
    <div className="App">
      {showModal ? (
        <>
          <div className="block w-full md:w-full justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="bg-blue-800 flex items-start justify-between p-4 border-b border-solid border-slate-200 rounded-t">
                  <h3 className=" text-white	text-2xl ">Notes</h3>
                  {/* <div className="p-1 ml-auto text-white  border-0 float-right text-3xl leading-none outline-none focus:outline-none">|</div> */}
                  <div className="float-right">
                    <span
                      className="inline-block cursor-pointer mt-2"
                      style={{
                        position: "absolute",
                        top: "20px",
                        right: "60px",
                      }}
                    >
                      <SearchIcon />
                    </span>
                    <span className="text-white font-thin text-lg">|</span>
                    <button
                      className="p-1 ml-auto  border-0  text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={handleChange}
                    >
                      <span className=" text-white  h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                </div>

                {msgList.length === 0 ? (
                  <div className="mt-4 mb-4">
                    <h2 className="text-center text-slate-500 text-lg">
                      Start a new conversation
                    </h2>
                  </div>
                ) : (
                  msgList?.map((item: any) => (
                    <div
                      className="w-full p-4 shadow-md lg:max-w-lg m-4  ml-auto rounded-sm  shadow-lg shadow-indigo-500/50 ..."
                      style={{ backgroundColor: "#9BACE0" }}
                    >
                      <div className="space-y-2 ">
                        <div className="grid grid-cols-2">
                          <div className="col-span-1 ...">
                            <h3 className=" text-1xl font-semibold text-blue-900">
                              Balaji Selvaraj, Super Admin
                            </h3>
                          </div>

                          <div className="... ml-auto ">
                            <span
                              className="inline-block "
                              style={{
                                position: "relative",
                                top: "3px",
                              }}
                            >
                              <ClockTime />{" "}
                            </span>
                            <p className="text-blue-900 text-sm inline-block ml-1">
                              30-Jan-2023 10:59
                            </p>
                          </div>
                        </div>
                        <p className="text-black-600">{item.message}</p>
                      </div>
                    </div>
                  ))
                )}

                <div
                  className="mr-6 ml-6 pt-1 pb-1"
                  style={{ backgroundColor: "#236597" }}
                >
                  <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-6 gap-4 md:gap-1">
                    <div className="ml-8 text-white pt-2 pb-2 text-sm">
                      Send to
                    </div>
                    <div className="relative w-full lg:max-w-sm mt-1">
                      <select
                        value={sendValue}
                        className="w-4/4 pt-0.5 pb-0.5 pr-4 pl-4 text-black-500 cursor-pointer bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
                        onChange={handleSend}
                      >
                        <option value="all">All</option>
                        <option value="group">Group</option>
                        <option value="users">Users</option>
                      </select>
                    </div>
                    {sendValue !== "all" ? (
                      <div className=" text-white  text-sm">
                        <input
                          className="shadow appearance-none border rounded w-full mt-1 py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="username"
                          type="text"
                          placeholder="Search"
                          value={searchValue}
                          onChange={(e) => {
                            handleInput(e, "search");
                          }}
                        />
                        {/* {userList
                              .filter((item) => {
                                if (!searchValue) return true;
                                if (
                                  item.name.includes(searchValue as any) 
                                ) {
                                  return true;
                                }
                              })
                              .map((item) => (
                                <ul>
                                 {item.name}
                                </ul>
                              ))} */}
                        {/* <ul>{list}</ul> */}
                      </div>
                    ) : null}
                  </div>
                  {sendValue === "group" ? (
                    <div>
                      <div className="mt-4 mx-8">
                        <hr />
                      </div>
                      <div className="px-8 py-6 grid grid-cols-3 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-3">
                        {groupList?.map((item: any) => (
                          <div className="flex items-center py-2 px-2 border border-gray-200 rounded dark:border-gray-700">
                            <input
                              id="bordered-checkbox-1"
                              type="checkbox"
                              value=""
                              name="bordered-checkbox"
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />

                            <label
                              htmlFor="bordered-checkbox-1"
                              className="w-full  ml-2 text-sm font-medium text-white"
                            >
                              {item.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                  {sendValue === "users" ? (
                    <div>
                      <div className="mt-4 mx-8">
                        <hr />
                      </div>
                      <div className="px-8 py-6 grid grid-cols-3 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-3">
                        {userList?.map((item: any) => (
                          <div className="flex items-center py-2 px-2 border border-gray-200 rounded dark:border-gray-700">
                            <label
                              htmlFor="bordered-checkbox-1"
                              className="w-full  ml-2 text-sm font-medium text-white"
                            >
                              {item.name}
                            </label>
                            <div className="ml-auto text-1xl font-semibold cursor-pointer">
                              <XIcon />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>

                <form className="mt-4 ">
                  <label htmlFor="chat" className="sr-only">
                    Your message
                  </label>
                  <div className="flex items-center  py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
                    <textarea
                      id="chat"
                      className="block mx-6 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Type your text here..."
                      value={message}
                      onChange={(e) => {
                        handleInput(e, "textarea");
                      }}
                    ></textarea>
                    <button
                      type="button"
                      className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                      onClick={onIconClick}
                    >
                      <svg
                        aria-hidden="true"
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <input
                        type="file"
                        id="file-input"
                        style={{ display: "none" }}
                      />
                      <span className="sr-only">Upload image</span>
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
                      onClick={addMsg}
                    >
                      <svg
                        aria-hidden="true"
                        className="w-6 h-6 rotate-90"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                      </svg>
                      <span className="sr-only">Send message</span>
                    </button>
                  </div>
                  <div className="text-right p-3 text-xs text-slate-400">
                    Upload file formats are PDF,PNG,XLS,XLSX,JPEG,EML Max file
                    size to upload 2 MB
                  </div>
                </form>

                {/* <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleChange}
                  >
                    Close
                  </button>
                </div> */}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
}

export default Notes;