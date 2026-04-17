import './App.css'
import './index.css'
import {createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout'
import Home from './Pages/Home'
import About from './Pages/About'
import Services from './Pages/Services'
import Contact from './Pages/Contact'



function APP (){
const router= createBrowserRouter([{
  path:'/',
  element:<Layout/>,
  children:[
    {index:true, element:<Home/>},
    {path:'about',element:<About/>},
    {path:'services',element:<Services/>},
    {path:'contact',element:<Contact/>},


  ],
},

])
return(

  <RouterProvider router={router}/>


  

)

}
export default APP;