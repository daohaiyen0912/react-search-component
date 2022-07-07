import React from 'react'
import { useState, useEffect, useContext, useRef } from 'react'
import { createContext } from 'react'
import './App.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

export const ThemeContext = createContext()

/**
 * Phần nhập search input
 */
const InputSearch = (props) => {
  // console.log(props.padding)
  var paddClass = props.padding ? 'btn-search' : 'add-padding'
  
  return (
    <div className="input-search" ref={props.wrapperRef}>
      <form class="nosubmit">
        <input class="nosubmit" type="search" placeholder="Search..." autoFocus={true}>
        </input>
      </form>
    </div>
  )
}

/**
 * button search ban đầu
 */
const BTNSearch = (props) => {
  console.log(props.padding)
  //paddClass xác định xem icon search thuộc button cũ hay trong input
  var paddClass = props.padding ? 'btn-search' : 'add-padding'
  return (
    <button 
        className={paddClass} 
        onClick = {props.onClick}
    >
        <FontAwesomeIcon icon={faSearch} />
    </button>
  )
}

/**
 * Component chính chứa cả button và input
 */
const ButtonSearch = () => {
  const [visibleBTN, setVisibleBTN] = useState(true)
  const [visibleInp, setVisibleInp] = useState(false)
  const [padd, setPadd] = useState(true)

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  function handleClick () {
    // console.log(padd)
    // console.log(visibleInp)
    setPadd(false)
    setVisibleBTN(false)
    setVisibleInp(true)
    // console.log(padd)
  }

  function useOutsideAlerter(ref) {
    //ref 
    useEffect(() => {
      /**
       * Xử lý sự kiện khi click ngoài input search
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setPadd(true)
          setVisibleBTN(true)
          setVisibleInp(false)
          // alert("You clicked outside of me!")
        }
      }
      // Bind the event listener - lắng nghe sự kiện con trỏ -> truyền vào handleClickOutside
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  return (
    <>
      {visibleBTN && <BTNSearch onClick={handleClick} padding={padd}/>}
      {visibleInp && <InputSearch padding={padd} wrapperRef={wrapperRef}/>}
    </>
  )
}


function App() {
  
  return (
    <>
      <ButtonSearch />
    </>
  )
}

export default App
