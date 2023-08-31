import { useEffect, useState } from "react"
import { Navigation } from "../common/Nav/nav";
import { Teacher } from "./teacher";
import { Course } from "./course";
import { TestSeries } from "./testseries";
import { Freebeis } from "./freebeis";
import { Blog } from "./Bolg.js";
export const Admin = () => {
    const [selectNav , setSelectNav] = useState('Course')
    const navigationHandle = (navItem) => {
        setSelectNav(navItem)
    }
    useEffect(() => {

    },[selectNav])
    return (
        <>
        <Navigation navigationHandle={navigationHandle}/>
        {NavItem(selectNav)}
        </>
    )
}

const NavItem = (item) => {
    switch (item) {
        case 'Course':
          return <Course/>
          break;
          case 'Teacher':
          return <Teacher/>
          break;
          case 'Blog':
          return <Blog/>
          break;
          case 'Freebies':
          return <Freebeis/>
          break;
          case 'TestSeries':
          return <TestSeries/>
          break;
      }
}