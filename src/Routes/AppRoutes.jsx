import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import ContactPage from '../pages/Contact'
import Experines from '../pages/Experines'

import AdminLayout from '../pages/Admin'
import CategoryForm from "../components/admin/CategoryForm"
import CategoryList from "../components/admin/CategoryList"
import ProjectForm from "../components/admin/ProjectForm"
import ProjectList from "../components/admin/ProjectList"
import CreateProject from '../components/admin/CreateProject'
import EditProject from '../components/admin/EditProject'
import ShowProjectDetails from '../components/projects/ShowProjectDetails'

const AppRoutes = () => {
  const routeList = [
  { path: '/', element: <Home /> },
  { path: '/experines', element: <Experines /> },
  { path: '/contact', element: <ContactPage /> },
]

  return (

    <Routes>
      {routeList.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}

      <Route path={"/project/:id"} element={<ShowProjectDetails />} />

      {/*//& Nested Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminLayout />} />
        <Route path="category/create" element={<CategoryForm />} />
        <Route path="category/show" element={<CategoryList />} />
        <Route path="project/create" element={<CreateProject />} />
        <Route path="project/show" element={<ProjectList />} />
        <Route path="project/:id" element={<EditProject />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
