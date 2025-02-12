import React from 'react'
import {useSelector} from 'react-redux'
import UpdateUserForm from '../../components/UpdateUserForm/UpdateUserForm'

const UsersPage = () => {

    const {userInfo} = useSelector((state)=>state.login)

    if(userInfo){
        return (


            <div style={{display:'flex',justifyContent: 'center',backgroundColor:'#231f20'}}>
                <UpdateUserForm userInfo ={userInfo} />
            </div>
          )
    }else{
        return (
            <h1>loading........</h1>
        )
    }


}

export default UsersPage