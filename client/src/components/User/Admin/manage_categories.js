import React from 'react'
import UserLayout from '../../../hoc/userLayout';
import ManageWoods from './manage_woods';
import ManageBrands from './manage_brands';

const ManageCategories = () => {
  return (
    <UserLayout>
        <ManageBrands/>
        <ManageWoods/>
    </UserLayout>
  )
}

export default ManageCategories
