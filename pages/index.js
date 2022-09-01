import Head from "next/head";
import { useState, useRef } from "react";
// import handler from './api/hello'
export default function Home(props) {
  const [url, setUrl] = useState([]);
  const [urls, setUrls] = useState([]);
  // const [array_submit, setArray_submit] = useState([])
  // delay Onchange
  // show list url
  let Array_url = [];
  Array_url = url.toString().split("\n");
  // console.log("url", url);
  // console.log('array',Array_url);
  let Array_url_submit = url.toString().split("\n");
  const handleSubmit = () => {
    // Array_url_submit = url.toString().split("\n");
    // console.log("array_submit", Array_url_submit);
    if (Array_url_submit.toString() != "") {
      setUrls((prev) => [...prev, ...Array_url_submit]);
      setUrl("");
    } else alert("Please Enter Url");
  };
  // console.log("urls", urls);
  const callAPI = () => {
    //window.location.host
    // console.log(Array_url);
    let string = "";
    let i = 0;
    if (url.toString() != "") {
      async function call(urls) {
        try {
          const res = await fetch(`http://${window.location.host}/api/hello`, {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(urls),
          });
          const { data } = await res.json();
          if (data) {
            i += 1;
            string += data;
            if (i == Array_url.length) {
              handleCheck(string);
              alert('CHECKED')
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
      for (let i = 0; i < Array_url.length; i++) {
        call(Array_url[i]);
      }
    } else alert("Please Enter Url");
  };

  // check text
  const [url_check, setUrl_check] = useState("");

  const check_true = () => {
    return document.getElementsByClassName("checkbox_true_hidden");
  };
  const check_false = () => {
    return document.getElementsByClassName("checkbox_false_hidden");
  };
  // const check_true = document.getElementsById('checkbox_true_hidden')
  const handleCheck = (data) => {
    // console.log(data);
    if (url_check.toString() !== "") {
      if (data.indexOf(url_check) !== -1) {
        console.log(data);
        let a = check_true();
        a[0].classList.add("checkbox_true_show");
        let b = check_false();
        b[0].classList.remove("checkbox_false_show");
      } else {
        let b = check_false();
        b[0].classList.add("checkbox_false_show");
        let a = check_true();
        a[0].classList.remove("checkbox_true_show");
      }
    } else alert("Enter text check");
  };
  //
  return (
    <div>
      <Head>
        <title>List URLs</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        {/* Font awesome */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css"
          integrity="sha512-1sCRPdkRXhBV2PBLUdRb4tMg1w2YPf37qatUFeS7zlBy7jJI8Lf4VHwWfZZfpXtYSLy85pkm9GaYVYMfw5BC1A=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        />
      </Head>

      <main className="wrapper">
        <h1>Test URl</h1>
        <div className="box_check">
          <input
            value={url_check}
            onChange={(e) => setUrl_check(e.target.value)}
            type="text"
            placeholder="Enter text what u wanna check"
            className="input_check"
          ></input>
          <button
            onClick={() => {
              callAPI();
            }}
            className="check"
          >
            Check
          </button>
          {/* <div className="checkbox_true_hidden">
            <i class="fa-solid fa-check"></i>
          </div>
          <div className="checkbox_false_hidden">
            <i class="fa-solid fa-x"></i>
          </div> */}
        </div>
        <div className="box">
          <textarea
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
            }}
            placeholder="Enter Your Url"
            className="input"
          ></textarea>
          <button onClick={handleSubmit} className="submit">
            Submit
          </button>
        </div>
        <div className="list_url">
          {/* {Array_url.length >= 1 &&
            Array_url[0] !== "" &&
            check &&
            Array_url_submit.map((url, index) => (
              <div key={index} className="show_url">
                <p className="url">{url}</p>
              </div>
            ))} */}
          {urls.map((url_submit, index) => (
            <div key={index} className="show_url">
              <p className="url">{url_submit}</p>
              <div>
                <div className="checkbox_true_hidden">
                  <i class="fa-solid fa-check"></i>
                </div>
                <div className="checkbox_false_hidden">
                  <i class="fa-solid fa-x"></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer></footer>
    </div>
  );
}
0;
