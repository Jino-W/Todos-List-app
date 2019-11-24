import React from 'react'

class UserProfile extends React.Component{

    render(){
        return(
            <div>
                <form action="/uploadPhoto" encType="multipart/form-data" method="POST">
                    <input type="file" name="profileImage" accept="image/*" />
                </form>
                <input type ="submit" value="upload photo" />
            </div>
        )
    }
}


export default UserProfile

